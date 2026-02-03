"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { Paper } from "@workspace/semantic-scholar/src";
import { Doc } from "@workspace/backend/_generated/dataModel";
import Link from "next/link";
import { File, FileText } from "@workspace/design-system/icons";

import { AddPaperToFolderDropdownMenu } from "@/components/dropdowns/add-paper-to-folder";
import { CiteThisPaperDialog } from "@/components/dialogs";
import { Button } from "@workspace/design-system/components/button";
import { useGetPaperSnapshotQuery } from "@/queries";

import { TableSnapshot } from "@/app/(user)/papers/[id]/client";
import { Separator } from "@workspace/design-system/components/separator";
import { AskPaperDrawer } from "../drawers/ask-paper";
import { Authenticated } from "convex/react";
import { motion } from "motion/react";

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
    <CardHeader className="px-2">
      <CardTitle className="leading-6 line-clamp-3">
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
    <CardContent className="px-2 leading-4 text-sm">
      <div className="rounded-xs border-l-4 bg-neutral-800 px-2 py-2">
        {content}
      </div>
    </CardContent>
  );
};

import { Badge } from "@workspace/design-system/components/badge";
import React from "react";

const PaperInformationFooter = ({ paper }: { paper: Paper }) => {
  if (!paper) return null;

  // Helper for FOS
  const renderFieldsOfStudy = () => {
    if (Array.isArray(paper.fieldsOfStudy) && paper.fieldsOfStudy.length > 0) {
      return (
        <Badge variant="secondary">
          Fields: {paper.fieldsOfStudy.map((f) => f).join(", ")}
        </Badge>
      );
    } else if (
      Array.isArray(paper.s2FieldsOfStudy) &&
      paper.s2FieldsOfStudy.length > 0
    ) {
      return (
        <Badge variant="secondary">
          Fields:{" "}
          {paper.s2FieldsOfStudy
            .map((f) => f.category)
            .filter(Boolean)
            .join(", ")}
        </Badge>
      );
    }
    return null;
  };

  const renderPublicationVenue = () => {
    if (paper.venue) {
      return <Badge variant="outline">Venue: {paper.venue}</Badge>;
    } else if (paper.publicationVenue && paper.publicationVenue.name) {
      return (
        <Badge variant="outline">Venue: {paper.publicationVenue.name}</Badge>
      );
    } else if (paper.journal && paper.journal.name) {
      return <Badge variant="outline">Journal: {paper.journal.name}</Badge>;
    }
    return null;
  };

  const renderAuthors = () => {
    if (Array.isArray(paper.authors) && paper.authors.length > 0) {
      // Limit number of displayed authors for brevity, but show all on hover via title.
      const authorNames = paper.authors
        .map((a) => a.name)
        .filter(Boolean)
        .join(", ");
      const show = paper.authors
        .slice(0, 3)
        .map((a) => a.name)
        .filter(Boolean)
        .join(", ");
      return (
        <Badge variant="outline" title={authorNames}>
          Authors: {show}
          {paper.authors.length > 3
            ? `, +${paper.authors.length - 3} more`
            : ""}
        </Badge>
      );
    }
    return null;
  };

  const renderPublicationYear = () => {
    if (paper.publicationDate) {
      return <Badge>Published: {paper.publicationDate.slice(0, 10)}</Badge>;
    } else if (typeof paper.year === "number") {
      return <Badge>Year: {paper.year}</Badge>;
    }
    return null;
  };

  const renderCounts = () => {
    const citation =
      typeof paper.citationCount === "number" ? (
        <Badge variant="secondary">Citations: {paper.citationCount}</Badge>
      ) : null;
    const reference =
      typeof paper.referenceCount === "number" ? (
        <Badge variant="secondary">References: {paper.referenceCount}</Badge>
      ) : null;
    const influential =
      typeof paper.influentialCitationCount === "number" &&
      paper.influentialCitationCount > 0 ? (
        <Badge variant="secondary">
          Influential: {paper.influentialCitationCount}
        </Badge>
      ) : null;
    return [citation, reference, influential].filter(Boolean);
  };

  const renderOpenAccess = () => {
    if (paper.isOpenAccess) {
      return <Badge variant="success">Open Access</Badge>;
    }
    return null;
  };

  // Compose information as badge components
  const badges = [
    renderFieldsOfStudy(),
    renderPublicationVenue(),
    renderAuthors(),
    renderPublicationYear(),
    ...renderCounts(),
    renderOpenAccess(),
  ].filter(Boolean);

  if (badges.length === 0) return null;

  return (
    <div className="flex-col text-xs py-1">
      {badges.map((badge, i) => (
        <React.Fragment key={i}>{badge}</React.Fragment>
      ))}
    </div>
  );
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
    <CardFooter className="flex-col px-2">
      {/* <PaperInformationFooter paper={props.paper} /> */}

      <Separator className="my-3 rounded-full" />

      <div className="grid grid-cols-4 xl:grid-cols-4 gap-2 w-full">
        <Authenticated>
          <AddPaperToFolderDropdownMenu paperId={props.paper.paperId!} />
        </Authenticated>

        <CiteThisPaperDialog paper={props.paper} />

        <Button variant="outline" onClick={() => refetch()}>
          <FileText /> <span className="hidden">Extract Snapshot</span>
        </Button>

        <AskPaperDrawer paper={props.paper} />
      </div>

      {paperSnapshot && <TableSnapshot data={paperSnapshot} />}
    </CardFooter>
  );
};

export const PaperCard = (props: { paper: Paper; resultIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Card className="gap-2 py-2 transition-shadow hover:shadow-lg">
        <PaperCardHeader resultIndex={props.resultIndex} paper={props.paper} />
        <PaperCardContent paper={props.paper} />
        <PaperCardFooter paper={props.paper} />
      </Card>
    </motion.div>
  );
};
