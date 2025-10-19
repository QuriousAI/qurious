"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import type { Paper } from "@workspace/semantic-scholar/src";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/client";

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
    return await getPaperDetailsCache.fetch(ctx, {
      paperId: args.paperId,
      fields: args.fields,
    });
  },
});

export const getPaperDetailsInternal = internalAction({
  args: {
    paperId: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (_, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getPaperDetails({
      paperId: args.paperId,
      fields: args.fields,
    });

    client.capture({
      distinctId: ctx.auth.getUserIdentity(),
      event: "get_paper_details",
      properties: {...args}
    });
    

    if (result.isErr()) throw new ConvexError(result.error);

    return result.value;
  },
});
