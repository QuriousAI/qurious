import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { getCurrentUserIdOrThrow } from "../users/helpers";
import { captureEvent } from "../lib/analytics";

export const createSearch = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const searchId = await ctx.db.insert("searches", {
      query: args.query,
      userId: userId,
    });
    await captureEvent(ctx, "search_mutation_create_search", {
      searchId,
      query: args.query,
      queryLength: args.query.length,
    });
  },
});

export const deleteSearch = mutation({
  args: {
    searchId: v.id("searches"),
  },
  handler: async (ctx, args) => {
    await captureEvent(ctx, "search_mutation_delete_search", {
      searchId: args.searchId,
    });
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

    await captureEvent(ctx, "search_mutation_delete_current_user_searches", {
      searchesDeleted: searches.length,
    });

    for (const search of searches) {
      await ctx.db.delete(search._id);
    }
  },
});
