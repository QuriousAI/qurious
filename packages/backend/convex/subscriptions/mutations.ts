import { internalMutation } from "../_generated/server";
import { v, Validator } from "convex/values";
import { WebhookEvent } from "../types/dodopayments";

export const createNewSubscription = internalMutation({
  args: {
    payload: v.any() as Validator<WebhookEvent["data"]>, // trust dodo payments -- very bad idea?
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("subscriptions", {
      createdAt: args.payload.created_at,
      nextBillingDate: args.payload.next_billing_date,
      dodoPaymentsSubscriptionId: args.payload.subscription_id,
      dodoPaymentsCustomerId: args.payload.customer.customer_id,
      customerEmail: args.payload.customer.email,
      customerName: args.payload.customer.name,
      dodoPaymentsProductId: args.payload.product_id,
      status: args.payload.status,
    });
  },
});
