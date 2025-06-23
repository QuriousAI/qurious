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
import { File, FileText } from "@workspace/ui/src/iconography";

import { AddPaperToFolderDropdownMenu } from "@/components/dropdowns/add-paper-to-folder";
import { CiteThisPaperDialog } from "@/components/dialogs";
import { Button } from "@workspace/ui/src/components/button";
import { useGetPaperSnapshotQuery } from "@/queries";

import { TableSnapshop } from "../paper-tabs/overview";
import { Separator } from "@workspace/ui/src/components/separator";
import { AskPaperDrawer } from "../drawers/ask-paper";
import { Authenticated } from "convex/react";

const FileIndexIcon = (props: { resultIndex: number }) => (
  <div className="relative flex items-center justify-center text-muted-foreground">
    <File className="size-12" strokeWidth={1} />
    <div className="absolute translate-y-1 text-lg font-medium">
      {props.resultIndex}
    </div>
  </div>
);

const PaperCardHeader = (props: { resultIndex: number; paper: Paper }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-4 text-lg">
        <FileIndexIcon resultIndex={props.resultIndex} />
        <Link
          href={`/papers/${props.paper.paperId}`}
          className="underline-offset-4 hover:underline decoration-white/50"
        >
          {props.paper.title}
        </Link>
      </CardTitle>
    </CardHeader>
  );
};

const PaperCardContent = (props: { paper: Paper }) => {
  let content = "Summary unavailable.";

  // first, it checks if tldr is present, if it then it sets the content to tldr,
  // if not present then it checks if abstract is present, if it then it sets the content to abstract,
  // if not present then it sets the content to "Summary unavailable."
  if (props.paper.tldr) {
    content = `TL;DR: ${props.paper.tldr.text}`;
  } else if (props.paper.abstract) {
    content = `Abstract: ${props.paper.abstract.length > 300 ? props.paper.abstract.slice(0, 297) + "..." : props.paper.abstract}`;
  }

  return (
    <CardContent className="">
      <div className="rounded-xs border-l-4 bg-neutral-800 px-2 py-2">
        {content}
      </div>
    </CardContent>
  );
};

const PaperInformationFooter = ({ paper }: { paper: Paper }) => {
  return null;
};

const PaperCardFooter = (props: { paper: Paper }) => {
  const {
    data: paperSnapshot,
    isPending,
    error,
    refetch,
  } = useGetPaperSnapshotQuery({
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
    enabled: false,
  });

  return (
    <CardFooter className="flex-col">
      <PaperInformationFooter paper={props.paper} />

      <Separator className="my-3 rounded-full" />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <Authenticated>
          <AddPaperToFolderDropdownMenu paperId={props.paper.paperId!} />
        </Authenticated>

        <CiteThisPaperDialog paper={props.paper} />

        <Button variant="outline" onClick={() => refetch()}>
          <FileText /> Extract Snapshot
        </Button>

        <AskPaperDrawer />
      </div>

      {paperSnapshot && <TableSnapshop data={paperSnapshot} />}
    </CardFooter>
  );
};

export const PaperCard = (props: { paper: Paper; resultIndex: number }) => {
  return (
    <Card>
      <PaperCardHeader resultIndex={props.resultIndex} paper={props.paper} />
      <PaperCardContent paper={props.paper} />
      <PaperCardFooter paper={props.paper} />
    </Card>
  );
};
