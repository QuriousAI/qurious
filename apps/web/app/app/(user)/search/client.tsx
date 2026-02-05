"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { motion, type Variants } from "motion/react";

import { Button } from "@workspace/design-system/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/components/select";
import { Separator } from "@workspace/design-system/components/separator";
import { Skeleton } from "@workspace/design-system/components/skeleton";
import {
  ChevronDown,
  Files,
  Search,
  Text,
} from "@workspace/design-system/icons";
import type {
  FieldOfStudy,
  PublicationType,
} from "@workspace/semantic-scholar/src";

import { CopyToClipboardButtonWithTooltip } from "@/components/buttons";
import { PaperCard, SearchCard } from "@/components/cards";
import { GlobalErrorHandler } from "@/components/global-error";
import { Heading } from "@/components/global-heading";
import { SORTING } from "@/components/search-bar";
import {
  useFollowUpQuery,
  useGetRelevantPapersInfiniteQuery,
  useTransformQueryQuery,
} from "@/queries";
import { useGetCurrentUserQuery } from "@/queries/users";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { TextShimmer } from "@workspace/design-system/components/motion-primitives/text-shimmer";
import { env } from "@/env";
import { useAuth } from "@clerk/clerk-react";
// ============================================================================
// Types
// ============================================================================

export type SearchResultsProps = {
  q: string;
  minimumCitations?: number;
  openAccess?: boolean;
  publicationTypes?: PublicationType[];
  fieldsOfStudy?: FieldOfStudy[];
};

type SortOption = (typeof SORTING)[number];

// ============================================================================
// Constants
// ============================================================================

const PAPERS_PER_PAGE = 15;

const PAPER_FIELDS = [
  "paperId",
  "title",
  "authors",
  "abstract",
  "tldr",
  "year",
  "publicationDate",
  "citationCount",
  "isOpenAccess",
  "openAccessPdf",
  "journal",
  "fieldsOfStudy",
  "influentialCitationCount",
  "publicationTypes",
] as const;

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Most Relevant",
  citationCount: "Most Cited",
  date: "Most Recent",
  influentialCitationCount: "Most Influential",
};

// Animation variants for staggered list items
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInXVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const fadeInYVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============================================================================
// Utility Components
// ============================================================================

const SectionSeparator = () => (
  <Separator className="max-w-1/3 bg-muted self-center" />
);

// ============================================================================
// Section Components
// ============================================================================

type SummarySectionProps = {
  summary: string | undefined;
  isPending: boolean;
  isFetching: boolean;
  error: Error | null;
  paperCount: number;
};

const SummarySection = ({
  summary,
  isPending,
  isFetching,
  error,
  paperCount,
}: SummarySectionProps) => (
  <div className="flex flex-col gap-2">
    <Heading
      heading="Summary"
      subHeading={`Showing summary of ${paperCount} papers.`}
      tooltip="LLM generated summary based on user preferences."
      icon={<Text />}
      actions={
        <CopyToClipboardButtonWithTooltip
          textToCopy={summary}
          tooltipContent="Copy summary to clipboard"
          onCopySuccessMessage="Summary copied to clipboard."
          buttonIcon="copy"
        />
      }
    />
    {isPending ? (
      <TextShimmer className="w-full h-12" duration={1}>
        Waiting for papers...
      </TextShimmer>
    ) : isFetching ? (
      <TextShimmer className="w-full h-12" duration={1}>
        Getting summary...
      </TextShimmer>
    ) : error ? (
      <GlobalErrorHandler error={error} />
    ) : (
      <div className="flex flex-col gap-4">
        <Markdown>{summary}</Markdown>
      </div>
    )}
  </div>
);

type SuggestedSectionProps = {
  questions: string[] | undefined;
  isPending: boolean;
  isFetching: boolean;
  error: Error | null;
};

const SuggestedSection = ({
  questions,
  isPending,
  isFetching,
  error,
}: SuggestedSectionProps) => (
  <div className="flex flex-col gap-2">
    <Heading
      heading="Suggested"
      subHeading="Showing suggestions related to query."
      tooltip="LLM generated suggestions based on user preferences."
      icon={<Search />}
    />
    {isPending ? (
      <TextShimmer className="w-full h-12" duration={1}>
        Waiting for summary...
      </TextShimmer>
    ) : isFetching ? (
      <TextShimmer className="w-full h-12" duration={1}>
        Getting suggestions...
      </TextShimmer>
    ) : error ? (
      <GlobalErrorHandler error={error} />
    ) : (
      <motion.div
        className="flex flex-col gap-2"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
      >
        {questions?.map((question, index) => (
          <motion.div key={index} variants={fadeInXVariants}>
            <SearchCard questionText={question} />
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
);

type PapersSectionProps = {
  papers: ReturnType<
    typeof useGetRelevantPapersInfiniteQuery
  >["papersFlatMapped"];
  totalPapers: number;
  searchQuery: string | undefined;
  isPending: boolean;
  isFetching: boolean;
  error: Error | null;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  onLoadMore: () => void;
};

const PapersSection = ({
  papers,
  totalPapers,
  searchQuery,
  isPending,
  isFetching,
  error,
  sortBy,
  onSortChange,
  onLoadMore,
}: PapersSectionProps) => {
  const sortedPapers = useMemo(() => {
    if (!papers) return papers;

    const papersCopy = [...papers];

    switch (sortBy) {
      case "citationCount":
        return papersCopy.sort(
          (a, b) => (b?.citationCount ?? 0) - (a?.citationCount ?? 0),
        );
      case "date":
        return papersCopy.sort(
          (a, b) =>
            new Date(b.publicationDate ?? 0).getTime() -
            new Date(a.publicationDate ?? 0).getTime(),
        );
      case "influentialCitationCount":
        return papersCopy.sort(
          (a, b) =>
            (b?.influentialCitationCount ?? 0) -
            (a?.influentialCitationCount ?? 0),
        );
      case "relevance":
      default:
        return papersCopy;
    }
  }, [papers, sortBy]);

  const displayedCount = papers?.length ?? 0;
  const subHeading =
    totalPapers > 0
      ? `Found ${totalPapers.toLocaleString()} relevant papers, showing top ${displayedCount} results for "${searchQuery}".`
      : `Showing ${displayedCount} results for "${searchQuery}".`;

  const isLoading = isPending || isFetching;

  return (
    <>
      <div className="flex flex-col gap-2" id="tour-relevant-papers">
        <Heading
          heading="Relevant Papers"
          icon={<Files />}
          subHeading={subHeading}
          tooltip="Papers ranked by relevance to your search query."
          actions={
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {SORTING.map((option) => (
                  <SelectItem key={option} value={option}>
                    {SORT_LABELS[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
        {isPending ? (
          <TextShimmer className="w-full h-12" duration={1}>
            Waiting for query transformation...
          </TextShimmer>
        ) : isFetching ? (
          <TextShimmer className="w-full h-12" duration={1}>
            Getting papers...
          </TextShimmer>
        ) : error ? (
          <GlobalErrorHandler error={error} />
        ) : (
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {sortedPapers?.map((paper, i) => (
              <motion.div key={paper.paperId ?? i} variants={fadeInYVariants}>
                <PaperCard paper={paper} resultIndex={i + 1} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Button
        variant="secondary"
        onClick={onLoadMore}
        className="place-self-center"
        disabled={isLoading || !!error}
      >
        Load More Results
        <ChevronDown />
      </Button>
    </>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const SearchResults = ({
  q,
  minimumCitations = 0,
  openAccess = false,
  publicationTypes = [],
  fieldsOfStudy = [],
}: SearchResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const hasSentMessage = useRef(false);

  // Get user settings
  const { data: user } = useGetCurrentUserQuery();

  // Transform query for better search results
  const {
    data: transformedQuery,
    isPending: transformQueryPending,
    error: transformQueryError,
  } = useTransformQueryQuery({ query: q });

  // Fetch relevant papers
  const {
    papersFlatMapped: papers,
    isPending: papersPending,
    isFetching: papersFetching,
    error: papersError,
    fetchNextPage,
    totalPapers,
  } = useGetRelevantPapersInfiniteQuery({
    q: transformedQuery,
    limit: PAPERS_PER_PAGE,
    publicationTypes,
    openAccessPdf: openAccess,
    minCitationCount: minimumCitations,
    fieldsOfStudy,
    fields: [...PAPER_FIELDS],
    enabled: !!transformedQuery,
  });

  // Set up streaming chat for summary
  const CONVEX_SITE_URL = env.NEXT_PUBLIC_CONVEX_URL.replace(
    /.cloud$/,
    ".site",
  );

  const { getToken } = useAuth();
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   let isMounted = true;
  //   getToken({ template: "convex" }).then((fetchedToken) => {
  //     if (isMounted) {
  //       setToken(fetchedToken);
  //       console.log("Token", fetchedToken);
  //     }
  //   });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [getToken]);

  const {
    messages,
    sendMessage,
    status,
    error: chatError,
  } = useChat({
    transport: new DefaultChatTransport({
      api: `${CONVEX_SITE_URL}/ai`,
      headers: async () => {
        const token = await getToken({ template: "convex" });
        return {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
      },
    }),
  });

  // Send message when papers are loaded
  useEffect(() => {
    if (papers && papers.length > 0 && !hasSentMessage.current) {
      hasSentMessage.current = true;
      sendMessage(
        { text: q },
        {
          body: {
            papers: JSON.stringify(
              papers.map((p) => ({
                title: p.title,
                abstract: p.abstract,
                tldr: p.tldr,
              })),
            ),
            userSummarySettings: user?.summarySettings ?? "",
          },
        },
      );
    }
  }, [papers, q, sendMessage, user?.summarySettings]);

  // Extract summary from assistant messages (no useMemo to ensure streaming updates)
  const assistantMessages = messages.filter((m) => m.role === "assistant");
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
  const summary = lastAssistantMessage
    ? lastAssistantMessage.parts
        .filter(
          (part): part is { type: "text"; text: string } =>
            part.type === "text",
        )
        .map((p) => p.text)
        .join("")
    : undefined;

  const isStreaming = status === "streaming";
  // Show pending state only before streaming starts (waiting for papers or waiting for stream)
  const summaryPending =
    (papers && papers.length > 0 && !summary && !isStreaming) ||
    status === "submitted";
  const summaryError = chatError ?? null;

  // Generate follow-up questions once summary is complete
  const {
    data: suggestedQuestions,
    isPending: suggestedPending,
    error: suggestedError,
  } = useFollowUpQuery({
    query: q,
    summary: summary ?? "",
    enabled: !!summary && !isStreaming,
    userDetails: user?.details ?? "",
  });

  const papersLoadError = transformQueryError ?? papersError;

  // Determine pending vs fetching states for each section
  // Papers: pending when waiting for query transform, fetching when getting papers
  const papersPendingState = transformQueryPending;
  const papersFetchingState = papersPending || papersFetching;

  // Summary: pending when waiting for papers, fetching when generating summary
  const summaryPendingState = papersPendingState || papersFetchingState;
  const summaryFetchingState = summaryPending;

  // Suggested: pending when waiting for summary, fetching when generating suggestions
  const suggestedPendingState = summaryPendingState || summaryFetchingState;
  const suggestedFetchingState = suggestedPending;

  return (
    <div className="flex flex-col gap-8 w-full">
      <SummarySection
        summary={summary}
        isPending={summaryPendingState}
        isFetching={summaryFetchingState}
        error={summaryError}
        paperCount={papers?.length ?? 0}
      />

      <SectionSeparator />

      <SuggestedSection
        questions={suggestedQuestions}
        isPending={suggestedPendingState}
        isFetching={suggestedFetchingState}
        error={suggestedError}
      />

      <SectionSeparator />

      <PapersSection
        papers={papers}
        totalPapers={totalPapers}
        isPending={papersPendingState}
        isFetching={papersFetchingState}
        error={papersLoadError}
        sortBy={sortBy}
        searchQuery={transformedQuery}
        onSortChange={(value) => setSortBy(value)}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
};
