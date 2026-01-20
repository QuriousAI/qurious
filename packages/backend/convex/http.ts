/**
 * This file is responsible for creating an HTTP router that receives webhook updates from:
 * 1. Payment Merchant-of-Record (MoR) Provider (Dodo Payments)
 * 2. Authentication Provider (Clerk)
 *
 * The router handlers must validates incoming webhook signatures to ensure requests are legitimate
 * before processing them.
 */

import { httpRouter } from "convex/server";
import { createDodoWebhookHandler } from "@dodopayments/convex";
import { internal } from "./_generated/api";

import { clerkHandler } from "./httpActions/clerk";

const http = httpRouter();

// Payments Merchant-of-Records Provider
http.route({
  path: "/dodopayments-webhook",
  method: "POST",
  handler: createDodoWebhookHandler({
    // Handle successful payments
    onPaymentSucceeded: async (ctx, payload) => {
      console.log("🎉 Payment Succeeded!");

      // Extract customer ID from payload - try multiple possible locations
      const dodoCustomerId =
        payload.data?.customer?.customer_id ||
        payload.data?.customer_id ||
        payload.customer_id ||
        payload.business_id;

      const customerEmail =
        payload.data?.customer?.email ||
        payload.data?.email ||
        payload.customer?.email ||
        "";

      // Use Convex context to persist payment data
      await ctx.runMutation(internal.webhooks.mutations.createPayment, {
        paymentId: payload.data?.payment_id || payload.payment_id || "",
        dodoCustomerId: dodoCustomerId,
        customerEmail: customerEmail,
        amount: payload.data?.total_amount || payload.total_amount || 0,
        currency: payload.data?.currency || payload.currency || "USD",
        status: payload.data?.status || payload.status || "succeeded",
        webhookPayload: JSON.stringify(payload),
      });

      // Add credits to user account (adjust amount based on your product pricing)
      // You may want to extract the credit amount from the product or payment amount
      const totalAmount =
        payload.data?.total_amount || payload.total_amount || 0;
      const creditsToAdd = Math.floor(totalAmount / 1); // Example: 1 credit per dollar
      if (creditsToAdd > 0 && dodoCustomerId) {
        await ctx.runMutation(
          internal.users.mutations.addCreditsByDodoCustomerId,
          {
            dodoCustomerId: dodoCustomerId,
            amount: creditsToAdd,
          },
        );
      }
    },

    // Handle subscription activation
    onSubscriptionActive: async (ctx, payload) => {
      console.log("🎉 Subscription Activated!");

      // Extract customer ID from payload - try multiple possible locations
      const dodoCustomerId =
        payload.data?.customer?.customer_id ||
        payload.data?.customer_id ||
        payload.customer_id ||
        payload.business_id;

      const customerEmail =
        payload.data?.customer?.email ||
        payload.data?.email ||
        payload.customer?.email ||
        "";

      // Use Convex context to persist subscription data
      await ctx.runMutation(internal.webhooks.mutations.createSubscription, {
        subscriptionId:
          payload.data?.subscription_id || payload.subscription_id || "",
        dodoCustomerId: dodoCustomerId,
        customerEmail: customerEmail,
        status: payload.data?.status || payload.status || "active",
        productId: payload.data?.product_id || payload.product_id,
        webhookPayload: JSON.stringify(payload),
      });
    },

    // Handle subscription cancellation
    onSubscriptionCancelled: async (ctx, payload) => {
      console.log("⚠️ Subscription Cancelled!");
      // Handle subscription cancellation if needed
    },

    // Handle subscription renewal
    onSubscriptionRenewed: async (ctx, payload) => {
      console.log("🔄 Subscription Renewed!");
      // Handle subscription renewal if needed
    },
  }),
});

// Authentication Provider
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: clerkHandler,
});

export default http;
