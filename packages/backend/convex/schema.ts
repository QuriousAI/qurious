import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  searches: defineTable({
    query: v.string(),
    userId: v.id("users"),
  }).index("byUserId", ["userId"]),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    details: v.string(),
    summarySettings: v.string(),
    clerkId: v.string(),
    credits: v.number(),
    dodoCustomerId: v.optional(v.string()),
  })
    .index("byClerkId", ["clerkId"])
    .index("byEmail", ["email"])
    .index("byDodoCustomerId", ["dodoCustomerId"]),

  folders: defineTable({
    name: v.string(),
    description: v.string(),
    content: v.string(),
    paperExternalIds: v.array(v.string()),
    searchIds: v.array(v.id("searches")),
    public: v.boolean(),
    type: v.union(
      v.literal("SYSTEM_CREATED_BOOKMARKS_FOLDER"),
      v.literal("USER_CREATED_CUSTOM_FOLDER"),
    ),
    userId: v.id("users"),
  }).index("byUserId", ["userId"]),
  paperNotes: defineTable({
    userId: v.id("users"),
    paperExternalId: v.string(),
    content: v.string(),
  }).index("byUserId", ["userId"]),
  payments: defineTable({
    /** Dodo Payments customer ID */
    dodoPaymentsCustomerId: v.string(),
    dodoPaymentsCustomerEmail: v.string(),
    webhookPayload: v.string(),
  }).index("byDodoPaymentsCustomerId", ["dodoPaymentsCustomerId"]),
});
