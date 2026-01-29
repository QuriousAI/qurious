"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { Paper } from "@workspace/semantic-scholar/src/types/paper";

const getPaperCitationsCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.paperCitations
      .getPaperCitationsInternal,
  name: "get-paper-citations-cache",
});

export const getPaperCitations = action({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    data: {
      citingPaper: Paper;
    }[];
  }> => {
    const result = await getPaperCitationsCache.fetch(ctx, {
      paperId: args.paperId,
      fields: args.fields,
    });
    return result;
  },
});

export const getPaperCitationsInternal = internalAction({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const semanticScholar = new SemanticScholarAPIClient(
      process.env.SEMANTIC_SCHOLAR_API_KEY,
    );

    try {
      const result = await semanticScholar.getPaperCitations({
        paperId: args.paperId,
        fields: args.fields,
      });

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new ConvexError(errorMessage);
    }
  },
});
