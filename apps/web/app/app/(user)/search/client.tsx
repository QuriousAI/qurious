"use client";

import {
  useFollowUpQuery,
  useGetRelevantPapersInfiniteQuery,
  useSummarizePaperQuery,
  useTransformQueryQuery,
} from "@/queries";
import {
  PublicationType,
  FieldOfStudy,
  Paper,
} from "@workspace/semantic-scholar/src";
import { Separator } from "@workspace/design-system/components/separator";
import {
  ChevronDown,
  Files,
  Search,
  Text,
} from "@workspace/design-system/icons";
import Markdown from "react-markdown";
import { Heading } from "../../../components/global-heading";
import { Skeleton } from "@workspace/design-system/components/skeleton";
import { GlobalErrorHandler } from "../../../components/global-error";
import { CopyToClipboardButtonWithTooltip } from "../../../components/buttons";
import {
  Braces,
  Download,
  FileSpreadsheet,
} from "@workspace/design-system/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/design-system/components/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/components/select";
import { useMemo, useState } from "react";
import { Button } from "@workspace/design-system/components/button";
import { SORTING } from "../../../components/search-bar";
import { useGetCurrentUserQuery } from "@/queries/users";
import { PaperCard, SearchCard } from "@/components/cards";
import { motion } from "motion/react";

const PageSeparator = () => {
  return <Separator className="max-w-1/3 bg-muted self-center" />;
};

const getJSONBlob = (data: any) =>
  new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

const getCSVBlob = (data: any) => new Blob([data], { type: "text/csv" });

const downloadData = (data: any, q: string, fileType: "json" | "csv") => {
  const blob = fileType === "json" ? getJSONBlob(data) : getCSVBlob(data);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${q}.${fileType}`;
  a.click();

  URL.revokeObjectURL(url);
};

const onClick = (fileType: "json" | "csv") => {
  // downloadData(papers, q, fileType);
};

export const SearchResult = (props: {
  q: string;
  minimumCitations?: number;
  publishedSince?: string;
  openAccess?: boolean;
  publicationTypes?: PublicationType[];
  fieldsOfStudy?: FieldOfStudy[];
  limit?: number;
}) => {
  const originalQuery = props.q;

  const {
    data: transformedQuery,
    isPending: transformQueryIsPending,
    error: transformQueryError,
  } = useTransformQueryQuery({
    query: originalQuery,
  });

  const {
    papersFlatMapped: relevantPapers,
    isPending: relevantPapersIsPending,
    error: relevantPapersError,
    fetchNextPage,
    totalPapers,
  } = useGetRelevantPapersInfiniteQuery({
    q: transformedQuery,
    limit: 15,
    publicationTypes: [],
    openAccessPdf: false,
    minCitationCount: 0,
    fieldsOfStudy: [],
    fields: [
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
    ],
    enabled: !!transformedQuery,
  });

  const { data: user, isPending } = useGetCurrentUserQuery();

  const {
    data: summaryData,
    isPending: summaryIsPending,
    error: summaryError,
  } = useSummarizePaperQuery({
    query: props.q,
    papers: relevantPapers,
    enabled: !!relevantPapers,
    userSummarySettings: user?.summarySettings || "",
  });

  const {
    data: suggestedQuestions,
    isPending: suggestedQuestionsIsPending,
    error: suggestedQuestionsError,
  } = useFollowUpQuery({
    query: props.q,
    summary: summaryData,
    enabled: !!summaryData,
    userDetails: user?.details || "",
  });

  const [sortBy, setSortBy] = useState<(typeof SORTING)[number]>("relevance");

  const sortedPapers = useMemo(() => {
    if (!relevantPapers) return relevantPapers;

    // Create a copy to avoid mutating the original array
    const papers = [...relevantPapers];

    if (sortBy === "relevance") return papers;
    if (sortBy === "citationCount")
      return papers.sort(
        (a, b) => (b?.citationCount || 0) - (a?.citationCount || 0),
      );
    if (sortBy === "date")
      return papers.sort(
        (a, b) =>
          new Date(b.publicationDate || 0).getTime() -
          new Date(a.publicationDate || 0).getTime(),
      );
    if (sortBy === "influentialCitationCount")
      return papers.sort(
        (a, b) =>
          (b?.influentialCitationCount || 0) -
          (a?.influentialCitationCount || 0),
      );
    return papers;
  }, [relevantPapers, sortBy]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <Heading
          heading="Summary"
          subHeading={`Showing summary of ${relevantPapers ? relevantPapers.length : 0} papers.`}
          tooltip="LLM generated summary based on user preferences."
          icon={<Text />}
          actions={
            <CopyToClipboardButtonWithTooltip
              textToCopy={summaryData}
              tooltipContent="Copy summary to clipboard"
              onCopySuccessMessage="Summary copied to clipboard."
              buttonIcon="copy"
            />
          }
        />
        {summaryIsPending ? (
          <div>
            <Skeleton className="w-full h-12" />
          </div>
        ) : summaryError ? (
          <>
            {/* <div>Error: {summaryError.message}</div> */}
            <GlobalErrorHandler error={summaryError} />
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <Markdown>{summaryData}</Markdown>
          </div>
        )}
      </div>

      <PageSeparator />

      <div className="flex flex-col gap-2">
        <Heading
          heading="Suggested"
          subHeading="Showing suggestions related to query."
          tooltip="LLM generated suggestions based on user preferences."
          icon={<Search />}
        />
        {suggestedQuestionsIsPending ? (
          <Skeleton className="w-full h-12" />
        ) : suggestedQuestionsError ? (
          <div>Error: {suggestedQuestionsError.message}</div>
        ) : (
          // <SearchCardList
          //   questions={suggestedQuestions.map((question) => ({
          //     question,
          //   }))}
          // />

          <motion.div
            className="flex flex-col gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {suggestedQuestions.map((question, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <SearchCard questionText={question} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <PageSeparator />

      <div className="flex flex-col gap-2" id="tour-relevant-papers">
        <Heading
          heading="Relevant Papers"
          icon={<Files />}
          subHeading="Found 0 relevant papers, showing top 0 results."
          tooltip="Papers ranked by relevance to your search query."
          actions={
            <div className="flex items-center gap-2">
              {/* Sorting Button */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as typeof sortBy)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {SORTING.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Download Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download /> Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onClick("json")}>
                    <Braces /> .json
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onClick("csv")}>
                    <FileSpreadsheet /> .csv
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />
        {relevantPapersIsPending ? (
          <div className="">Getting relevant papers...</div>
        ) : relevantPapersError ? (
          <GlobalErrorHandler error={relevantPapersError} />
        ) : (
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {sortedPapers?.map((paper, i) => (
              <motion.div
                key={paper.paperId || i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PaperCard paper={paper} resultIndex={i + 1} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Button
        variant={"secondary"}
        onClick={() => fetchNextPage()}
        className="place-self-center"
        disabled={relevantPapersIsPending || !!relevantPapersError}
      >
        Load More Results
        <ChevronDown />
      </Button>
    </div>
  );
};
