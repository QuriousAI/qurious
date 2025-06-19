import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getCurrentUserIdOrThrow } from "../users/helpers";

export const createSearch = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    await ctx.db.insert("searches", {
      query: args.query,
      userId: userId,
    });
  },
});

export const deleteSearch = mutation({
  args: {
    searchId: v.id("searches"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.searchId);
  },
});

export const deleteCurrentUserSearches = mutation({
  handler: async (ctx) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const searches = await ctx.db
      .query("searches")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    for (const search of searches) {
      await ctx.db.delete(search._id);
    }
  },
});
