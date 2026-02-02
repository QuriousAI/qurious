// convex/webhooks/mutations.ts
import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// Create or update payment record and link dodoCustomerId to user
export const createPayment = internalMutation({
  args: {
    webhookPayload: v.string(),
    dodoPaymentsCustomerId: v.string(),
    dodoPaymentsCustomerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    ctx.db.insert("payments", {
      dodoPaymentsCustomerId: args.dodoPaymentsCustomerId,
      dodoPaymentsCustomerEmail: args.dodoPaymentsCustomerEmail,
      webhookPayload: args.webhookPayload,
    });
  },
});
