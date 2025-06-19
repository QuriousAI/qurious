"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import type { Paper } from "@workspace/semantic-scholar/src";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/client";

// Multiple Paper Details

const getMultiplePaperDetailsCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.multiplePaperDetails
      .getMultiplePaperDetailsInternal,
});

export const getMultiplePaperDetails = action({
  args: {
    paperIds: v.array(v.string()),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<Paper[]> => {
    return await getMultiplePaperDetailsCache.fetch(ctx, {
      paperIds: args.paperIds,
      fields: args.fields,
    });
  },
});

export const getMultiplePaperDetailsInternal = internalAction({
  args: {
    paperIds: v.array(v.string()),
    fields: v.array(v.string()),
  },
  handler: async (_, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getMultiplePapersDetails({
      paperIds: args.paperIds,
      fields: args.fields,
    });

    if (result.isErr()) throw new ConvexError(result.error);

    return result.value;
  },
});
