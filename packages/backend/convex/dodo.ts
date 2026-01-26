// convex/dodo.ts
import { DodoPayments, DodoPaymentsClientConfig } from "@dodopayments/convex";
import { components } from "./_generated/api";
import { internal } from "./_generated/api";

// import { Webhook as standardWebhook } from "standardwebhooks";
import { httpAction } from "./_generated/server";

// import type { WebhookEvent as DodoPaymentsWebhookEvent } from "../types/dodopayments";
// import { envVariables } from "../env";

// async function validateDodoPaymentsWebhookRequest(req: Request) {
//   const dodoPaymentsStandardWebhook = new standardWebhook(
//     envVariables.DODO_PAYMENTS_WEBHOOK_SECRET
//   );

//   const payloadString = await req.text();
//   const webhookHeaders = {
//     "webhook-id": req.headers.get("webhook-id") || "",
//     "webhook-timestamp": req.headers.get("webhook-timestamp") || "",
//     "webhook-signature": req.headers.get("webhook-signature") || "",
//   };

//   let event = null;

//   try {
//     event = dodoPaymentsStandardWebhook.verify(
//       payloadString,
//       webhookHeaders
//     ) as DodoPaymentsWebhookEvent;
//   } catch (error) {
//     console.error("Error verifying dodo payments webhook event", error);
//   }

//   return event;
// }

// export const dodoHandler = httpAction(async (ctx, request) => {
//   const event = await validateDodoPaymentsWebhookRequest(request);
//   if (event === null) {
//     return new Response("Error occurred while validating webhook", {
//       status: 400,
//     });
//   }

//   switch (event.type) {
//     case "subscription.active":
//       await ctx.runMutation(
//         internal.subscriptions.mutations.createNewSubscription,
//         {
//           payload: event.data,
//         }
//       );
//       break;
//     default:
//       console.warn(`⚠️ Ignored Dodo Payments webhook event: ${event.type}`);
//   }

//   return new Response("OK", { status: 200 });
// });

// http.route({
//   path: "/dodopayments-webhook",
//   method: "POST",
//   handler: createDodoWebhookHandler({
//     // Handle successful payments
//     onPaymentSucceeded: async (ctx, payload) => {
//       console.log("🎉 Payment Succeeded!");
//       // Use Convex context to persist payment data
//       await ctx.runMutation(internal.webhooks.createPayment, {
//         paymentId: payload.data.payment_id,
//         businessId: payload.business_id,
//         customerEmail: payload.data.customer.email,
//         amount: payload.data.total_amount,
//         currency: payload.data.currency,
//         status: payload.data.status,
//         webhookPayload: JSON.stringify(payload),
//       });

//       await ctx.runMutation(internal.users.mutations.addCredits, {

//       })
//     },

//     // // Handle subscription activation
//     // onSubscriptionActive: async (ctx, payload) => {
//     //   console.log("🎉 Subscription Activated!");
//     //   // Use Convex context to persist subscription data
//     //   await ctx.runMutation(internal.webhooks.createSubscription, {
//     //     subscriptionId: payload.data.subscription_id,
//     //     businessId: payload.business_id,
//     //     customerEmail: payload.data.customer.email,
//     //     status: payload.data.status,
//     //     webhookPayload: JSON.stringify(payload),
//     //   });
//     // },
//     // Add other event handlers as needed
//   }),
// });

// export default http;

export const dodo = new DodoPayments(components.dodopayments, {
  // This function maps your Convex user to a Dodo Payments customer
  // Customize it based on your authentication provider and database
  identify: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null; // User is not logged in
    }

    // Use ctx.runQuery() to lookup customer from your database
    const customer = await ctx.runQuery(internal.users.queries.getByAuthId, {
      authId: identity.subject,
    });

    if (!customer) {
      return null; // Customer not found in database
    }

    return {
      dodoCustomerId: customer.dodoCustomerId, // Field storing Dodo Payments customer ID
    };
  },
  apiKey: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as
    | "test_mode"
    | "live_mode",
} as DodoPaymentsClientConfig);

// Export the API methods for use in your app
export const { checkout, customerPortal } = dodo.api();
