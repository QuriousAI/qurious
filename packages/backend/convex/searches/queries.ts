import { query } from "../_generated/server";
import { getCurrentUserIdOrThrow } from "../users/helpers";
import { getAll, getAllOrThrow } from "convex-helpers/server/relationships";
import { Id } from "../_generated/dataModel";
import { v } from "convex/values";

export const getCurrentUserSearches = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const allSearches = await ctx.db.query("searches").order("desc").collect();
    return allSearches.filter((s) => s.userId === userId);
  },
});

export const getMultiple = query({
  args: {
    searchIds: v.array(v.id("searches")),
  },
  handler: async (ctx, args) => {
    const searches = await getAllOrThrow(ctx.db, args.searchIds);
    return searches;
  },
});
