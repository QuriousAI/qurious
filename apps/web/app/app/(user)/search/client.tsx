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
import { extractFieldsfromPapers } from "@/utils/extractor";
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

  if (isPending) {
    let msg = "Getting user details...";
  }

  const {
    data: summaryData,
    isPending: summaryIsPending,
    error: summaryError,
  } = useSummarizePaperQuery({
    query: props.q,
    // extractedPapers: extractFieldsfromPapers(relevantPapers),
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
    if (sortBy === "relevance") return relevantPapers;
    if (sortBy === "citationCount")
      return relevantPapers?.sort(
        (a, b) => b?.citationCount - a?.citationCount
      );
    if (sortBy === "date")
      return relevantPapers?.sort(
        (a, b) =>
          new Date(b.publicationDate).getTime() -
          new Date(a.publicationDate).getTime()
      );
    if (sortBy === "influencialCitationCount")
      return relevantPapers?.sort(
        (a, b) => b?.influentialCitationCount - a?.influentialCitationCount
      );
    return relevantPapers;
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

          <div className="flex flex-col gap-2">
            {suggestedQuestions.map((question) => (
              <SearchCard questionText={question} />
            ))}
          </div>
        )}
      </div>

      <PageSeparator />

      <div className="flex flex-col gap-2" id="tour-relavant-papers">
        <Heading
          heading="Relevant Papers"
          icon={<Files />}
          subHeading="Found 0 relevant papers, showing top 0 results."
          tooltip="Papers ranked by relevance to your search query."
          actions={
            <div className="flex items-center gap-2">
              {/* Sorting Button */}
              <Select value={sortBy}>
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
          <div className="flex flex-col gap-6">
            {relevantPapers.map((paper, i) => (
              <PaperCard paper={paper} resultIndex={i + 1} key={i} />
            ))}
          </div>
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
