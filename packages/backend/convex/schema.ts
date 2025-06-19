import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  searches: defineTable({
    query: v.string(),
    userId: v.id("users"),
  }),
  users: defineTable({
    name: v.string(),
    details: v.string(),
    summarySettings: v.string(),
    clerkId: v.string(),
    credits: v.number(),
  }).index("byClerkId", ["clerkId"]),
  folders: defineTable({
    name: v.string(),
    description: v.string(),
    content: v.string(),
    paperExternalIds: v.array(v.string()),
    searchIds: v.array(v.id("searches")),
    public: v.boolean(),
    type: v.union(
      v.literal("SYSTEM_CREATED_BOOKMARKS_FOLDER"),
      v.literal("USER_CREATED_CUSTOM_FOLDER")
    ),
    userId: v.id("users"),
  }),
  paperNotes: defineTable({
    userId: v.id("users"),
    paperExternalId: v.string(),
    content: v.string(),
  }),
  subscriptions: defineTable({
    /** Timestamp when the subscription was created */
    createdAt: v.string(),

    /** Timestamp of the next scheduled billing. Indicates the end of current billing period */
    nextBillingDate: v.string(),

    /** Timestamp of the last payment. Indicates the start of current billing period */
    previousBillingDate: v.optional(v.string()),

    /** Dodo Payments subscription ID */
    dodoPaymentsSubscriptionId: v.string(),

    /** Dodo Payments customer ID */
    dodoPaymentsCustomerId: v.string(),

    /** Email of the customer */
    customerEmail: v.string(),

    /** Name of the customer */
    customerName: v.string(),

    /** Dodo Payments product ID (Identifier of the product associated with this subscription) */
    dodoPaymentsProductId: v.string(),

    /** Status of the subscription. Enum: active, on_hold, cancelled, expired */
    status: v.string(),

    /** Timestamp when the subscription was cancelled */
    cancelledAt: v.optional(v.string()),
  })
    .index("byDodoPaymentsSubscriptionId", ["dodoPaymentsSubscriptionId"])
    .index("byDodoPaymentsCustomerId", ["dodoPaymentsCustomerId"]),
});
