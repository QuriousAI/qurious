import { Webhook as StandwardWebhook } from "standardwebhooks";
import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { WebhookEvent as DodoPaymentsWebhookEvent } from "../types/dodopayments";
import { envVariables } from "../env";


// async function validateDodoPaymentsWebhookRequest(req: Request) {
//   const dodoPaymentsStandardWebhook = new StandwardWebhook(
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
//       console.warn(`⚠️ Ignored Dodo Payments webhoob event: ${event.type}`);
//   }

//   return new Response("OK", { status: 200 });
// });




http.route({
  path: "/dodopayments-webhook",
  method: "POST",
  handler: createDodoWebhookHandler({
    // Handle successful payments
    onPaymentSucceeded: async (ctx, payload) => {
      console.log("🎉 Payment Succeeded!");
      // Use Convex context to persist payment data
      await ctx.runMutation(internal.webhooks.createPayment, {
        paymentId: payload.data.payment_id,
        businessId: payload.business_id,
        customerEmail: payload.data.customer.email,
        amount: payload.data.total_amount,
        currency: payload.data.currency,
        status: payload.data.status,
        webhookPayload: JSON.stringify(payload),
      });

      await ctx.runMutation(internal.users.mutations.addCredits, {
        
      })
    },

    // // Handle subscription activation
    // onSubscriptionActive: async (ctx, payload) => {
    //   console.log("🎉 Subscription Activated!");
    //   // Use Convex context to persist subscription data
    //   await ctx.runMutation(internal.webhooks.createSubscription, {
    //     subscriptionId: payload.data.subscription_id,
    //     businessId: payload.business_id,
    //     customerEmail: payload.data.customer.email,
    //     status: payload.data.status,
    //     webhookPayload: JSON.stringify(payload),
    //   });
    // },
    // Add other event handlers as needed
  }),
});

export default http;