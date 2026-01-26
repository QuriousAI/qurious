import { query, internalQuery } from "../_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./helpers";
import { captureEvent } from "../lib/analytics";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    await captureEvent(ctx, "user_query_get_current_user", {});
    return await getCurrentUserOrThrow(ctx);
  },
});

// Internal query to fetch customer by auth ID (for DodoPayments identify function)
export const getByAuthId = internalQuery({
  args: { authId: v.string() },
  handler: async (ctx, { authId }) => {
    return await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", authId))
      .first();
  },
});
