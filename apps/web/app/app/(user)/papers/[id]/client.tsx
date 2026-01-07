"use client";

import { Separator } from "@workspace/design-system/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/design-system/components/tabs";
import Link from "next/link";
import { useGetPaperDetailsQuery, useGetPaperSnapshotQuery } from "@/queries";

import type { Paper } from "@workspace/semantic-scholar/src";
import { Skeleton } from "@workspace/design-system/components/skeleton";

import { ReferencesTabContent } from "@/components/paper-tabs/references";
import { CitationsTabContent } from "@/components/paper-tabs/citations";
import { GraphViewTabContent } from "@/components/paper-tabs/graph-view";
import { RecommendedTabContent } from "@/components/paper-tabs/recommended";
import { OverviewTabContent } from "@/components/paper-tabs/overview";
import { Badge } from "@workspace/design-system/components/badge";

const PaperHero = (props: { paper: Paper }) => {
  if (!props.paper.authors) {
    throw new Error("No authors found");
  }

  return (
      <div className="flex-col gap-6">
        {/* Left Side: Paper Details */}
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{props.paper.title}</div>
          <div className="w-lg text-sm text-neutral-400">
            {props.paper.authors && props.paper.authors.length > 0 ? (
              <span>
                {props.paper.authors
                  .map((author, i) => (
                    <span key={author.authorId || author.name}>
                      {author.name}
                      {i < props.paper.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </span>
            ) : (
              <span>No authors listed</span>
            )}
          </div>
          <div className="text-sm text-neutral-400">
            {props.paper.publicationDate
              ? `Published on ${props.paper.publicationDate}`
              : `Published in ${props.paper.year}`}
          </div>

          {props.paper.tldr?.text && (
            <div className="text-sm">TLDR: {props.paper.tldr.text}</div>
          )}

<div className="flex flex-wrap gap-2 text-sm">
          <span className="">{props.paper.citationCount} Citations</span> {"|"}
          <span className="text-yellow-500">{props.paper.influentialCitationCount} Influential Citations</span> {"|"}
          <span className="">{props.paper.referenceCount} References</span>
        </div>

          {props.paper.externalIds &&
            Object.keys(props.paper.externalIds).length > 0 && (
              <div className="flex flex-col gap-2">
                {/* <div className="text-sm font-semibold">External IDs:</div> */}
                <div className="flex items-center gap-1 text-xs">
                  {/* <span className="font-medium">Semantic Scholar:</span> */}
                  <Link
                    href={`https://www.semanticscholar.org/paper/${props.paper.paperId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    View on Semantic Scholar ↗
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(props.paper.externalIds).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center gap-1 text-sm"
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">
                          {value as string}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>

    
      </div>
  );
};

const TabTriggers = [
  { id: "overview", label: "Overview" },
  { id: "references", label: "References" },
  { id: "citations", label: "Citations" },
  { id: "graph-view", label: "Graph View", badge: "Beta" },
  { id: "recommended", label: "Recommended" },
];

const PaperTabs = (props: { paper: Paper }) => {
  return (
    
      <Tabs defaultValue="overview" className="">
        
        <div className="relative rounded-sm overflow-x-scroll h-10 bg-muted">
        <TabsList className="gap-6 rounded-xs bg-transparent absolute flex flex-row justify-stretch w-full">
          {TabTriggers.map((tab) => (
            <TabsTrigger
              key={tab.id}
              className="cursor-pointer p-4 text-lg hover:underline gap-4"
              value={tab.id}
            >
              {tab.label} {tab.badge && <Badge variant="secondary">Beta</Badge>}
            </TabsTrigger>
          ))}
        </TabsList>
        </div>
        
        <Separator />
        <TabsContent value="overview">
          <OverviewTabContent paper={props.paper} />
        </TabsContent>
        <TabsContent value="references">
          <ReferencesTabContent paperId={props.paper.paperId} />
        </TabsContent>
        <TabsContent value="citations">
          <CitationsTabContent paperId={props.paper.paperId} />
        </TabsContent>
        <TabsContent value="graph-view">
          <GraphViewTabContent paperId={props.paper.paperId} />
        </TabsContent>
        <TabsContent value="recommended">
          <RecommendedTabContent paperId={props.paper.paperId} />
        </TabsContent>
      </Tabs>

);
};

export const PaperComponent = (props: { id: string }) => {
  const { data, isPending, error } = useGetPaperDetailsQuery({
    paperId: props.id,
    fields: [
      "title",
      "authors",
      "publicationDate",
      "year",
      "tldr",
      "abstract",
      "citationCount",
      "influentialCitationCount",
      "referenceCount",
      "paperId",
      "referenceCount",
      "externalIds",
    ],
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <PaperHero paper={data} />
      {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {props.auth ? (
          <AddPaperToFolderDropdownMenu
            folders={props.folders}
            paperId={props.paper.paperId!}
          />
        ) : (
          <Button variant="outline">
            <FileText /> Add to Folder
          </Button>
        )}

        <CiteThisPaperDialog paper={props.paper} />

        <Button variant="outline" onClick={() => refetch()}>
          <FileText /> Extract Snapshot
        </Button>

        <AskPaperDrawer />
      </div> */}
      <PaperTabs paper={data} />
    </ div>
  );
};
