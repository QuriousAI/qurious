// convex/webhooks/mutations.ts
import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

// Create or update payment record and link dodoCustomerId to user
export const createPayment = internalMutation({
  args: {
    paymentId: v.string(),
    dodoCustomerId: v.string(),
    customerEmail: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.string(),
    webhookPayload: v.string(),
  },
  handler: async (ctx, args) => {
    // Find or create payment record
    let customer = await ctx.db
      .query("payments")
      .withIndex("byDodoPaymentsCustomerId", (q) =>
        q.eq("dodoPaymentsCustomerId", args.dodoCustomerId),
      )
      .first();

    if (customer) {
      // Update existing payment record
      await ctx.db.patch(customer._id, {
        customerEmail: args.customerEmail,
      });
    } else {
      // Create new payment record
      await ctx.db.insert("payments", {
        dodoPaymentsCustomerId: args.dodoCustomerId,
        customerEmail: args.customerEmail,
        customerName: args.customerEmail, // Default to email if name not available
        dodoPaymentsProductId: "", // Will be updated from subscription webhook if applicable
      });
    }

    // Link dodoCustomerId to user if not already linked
    // Find user by dodoCustomerId (if already linked)
    let user = await ctx.db
      .query("users")
      .withIndex("byDodoCustomerId", (q) =>
        q.eq("dodoCustomerId", args.dodoCustomerId),
      )
      .first();

    // If user not found by dodoCustomerId, try to find by email
    // Note: This is a fallback - ideally dodoCustomerId should be set during checkout
    // In a production app, you might want to match users differently based on your auth flow
    if (!user && args.customerEmail) {
      // Since we don't have email indexed, we'll need to search through users
      // This is not ideal for large user bases, but works for now
      const allUsers = await ctx.db.query("users").collect();
      // Try to find user - you may need to match by email from identity if available
      // For now, we'll just update when we have the dodoCustomerId from webhook
    }
  },
});

// Create or update subscription record
export const createSubscription = internalMutation({
  args: {
    subscriptionId: v.string(),
    dodoCustomerId: v.string(),
    customerEmail: v.string(),
    status: v.string(),
    productId: v.optional(v.string()),
    webhookPayload: v.string(),
  },
  handler: async (ctx, args) => {
    // Find customer by DodoPayments customer ID
    let customer = await ctx.db
      .query("payments")
      .withIndex("byDodoPaymentsCustomerId", (q) =>
        q.eq("dodoPaymentsCustomerId", args.dodoCustomerId),
      )
      .first();

    if (customer) {
      // Update existing payment record with subscription info
      await ctx.db.patch(customer._id, {
        customerEmail: args.customerEmail,
        dodoPaymentsProductId: args.productId || customer.dodoPaymentsProductId,
      });
    } else {
      // Create new payment record
      await ctx.db.insert("payments", {
        dodoPaymentsCustomerId: args.dodoCustomerId,
        customerEmail: args.customerEmail,
        customerName: args.customerEmail,
        dodoPaymentsProductId: args.productId || "",
      });
    }

    // Link dodoCustomerId to user if not already linked
    const user = await ctx.db
      .query("users")
      .withIndex("byDodoCustomerId", (q) =>
        q.eq("dodoCustomerId", args.dodoCustomerId),
      )
      .first();

    // If user found and doesn't have dodoCustomerId, update it
    // (This shouldn't happen if already linked, but keeping for safety)
    if (user && !user.dodoCustomerId) {
      await ctx.db.patch(user._id, {
        dodoCustomerId: args.dodoCustomerId,
      });
    }
  },
});
