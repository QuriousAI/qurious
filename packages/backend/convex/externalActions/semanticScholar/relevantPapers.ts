"use node";

import { ConvexError, v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";

import {
  publicationTypes,
  fieldsOfStudy,
  GetRelevantPapersReturnType,
} from "@workspace/semantic-scholar/src/index";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import { captureEvent } from "../../lib/analytics";

const publicationTypeUnion = v.union(
  ...publicationTypes.map((type) => v.literal(type)),
);
const fieldsOfStudyUnion = v.union(
  ...fieldsOfStudy.map((type) => v.literal(type)),
);

const getRelevantPapersCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.relevantPapers
      .getRelevantPapersInternal,
  name: "get-relevant-papers-cache",
});

// throw new Error("build recommendation engine. this is your chance. recommend new shit based on user liking and viewed and details.")

export const getRelevantPapers = action({
  args: {
    query: v.string(),
    limit: v.number(),
    publicationTypes: v.array(publicationTypeUnion),
    openAccessPdf: v.boolean(),
    minCitationCount: v.number(),
    fieldsOfStudy: v.array(fieldsOfStudyUnion),
    offset: v.number(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<GetRelevantPapersReturnType> => {
    // throw new Error("add trending papers")
    // throw new Error("add more viewed weekly paper.")
    return await getRelevantPapersCache.fetch(ctx, {
      query: args.query,
      limit: args.limit,
      publicationTypes: args.publicationTypes,
      openAccessPdf: args.openAccessPdf,
      minCitationCount: args.minCitationCount,
      fieldsOfStudy: args.fieldsOfStudy,
      offset: args.offset,
      fields: args.fields,
    });
  },
});

export const getRelevantPapersInternal = internalAction({
  args: {
    query: v.string(),
    limit: v.number(),
    publicationTypes: v.array(publicationTypeUnion),
    openAccessPdf: v.boolean(),
    minCitationCount: v.number(),
    fieldsOfStudy: v.array(fieldsOfStudyUnion),
    offset: v.number(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const semanticScholar = new SemanticScholarAPIClient();
    const result = await semanticScholar.getRelevantPapers({
      query: args.query,
      limit: args.limit,
      publicationTypes: args.publicationTypes,
      openAccessPdf: args.openAccessPdf,
      minCitationCount: args.minCitationCount,
      fieldsOfStudy: args.fieldsOfStudy,
      offset: args.offset,
      fields: args.fields,
    });

    if (result.isErr()) {
      await captureEvent(
        ctx,
        "semantic_scholar_action_get_relevant_papers_internal_failed",
        {
          query: args.query,
          error: result.error,
        },
      );
      throw new ConvexError(result.error);
    }

    await captureEvent(
      ctx,
      "semantic_scholar_action_get_relevant_papers_internal",
      {
        query: args.query,
        queryLength: args.query.length,
        limit: args.limit,
        offset: args.offset,
        totalResults: result.value.total,
        returnedResults: result.value.data?.length ?? 0,
      },
    );

    return result.value;
  },
});
