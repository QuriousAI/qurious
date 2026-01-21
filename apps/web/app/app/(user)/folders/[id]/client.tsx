"use client";

import { Separator } from "@workspace/design-system/components/separator";
import { Label } from "@workspace/design-system/components/label";
import {
  useGetFolderByIdQuery,
  useGetMultiplePapersDetailsQuery,
  useGetMultipleSearchesQuery,
  useUpdateFolderPrivacyMutation,
} from "@/queries";
import { PaperCard, SearchCard } from "@/components/cards";
import { Id, Doc } from "@workspace/backend/_generated/dataModel";
import { Switch } from "@workspace/design-system/components/switch";
import Tiptap from "@/components/tiptap";
import { Heading } from "@/components/global-heading";
import { Folder, NotebookPen } from "@workspace/design-system/icons";
import { GlobalErrorHandler } from "@/components/global-error";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@workspace/design-system/lib/utils";
import { Skeleton } from "@workspace/design-system/components/skeleton";

/** Common paper fields used across multiple components */
const PAPER_LIST_FIELDS = [
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

// Navigation links for folder pages
const NavLinks = [
  { href: "", label: "Papers" },
  { href: "/searches", label: "Searches" },
];

const FolderNav = (props: { folderId: string }) => {
  const pathname = usePathname();
  const basePath = `/folders/${props.folderId}`;

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
          </Link>
        );
      })}
    </div>
  );
};

const FolderHero = (props: { folder: Doc<"folders">; folderId: string }) => {
  const updateFolderPrivacyMutation = useUpdateFolderPrivacyMutation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="text-3xl font-bold flex items-center gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Folder className="text-muted-foreground size-10" />
        {props.folder.name}
      </motion.div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="privacy-toggle" className="text-sm font-medium">
            Private Folder
          </Label>
          <Switch
            id="privacy-toggle"
            checked={!props.folder.public}
            onCheckedChange={(checked) => {
              updateFolderPrivacyMutation.mutate({
                folderId: props.folderId as Id<"folders">,
                isPrivate: checked,
              });
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {!props.folder.public
            ? "Only you can see this folder"
            : "Anyone can see this folder"}
        </p>
      </div>

      <div className="mt-1 text-neutral-400">{props.folder.description}</div>
      <Separator className="mt-4" />
      <div className="mt-4 flex flex-col gap-2">
        <Heading
          heading="Notes"
          subHeading="Add and edit notes for this folder."
          icon={<NotebookPen />}
        />
        <div className="border p-2 rounded-md">
          <Tiptap
            content={props.folder.content}
            folderId={props.folder._id}
            editable={true}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Layout client component that wraps all folder pages
export function FolderLayoutClient(props: {
  folderId: string;
  children: React.ReactNode;
}) {
  const {
    data: folder,
    isPending,
    error,
  } = useGetFolderByIdQuery(props.folderId as Id<"folders">);

  if (isPending) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    if (error.message === "Folder not found") {
      return <div>Folder not found</div>;
    }

    if (error.message.includes("Uncaught Error: Can't get current user!")) {
      return (
        <div className="flex items-center justify-center h-full">
          This folder is private. If you're the owner - log in to access.
        </div>
      );
    }

    return <GlobalErrorHandler error={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <FolderHero folder={folder} folderId={props.folderId} />
      <FolderNav folderId={props.folderId} />
      {props.children}
    </div>
  );
}

// Papers page content component
export function PapersPage(props: { folderId: string }) {
  const {
    data: folder,
    isPending: isFolderPending,
    error: folderError,
  } = useGetFolderByIdQuery(props.folderId as Id<"folders">);

  const {
    data: papers,
    isPending: isPapersPending,
    error: papersError,
  } = useGetMultiplePapersDetailsQuery({
    paperIds: folder?.paperExternalIds ?? [],
    fields: [...PAPER_LIST_FIELDS],
  });

  if (isFolderPending || isPapersPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  const error = folderError || papersError;
  if (error) {
    return <GlobalErrorHandler error={error} />;
  }

  if (!papers || papers.length === 0) {
    return (
      <p className="text-muted-foreground">No papers in this folder yet.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Papers ({papers.length})</h2>
      <motion.div
        className="space-y-2"
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
        {papers.map((paper, i) => (
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
    </div>
  );
}

// Searches page content component
export function SearchesPage(props: { folderId: string }) {
  const {
    data: folder,
    isPending: isFolderPending,
    error: folderError,
  } = useGetFolderByIdQuery(props.folderId as Id<"folders">);

  const {
    data: searches,
    isPending: isSearchesPending,
    error: searchesError,
  } = useGetMultipleSearchesQuery(folder?.searchIds ?? []);

  if (isFolderPending || isSearchesPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  const error = folderError || searchesError;
  if (error) {
    return <GlobalErrorHandler error={error} />;
  }

  if (!searches || searches.length === 0) {
    return (
      <p className="text-muted-foreground">No searches in this folder yet.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Searches ({searches.length})</h2>
      <motion.div
        className="space-y-2"
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
        {searches.map((search, index) => (
          <motion.div
            key={search._id || index}
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <SearchCard questionText={search.query} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
