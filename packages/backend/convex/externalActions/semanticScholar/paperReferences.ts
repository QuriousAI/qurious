"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { Paper } from "@workspace/semantic-scholar/src/types/paper";
import { captureEvent } from "../../lib/analytics";

const getPaperReferencesCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.paperReferences
      .getPaperReferencesInternal,
  name: "get-paper-references-cache",
});

export const getPaperReferences = action({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    data: {
      citedPaper: Paper;
    }[];
  }> => {
    const result = await getPaperReferencesCache.fetch(ctx, {
      paperId: args.paperId,
      fields: args.fields,
    });
    await captureEvent(ctx, "semantic_scholar_action_get_paper_references", {
      paperId: args.paperId,
      fieldsCount: args.fields.length,
      referencesCount: result.data.length,
    });
    return result;
  },
});

export const getPaperReferencesInternal = internalAction({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getPaperReferences({
      paperId: args.paperId,
      fields: args.fields,
    });

    if (result.isErr()) {
      await captureEvent(
        ctx,
        "semantic_scholar_action_get_paper_references_internal_failed",
        {
          paperId: args.paperId,
          error: result.error,
        },
      );
      throw new ConvexError(result.error);
    }

    await captureEvent(
      ctx,
      "semantic_scholar_action_get_paper_references_internal",
      {
        paperId: args.paperId,
        fieldsCount: args.fields.length,
        referencesCount: result.value.data.length,
      },
    );

    return result.value;
  },
});
