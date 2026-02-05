import { v } from "convex/values";
import {
  action,
  httpAction,
  internalAction,
  mutation,
  query,
} from "../../_generated/server";
import { ActionCache } from "@convex-dev/action-cache";
import { api, components, internal } from "../../_generated/api";
import { streamText } from "ai";
import { MODELS } from "./_models";
import { PAPER_SUMMARY_CREDITS } from "../../credits";
import { SemanticScholarAPIClient } from "@workspace/semantic-scholar/src/api-client";
import {
  PersistentTextStreaming,
  StreamId,
  StreamIdValidator,
} from "@convex-dev/persistent-text-streaming";
// Paper Summarization

const SUMMARIZE_PAPER_PROMPT = (
  query: string,
  papers: string,
  userSummarySettings: string,
) => `You are a paper summarizer. You are given a query and a list of papers. Summarize the papers in a way that answers the query. Make sure the answer is detailed and comprehensive.
  
  Query: ${query}

  User summary settings: ${userSummarySettings}
  
  Papers: ${papers}`;

export const streamSummary = httpAction(async (ctx, request) => {
  console.log({ request });
  console.log("Request received");

  console.log("Getting user identity");
  // Check authentication
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    console.log("User identity not found");
    return new Response(
      JSON.stringify({
        error: "Unauthorized. Please sign in to use this feature.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
  console.log("User identity found");
  const clerkId = identity.subject;

  console.log("Checking and deducting credits");
  // Check and deduct credits before streaming
  try {
    await ctx.runMutation(
      internal.users.mutations.checkAndDeductCreditsByClerkId,
      {
        clerkId,
        amount: PAPER_SUMMARY_CREDITS,
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Insufficient credits";
    return new Response(
      JSON.stringify({
        error: errorMessage.includes("insufficient")
          ? "Insufficient credits. Please purchase more credits to continue."
          : errorMessage,
      }),
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
  console.log("Credits deducted successfully");

  const body = await request.json();

  console.log("Body received");

  // AI SDK useChat sends: { messages: Message[], id: string, ...body }
  const messages = body.messages as Array<{ role: string; content: string }>;
  const papers = body.papers as string;
  const userSummarySettings = (body.userSummarySettings as string) ?? "";

  // Extract query from the last user message
  const lastUserMessage = messages?.filter((m) => m.role === "user").pop();
  const query = lastUserMessage?.content ?? "";

  console.log(
    "Parsed request - query:",
    query,
    "papers length:",
    papers?.length,
  );

  const prompt = SUMMARIZE_PAPER_PROMPT(query, papers, userSummarySettings);

  const result = streamText({
    model: MODELS.PAPER_SUMMARY,
    prompt,
  });

  console.log("Result received");

  return result.toUIMessageStreamResponse({
    headers: {
      "Access-Control-Allow-Origin": "*",
      Vary: "Origin",
    },
  });
});
// const summarizePapersCache = new ActionCache(components.actionCache, {
//   action: internal.externalActions.ai.paperSummary.summarizePaperInternal,
// });

// export const summarizePaper = action({
//   args: {
//     query: v.string(),
//     papers: v.any(),
//     userSummarySettings: v.string(),
//   },
//   handler: async (ctx, args): Promise<string> => {
//     return await summarizePapersCache.fetch(ctx, {
//       query: args.query,
//       papers: args.papers,
//       userSummarySettings: args.userSummarySettings,
//     });
//   },
// });

// export const summarizePaperInternal = internalAction({
//   args: {
//     query: v.string(),
//     papers: v.any(),
//     userSummarySettings: v.string(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.runMutation(internal.users.mutations.checkCredits, {
//       amount: PAPER_SUMMARY_CREDITS,
//     });

//     await ctx.runMutation(internal.users.mutations.deductCredits, {
//       amount: PAPER_SUMMARY_CREDITS,
//     });

//     // Track paper summarization event
//     await captureEvent(ctx, "paper_summarized", {
//       query: args.query,
//       paperCount: Array.isArray(args.papers) ? args.papers.length : 1,
//       creditsUsed: PAPER_SUMMARY_CREDITS,
//     });

//     const { text } = result;
//     return text;
//   },
// });
