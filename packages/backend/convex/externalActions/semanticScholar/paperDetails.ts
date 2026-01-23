"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import type { Paper } from "@workspace/semantic-scholar/src";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/client";
import { captureEvent } from "../../lib/analytics";

// Paper Details

const getPaperDetailsCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.paperDetails
      .getPaperDetailsInternal,
});

export const getPaperDetails = action({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<Paper> => {
    const result = await getPaperDetailsCache.fetch(ctx, {
      paperId: args.paperId,
      fields: args.fields,
    });
    await captureEvent(ctx, "semantic_scholar_action_get_paper_details", {
      paperId: args.paperId,
      fieldsCount: args.fields.length,
      fields: args.fields,
    });
    return result;
  },
});

export const getPaperDetailsInternal = internalAction({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getPaperDetails({
      paperId: args.paperId,
      fields: args.fields,
    });

    if (result.isErr()) {
      await captureEvent(
        ctx,
        "semantic_scholar_action_get_paper_details_internal_failed",
        {
          paperId: args.paperId,
          error: result.error,
        },
      );
      throw new ConvexError(result.error);
    }

    await captureEvent(
      ctx,
      "semantic_scholar_action_get_paper_details_internal",
      {
        paperId: args.paperId,
        fieldsCount: args.fields.length,
      },
    );

    return result.value;
  },
});
