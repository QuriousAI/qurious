import { v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { generateObject } from "ai";
import { z } from "zod";
import { STUDY_SNAPSHOT_CREDITS } from "../../credits";
import { MODELS } from "./_models";

const STUDY_SNAPSHOT_PROMPT = (abstract: string, fields: string[]) => `
You're a tool for extracting specific details from research papers. You'll be given a paper abstract and asked to return the specified field. If you can't find a specific field in the abstract, return that field as null.

Abstract: ${abstract}

Fields: ${fields.join(", ")}
`;

const studySnapshotCache = new ActionCache(components.actionCache, {
  action:
    internal.externalActions.ai.studySnapshot.extractStudySnapshotInternal,
});

export const extractStudySnapshot = action({
  args: {
    abstract: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<Record<string, string | null>> => {
    const result = await studySnapshotCache.fetch(ctx, {
      abstract: args.abstract,
      fields: args.fields,
    });
    return result;
  },
});

export const extractStudySnapshotInternal = internalAction({
  args: {
    abstract: v.string(),
    fields: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const zodFields = args.fields as [string, ...string[]];

    const prompt = STUDY_SNAPSHOT_PROMPT(args.abstract, args.fields);
    const result = await generateObject({
      model: MODELS.STUDY_SNAPSHOT,
      prompt,
      schema: z.record(z.enum(zodFields), z.string().nullable()),
    });

    await ctx.runMutation(internal.users.mutations.deductCredits, {
      amount: STUDY_SNAPSHOT_CREDITS,
    });

    const { object } = result;

    return object;
  },
});
