"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { Paper } from "@workspace/semantic-scholar/src/types/paper";
import { captureEvent } from "../../lib/posthog";

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
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getRecommendedPapers({
      paperId: args.paperId,
      fields: args.fields,
    });

    if (result.isErr()) {
      await captureEvent(
        ctx,
        "semantic_scholar_action_get_paper_recommendations_internal_failed",
        {
          paperId: args.paperId,
          error: result.error,
        },
      );
      throw new ConvexError(result.error);
    }

    await captureEvent(
      ctx,
      "semantic_scholar_action_get_paper_recommendations_internal",
      {
        paperId: args.paperId,
        fieldsCount: args.fields.length,
        recommendationsCount: result.value.recommendedPapers.length,
      },
    );

    return result.value;
  },
});
