import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { getCurrentUserIdOrThrow } from "../users/helpers";
import { PostHog } from "@samhoque/convex-posthog";
import { components } from "../_generated/api";

const posthog = new PostHog(components.posthog, {});

export const createSearch = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const identity = await ctx.auth.getUserIdentity();
    const searchId = await ctx.db.insert("searches", {
      query: args.query,
      userId: userId,
    });
    await posthog.trackUserEvent(ctx, {
      userId: identity!.subject,
      event: "search_mutation_create_search",
      properties: {
        searchId,
        query: args.query,
        queryLength: args.query.length,
      },
    });
  },
});

export const deleteSearch = mutation({
  args: {
    searchId: v.id("searches"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const identity = await ctx.auth.getUserIdentity();
    const search = await ctx.db.get(args.searchId);

    if (!search) {
      await posthog.trackUserEvent(ctx, {
        userId: identity!.subject,
        event: "search_mutation_delete_search_failed",
        properties: {
          searchId: args.searchId,
          reason: "search_not_found",
        },
      });
      throw new ConvexError("Search not found");
    }

    if (search.userId !== userId) {
      await posthog.trackUserEvent(ctx, {
        userId: identity!.subject,
        event: "search_mutation_delete_search_denied",
        properties: {
          searchId: args.searchId,
          reason: "not_owner",
        },
      });
      throw new ConvexError("You can only delete your own searches");
    }

    await posthog.trackUserEvent(ctx, {
      userId: identity!.subject,
      event: "search_mutation_delete_search",
      properties: {
        searchId: args.searchId,
      },
    });
    await ctx.db.delete(args.searchId);
  },
});

export const deleteCurrentUserSearches = mutation({
  handler: async (ctx) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const identity = await ctx.auth.getUserIdentity();
    const searches = await ctx.db
      .query("searches")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    await posthog.trackUserEvent(ctx, {
      userId: identity!.subject,
      event: "search_mutation_delete_current_user_searches",
      properties: {
        searchesDeleted: searches.length,
      },
    });

    for (const search of searches) {
      await ctx.db.delete(search._id);
    }
  },
});
