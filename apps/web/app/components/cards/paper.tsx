"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/src/components/card";
import { Paper } from "@workspace/semantic-scholar/src";
import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import Link from "next/link";
import {
  Dot,
  File,
  FileText,
  Loader2,
  NotebookPen,
  StickyNote,
} from "@workspace/ui/src/iconography";
import { getAuthorString } from "@/utils/author";

// import { AskPaperDrawer } from "@/components/_todo/ask-paper-drawer";

import { AddPaperToFolderDropdownMenuWithTooltip } from "@/components/dropdown";
import { CiteThisPaperDialogWithTooltip } from "@/components/dialogs";
import { CopyToClipboardButtonWithTooltip } from "@/components/buttons/";
import { Button } from "@workspace/ui/src/components/button";
import { useGetPaperSnapshotQuery } from "@/queries";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";
import { toast } from "@workspace/ui/src/components/sonner";
import { TableSnapshop } from "../paper-tabs/overview";

type PaperCardProps = { paper: Paper; resultIndex: number } & (
  | { authenticated: true; folders: Doc<"folders">[] }
  | { authenticated: false; folders?: never }
);

const PaperCardHeader = (props: {
  resultIndex: number;
  paperTitle: string;
  paperId: string;
}) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-4 text-lg">
        {/* <div className="text-muted-foreground">{props.resultIndex}</div> */}
        <div className="relative flex items-center justify-center text-muted-foreground">
          <File className="size-12" strokeWidth={1} />
          <div className="absolute translate-y-1 text-lg font-medium">
            {props.resultIndex}
          </div>
        </div>
        <Link
          href={`/papers/${props.paperId}`}
          className="underline-offset-4 hover:underline decoration-white/50"
        >
          {props.paperTitle}
        </Link>
      </CardTitle>
    </CardHeader>
  );
};

const PaperCardContent = (props: {
  abstract: string | undefined;
  tldr: string | undefined;
}) => {
  let content;

  // first, it checks if tldr is present, if it then it sets the content to tldr,
  // if not present then it checks if abstract is present, if it then it sets the content to abstract,
  // if not present then it sets the content to "Summary unavailable."
  if (props.tldr) {
    content = `TL;DR: ${props.tldr}`;
  } else if (props.abstract) {
    content = `Abstract: ${props.abstract.length > 300 ? props.abstract.slice(0, 297) + "..." : props.abstract}`;
  } else {
    content = "Summary unavailable.";
  }

  return (
    <CardContent className="">
      <div className="rounded-xs border-l-4 bg-neutral-800 px-2 py-2">
        {content}
      </div>
    </CardContent>
  );
};

const LeftSide = (props: {
  pubDate: string;
  citationCount: number;
  influentialCitationCount: number;
  authors: any[];
  journal: string;
  fieldsOfStudy: string[];
  publicationTypes: string[];
}) => (
  <div className="text-muted-foreground flex flex-col items-start text-sm">
    <div className="flex items-center gap-0">
      <div>{props.pubDate}</div>
      <Dot />
      <div className="flex items-center gap-1">
        <NotebookPen className="size-5" /> {props.journal}
      </div>
      <Dot />
      <div className="flex items-center gap-0">
        {props.citationCount} citations ({props.influentialCitationCount}{" "}
        influential)
      </div>
    </div>
    {/* <div className="flex items-center gap-0">
        {props.publicationTypes.join(", ")} <Dot />{" "}
        {props.fieldsOfStudy.join(", ")}
      </div> */}
    <div className="">{getAuthorString(props.authors)}</div>
  </div>
);

const FakeFolderIcon = () => {
  return (
    <div
      className="flex items-center justify-center cursor-pointer hover:opacity-80"
      onClick={() => (window.location.href = "/signup")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.89l-.812-1.22A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      </svg>
    </div>
  );
};
const RightSide = (props: {
  paper: Paper;
  folders: Doc<"folders">[];
  auth: boolean;
}) => {
  return (
    <div className="flex gap-2">
      {props.auth ? (
        <AddPaperToFolderDropdownMenuWithTooltip
          folders={props.folders}
          paperId={props.paper.paperId!}
        />
      ) : (
        <FakeFolderIcon />
      )}

      {/* Second Icon - Cite this paper */}
      <CiteThisPaperDialogWithTooltip paper={props.paper} />
    </div>
  );
};

const PaperCardFooter = (props: {
  paper: Paper;
  folders: Doc<"folders">[];
  auth: boolean;
}) => {
  const { data, isPending, error, refetch } = useGetPaperSnapshotQuery({
    abstract: props.paper.abstract,
    fields: [
      "Methods",
      "Population",
      "Sample size",
      "Duration",
      "Location",
      "Outcomes",
      "Results",
    ],
    enabled: false, // Don't run query on mount
  });

  const onBtnClick = () => {
    toast("Input received!");
    refetch();
  };

  return (
    <CardFooter className="flex-col">
      <div className="flex">
        <LeftSide
          pubDate={props.paper.publicationDate!}
          citationCount={props.paper.citationCount!}
          influentialCitationCount={props.paper.influentialCitationCount!}
          authors={props.paper.authors!}
          journal={props.paper.journal?.name!}
          fieldsOfStudy={props.paper.fieldsOfStudy ?? []}
          publicationTypes={props.paper.publicationTypes ?? []}
        />
        <RightSide
          paper={props.paper}
          folders={props.folders}
          auth={props.auth}
        />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={() => onBtnClick()}>
            {data ? <FileText /> : <Loader2 />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Paper Snapshot</TooltipContent>
      </Tooltip>
      {data && (
        <div className="">
          <TableSnapshop data={data} />
        </div>
      )}
      FUCKING SHOW ACTION BUTTONS HERES
    </CardFooter>
  );
};

export const PaperCard = (props: PaperCardProps) => {
  return (
    <Card className="py-4 transition-all duration-500" id="tour-paper-card">
      <PaperCardHeader
        resultIndex={props.resultIndex}
        paperTitle={props.paper.title!}
        paperId={props.paper.paperId!}
      />
      <PaperCardContent
        abstract={props.paper.abstract}
        tldr={props.paper.tldr?.text}
      />
      <PaperCardFooter
        paper={props.paper}
        folders={props.folders!}
        auth={props.authenticated}
      />
    </Card>
  );
};
