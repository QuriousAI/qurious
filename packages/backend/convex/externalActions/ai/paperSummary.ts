import { v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { api, components, internal } from "../../_generated/api";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { PAPER_SUMMARY_CREDITS } from "../../credits";
// Paper Summarization

const SUMMARIZE_PAPER_PROMPT = (
  query: string,
  papers: string,
  userSummarySettings: string
) => `You are a paper summarizer. You are given a query and a list of papers. Summarize the papers in a way that answers the query. Make sure the answer is detailed and comprehensive.
  
  Query: ${query}

  User summary settings: ${userSummarySettings}
  
  Papers: ${papers}`;

const summarizePapersCache = new ActionCache(components.actionCache, {
  action: internal.externalActions.ai.paperSummary.summarizePaperInternal,
});

export const summarizePaper = action({
  args: {
    query: v.string(),
    papers: v.any(),
    userSummarySettings: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    return await summarizePapersCache.fetch(ctx, {
      query: args.query,
      papers: args.papers,
      userSummarySettings: args.userSummarySettings,
    });
  },
});

export const summarizePaperInternal = internalAction({
  args: {
    query: v.string(),
    papers: v.any(),
    userSummarySettings: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.users.mutations.checkCredits, {
      amount: PAPER_SUMMARY_CREDITS,
    });

    const prompt = SUMMARIZE_PAPER_PROMPT(
      args.query,
      JSON.stringify(args.papers),
      args.userSummarySettings
    );
    const result = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt,
    });

    await ctx.runMutation(internal.users.mutations.deductCredits, {
      amount: PAPER_SUMMARY_CREDITS,
    });

    const { text } = result;
    return text;
  },
});
