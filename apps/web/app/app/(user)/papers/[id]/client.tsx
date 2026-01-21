"use client";

import { Separator } from "@workspace/design-system/components/separator";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetPaperDetailsQuery, useGetPaperSnapshotQuery } from "@/queries";

import type { Paper } from "@workspace/semantic-scholar/src";
import { Skeleton } from "@workspace/design-system/components/skeleton";

import { GlobalErrorHandler } from "@/components/global-error";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/design-system/components/table";
import { AlertCircle } from "@workspace/design-system/icons";
import { cn } from "@workspace/design-system/lib/utils";

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
              {props.paper.authors.map((author, i) => (
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
          <span className="text-yellow-500">
            {props.paper.influentialCitationCount} Influential Citations
          </span>{" "}
          {"|"}
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
                {Object.entries(props.paper.externalIds).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">
                      {value as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

const NavLinks = [
  { href: "", label: "Overview" },
  { href: "/references", label: "References" },
  { href: "/citations", label: "Citations" },
  { href: "/graph", label: "Graph View", badge: "Beta" },
  { href: "/recommended", label: "Recommended" },
];

const PaperNav = (props: { paperId: string }) => {
  const pathname = usePathname();
  const basePath = `/papers/${props.paperId}`;

  return (
    <div className="flex gap-4 px-2 py-2 border-b">
      {NavLinks.map((link) => {
        const fullHref = `${basePath}${link.href}`;
        const isActive = pathname === fullHref;

        return (
          <Link
            key={link.href}
            href={fullHref}
            className={cn(
              "hover:text-blue-500 transition-colors",
              isActive && "text-blue-500 font-medium",
            )}
          >
            {link.label}
            {link.badge && (
              <span className="ml-1 text-xs bg-yellow-500/20 text-yellow-500 px-1 rounded">
                {link.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export const TableSnapshot = (props: {
  data: Record<string, string | null | undefined>;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(props.data).map(([key, value]) => {
          const label = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <TableRow key={key}>
              <TableCell className="font-medium">{label}</TableCell>
              <TableCell>
                {value ? (
                  <div className="text-wrap">{String(value)}</div>
                ) : (
                  <div className="text-destructive border rounded-md bg-card w-fit px-2 flex items-center gap-1">
                    <AlertCircle className="size-4" /> Couldn't Extract
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const PaperSnapShot = (props: { paper: Paper }) => {
  const { data, isPending, error } = useGetPaperSnapshotQuery({
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
    enabled: true,
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <TableSnapshot data={data} />
    </div>
  );
};

const OverviewTabContent = (props: { paper: Paper }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg">Abstract</div>
        <div className="text-base text-sm">{props.paper.abstract}</div>
      </div>
      <Separator className="max-w-1/4 self-center" />
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg">Snapshot</div>
        <PaperSnapShot paper={props.paper} />
      </div>
    </div>
  );
};

// Layout client component that wraps all paper pages
export function PaperLayoutClient(props: {
  paperId: string;
  children: React.ReactNode;
}) {
  const { data, isPending, error } = useGetPaperDetailsQuery({
    paperId: props.paperId,
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
      "externalIds",
    ],
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <GlobalErrorHandler error={error} />;
  }

  if (!data) {
    return <div>Paper not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <PaperHero paper={data} />
      <Separator className="max-w-1/4 self-center" />
      <PaperNav paperId={props.paperId} />
      {props.children}
    </div>
  );
}

// Overview page content component
export function OverviewPage(props: { paperId: string }) {
  const { data, isPending, error } = useGetPaperDetailsQuery({
    paperId: props.paperId,
    fields: ["abstract"],
  });

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <GlobalErrorHandler error={error} />;
  }

  if (!data) {
    return <div>Paper not found.</div>;
  }

  return <OverviewTabContent paper={data} />;
}
