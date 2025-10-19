import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexAction } from "@convex-dev/react-query";
import { ConvexError } from "convex/values";

export const useTransformQueryQuery = ({ query }: { query: string }) =>
  useQuery({
    ...convexAction(api.externalActions.ai.transformQuery.transformQuery, {
      query,
    }),
  });

// Follow Up

export const useFollowUpQuery = ({
  query,
  summary,
  enabled,
  userDetails,
}: {
  query: string;
  summary: string;
  enabled: boolean;
  userDetails: string;
}) =>
  useQuery({
    ...convexAction(api.externalActions.ai.suggestedQuery.followUp, {
      query,
      summary,
      userDetails,
    }),
    enabled: enabled,
  });

// Summarize papers

export const useSummarizePaperQuery = ({
  query,
  papers,
  enabled,
  userSummarySettings,
}: {
  query: string;
  papers: any[];
  enabled: boolean;
  userSummarySettings: string;
}) =>
  useQuery({
    ...convexAction(api.externalActions.ai.paperSummary.summarizePaper, {
      query,
      papers,
      userSummarySettings,
    }),
    enabled: enabled,
    retry(failureCount, error) {
      console.log({ error });
      if (
        error instanceof ConvexError &&
        error.data == "insufficient credits"
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
