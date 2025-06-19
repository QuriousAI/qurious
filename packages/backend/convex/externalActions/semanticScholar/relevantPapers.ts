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
  ...publicationTypes.map((type) => v.literal(type))
);
const fieldsOfStudyUnion = v.union(
  ...fieldsOfStudy.map((type) => v.literal(type))
);

const getRelevantPapersCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.semanticScholar.relevantPapers
      .getRelevantPapersInternal,
  name: "get-relevant-papers-cache",
});

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
  handler: async (_, args) => {
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

    if (result.isErr()) throw new ConvexError(result.error);

    console.log("length", result.value.total);

    return result.value;
  },
});
