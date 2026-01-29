import { action, internalAction } from "../../_generated/server";
import { v } from "convex/values";
import { generateObject } from "ai";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { z } from "zod";
import { MODELS } from "./_models";

const FOLLOW_UP_PROMPT = (
  query: string,
  summary: string,
  userDetails: string,
) =>
  `You are a helpful research assistant inside a research-focused app. A user just asked the following question:

"${query}"

He got the following summary back:

"${summary}"

Some details about the user:

"${userDetails}"

Your job is to suggest 3 to 5 short, punchy follow-up questions that:

- Are under 12 words each.
- Are engaging and curiosity-provoking.
- Encourage deeper research or exploration.
- Use academic or topic-relevant wording.
- Must be relevant to the user.

Think of each follow-up as a hook to keep the user exploring. Return only the follow-up questions, one per line.
You must generate only 3 questions.`;

const followUpCache = new ActionCache(components.actionCache, {
  action: internal.externalActions.ai.suggestedQuery.followUpInternal,
});

export const followUpInternal = internalAction({
  args: {
    query: v.string(),
    summary: v.string(),
    userDetails: v.string(),
  },
  handler: async (ctx, args) => {
    const prompt = FOLLOW_UP_PROMPT(args.query, args.summary, args.userDetails);
    const result = await generateObject({
      model: MODELS.SUGGESTED_QUERY,
      prompt,
      schema: z.array(z.string()),
    });
    return result.object;
  },
});

export const followUp = action({
  args: {
    query: v.string(),
    summary: v.string(),
    userDetails: v.string(),
  },
  handler: async (ctx, args): Promise<string[]> => {
    const result = await followUpCache.fetch(ctx, {
      query: args.query,
      summary: args.summary,
      userDetails: args.userDetails,
    });
    return result;
  },
});
