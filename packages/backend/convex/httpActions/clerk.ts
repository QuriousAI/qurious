import type { WebhookEvent as ClerkWebhookEvent } from "@clerk/backend";
import { Webhook as SvixWebhook } from "svix";
import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";
// import { envVariables } from "../env";

async function validateClerkWebhookRequest(req: Request) {
  const clerkSvixWebhook = new SvixWebhook(process.env.CLERK_WEBHOOK_SECRET || "");

  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  let event = null;

  try {
    event = clerkSvixWebhook.verify(
      payloadString,
      svixHeaders
    ) as ClerkWebhookEvent;
  } catch (error) {
    console.error("Error verifying clerk webhook event", error);
  }

  return event;
}

export const clerkHandler = httpAction(async (ctx, request) => {
  console.log("Received event!");

  const event = await validateClerkWebhookRequest(request);
  if (event === null) {
    return new Response("Error occurred", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
      await ctx.runMutation(internal.users.mutations.createFromClerk, {
        data: event.data,
      });
      // throw new Error("supposed to send welcome email here with resend")
      
      break;

    case "user.updated":
      await ctx.runMutation(internal.users.mutations.updateFromClerk, {
        data: event.data,
      });
      break;

    case "user.deleted":
      await ctx.runMutation(internal.users.mutations.deleteFromClerk, {
        clerkUserId: event.data.id!,
      });
      break;

    default:
      console.warn(`⚠️ Ignored Clerk webhook event: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
});
