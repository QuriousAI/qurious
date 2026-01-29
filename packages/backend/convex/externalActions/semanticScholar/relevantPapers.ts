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
    const semanticScholar = new SemanticScholarAPIClient(
      process.env.SEMANTIC_SCHOLAR_API_KEY,
    );

    try {
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

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new ConvexError(errorMessage);
    }
  },
});
