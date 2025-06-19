import { v } from "convex/values";
import { action, internalAction } from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { components, internal } from "../../_generated/api";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const TRANSFORM_QUERY_PROMPT = (
  query: string
) => `You are a semantic search query optimizer for research databases like Semantic Scholar. Your task is to rephrase a natural language question or command into a concise, keyword-based academic search query.

Guidelines:
- Remove conversational tone, question format, or command phrases.
- Focus on key scientific terms, processes, comparisons, or phenomena.
- Include synonyms or technical terms if appropriate.
- Avoid vague terms like "create", "what is", "how", "why".
- Keep it concise, like a paper title or search phrase.
- Do not add multiple terms to confuse the search engine.

Input: "What is the age of the human race?"
Output: "origin and evolution of Homo sapiens"

Input: "Create a table comparing the efficacy and side effects of prescription-strength retinoids for acne treatment"
Output: "efficacy and side effects of prescription-strength retinoids in acne treatment"

Query: ${query}
`;

const transformQueryCache = new ActionCache(components.actionCache, {
  action: internal.externalActions.ai.transformQuery.transformQueryInternal,
});

export const transformQuery = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args): Promise<string> => {
    return await transformQueryCache.fetch(ctx, {
      query: args.query,
    });
  },
});

export const transformQueryInternal = internalAction({
  args: {
    query: v.string(),
  },
  handler: async (_, args) => {
    const prompt = TRANSFORM_QUERY_PROMPT(args.query);
    const result = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt,
    });

    const { text } = result;

    return text;
  },
});
