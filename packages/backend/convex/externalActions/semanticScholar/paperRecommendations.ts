"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { Paper } from "@workspace/semantic-scholar/src/types/paper";

const getPaperRecommendationsCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.paperRecommendations
      .getPaperRecommendationsInternal,
  name: "get-paper-recommendations-cache",
});

export const getPaperRecommendations = action({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (
    ctx,
    args
  ): Promise<{
    recommendedPapers: Paper[];
  }> => {
    return await getPaperRecommendationsCache.fetch(ctx, {
      paperId: args.paperId,
      fields: args.fields,
    });
  },
});

export const getPaperRecommendationsInternal = internalAction({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (_, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getRecommendedPapers({
      paperId: args.paperId,
      fields: args.fields,
    });
    client.capture({
      distinctId: ctx.auth.getUserIdentity(),
      event: "get_paper_recommendations",
      properties: {...args}
    });
    

    if (result.isErr()) throw new ConvexError(result.error);

    return result.value;
  },
});
