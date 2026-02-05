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

      console.log("Payload:", payload);

      const { customer } = payload.data;

      // Use Convex context to persist payment data
      await ctx.runMutation(internal.payments.mutations.createPayment, {
        dodoPaymentsCustomerId: customer.customer_id,
        dodoPaymentsCustomerEmail: customer.email,
        webhookPayload: JSON.stringify(payload),
      });

      await ctx.runMutation(internal.users.mutations.addCreditsByEmail, {
        email: customer.email,
        amount: 10,
      });
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
          "Access-Control-Allow-Headers": "Content-Type, Digest, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

export default http;
