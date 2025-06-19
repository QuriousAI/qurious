import { Webhook as StandwardWebhook } from "standardwebhooks";
import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { WebhookEvent as DodoPaymentsWebhookEvent } from "../types/dodopayments";

console.log(process.env.DODO_PAYMENTS_WEBHOOK);

async function validateDodoPaymentsWebhookRequest(req: Request) {
  const dodoPaymentsStandardWebhook = new StandwardWebhook(
    process.env.DODO_PAYMENTS_WEBHOOK!
  );

  const payloadString = await req.text();
  const webhookHeaders = {
    "webhook-id": req.headers.get("webhook-id") || "",
    "webhook-timestamp": req.headers.get("webhook-timestamp") || "",
    "webhook-signature": req.headers.get("webhook-signature") || "",
  };

  let event = null;

  try {
    event = dodoPaymentsStandardWebhook.verify(
      payloadString,
      webhookHeaders
    ) as DodoPaymentsWebhookEvent;
  } catch (error) {
    console.error("Error verifying dodo payments webhook event", error);
  }

  return event;
}

export const dodoHandler = httpAction(async (ctx, request) => {
  const event = await validateDodoPaymentsWebhookRequest(request);
  if (event === null) {
    return new Response("Error occurred while validating webhook", {
      status: 400,
    });
  }

  switch (event.type) {
    case "subscription.active":
      await ctx.runMutation(
        internal.subscriptions.mutations.createNewSubscription,
        {
          payload: event.data,
        }
      );
      break;
    default:
      console.warn(`⚠️ Ignored Dodo Payments webhoob event: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
});
