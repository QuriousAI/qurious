"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { Paper } from "@workspace/semantic-scholar/src/types/paper";
import { captureEvent } from "../../lib/analytics";

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
    args,
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
  handler: async (ctx, args) => {
    const semanticScholar = new SemanticScholarAPIClient(
      process.env.SEMANTIC_SCHOLAR_API_KEY,
    );

    try {
      const result = await semanticScholar.getRecommendedPapers({
        paperId: args.paperId,
        fields: args.fields,
      });

      await captureEvent(
        ctx,
        "semantic_scholar_action_get_paper_recommendations_internal",
        {
          paperId: args.paperId,
          fieldsCount: args.fields.length,
          recommendationsCount: result.recommendedPapers.length,
        },
      );

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      await captureEvent(
        ctx,
        "semantic_scholar_action_get_paper_recommendations_internal_failed",
        {
          paperId: args.paperId,
          error: errorMessage,
        },
      );
      throw new ConvexError(errorMessage);
    }
  },
});
