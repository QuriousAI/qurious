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
import { streamSummary } from "./externalActions/ai/paperSummary";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Payments Merchant-of-Records Provider
http.route({
  path: "/dodopayments-webhook",
  method: "POST",
  handler: createDodoWebhookHandler({
    // Handle successful payments
    onPaymentSucceeded: async (ctx, payload) => {
      console.log("🎉 Payment Succeeded!");

      // Extract customer ID and email from the properly typed payload
      const dodoCustomerId =
        payload.data.customer?.customer_id || payload.data.business_id;
      const customerEmail = payload.data.customer?.email || "";

      // Use Convex context to persist payment data
      await ctx.runMutation(internal.webhooks.mutations.createPayment, {
        paymentId: payload.data.payment_id,
        dodoCustomerId: dodoCustomerId,
        customerEmail: customerEmail,
        amount: payload.data.total_amount,
        currency: payload.data.currency,
        status: payload.data.status,
        webhookPayload: JSON.stringify(payload),
      });

      // Add credits to user account (adjust amount based on your product pricing)
      // You may want to extract the credit amount from the product or payment amount
      const totalAmount = payload.data.total_amount;
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

      // Extract customer ID and email from the properly typed payload
      const dodoCustomerId = payload.data.customer?.customer_id || "";
      const customerEmail = payload.data.customer?.email || "";

      // Use Convex context to persist subscription data
      await ctx.runMutation(internal.webhooks.mutations.createSubscription, {
        subscriptionId: payload.data.subscription_id,
        dodoCustomerId: dodoCustomerId,
        customerEmail: customerEmail,
        status: payload.data.status,
        productId: payload.data.product_id,
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

http.route({
  path: "/",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    return new Response(`Hello from ${request.url}`);
  }),
});

// Authentication Provider
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: clerkHandler,
});

http.route({
  path: "/ai",
  method: "POST",
  handler: streamSummary,
});

http.route({
  path: "/ai",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

export default http;
