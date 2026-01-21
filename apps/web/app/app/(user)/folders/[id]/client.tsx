"use client";

import { Separator } from "@workspace/design-system/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/design-system/components/tabs";
import { Textarea } from "@workspace/design-system/components/textarea";
import { Label } from "@workspace/design-system/components/label";
import {
  useGetFolderByIdQuery,
  useGetMultiplePapersDetailsQuery,
  useGetMultipleSearchesQuery,
  useUpdateFolderPrivacyMutation,
} from "@/queries";
import { PaperCard, SearchCard } from "../../../../components/cards";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Switch } from "@workspace/design-system/components/switch";
import Tiptap from "../../../../components/tiptap";
import { Heading } from "../../../../components/global-heading";
import { Folder, NotebookPen, User } from "@workspace/design-system/icons";
import { GlobalErrorHandler } from "../../../../components/global-error";
import { motion } from "motion/react";
import { Doc } from "@workspace/backend/_generated/dataModel";

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

const PapersTab = (props: { folder: Doc<"folders"> }) => {
  const {
    data: papers,
    isPending,
    error,
  } = useGetMultiplePapersDetailsQuery({
    paperIds: props.folder.paperExternalIds,
    fields: [...PAPER_LIST_FIELDS],
  });

  if (isPending) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Papers in this folder</h3>
        <div>Loading papers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Papers in this folder</h3>
        <GlobalErrorHandler error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-semibold">Papers in this folder</h3> */}
      {!papers || papers.length === 0 ? (
        <p className="text-muted-foreground">No papers in this folder yet.</p>
      ) : (
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
      )}
    </div>
  );
};

const SearchesTab = (props: { folder: Doc<"folders"> }) => {
  const {
    data: searches,
    isPending,
    error,
  } = useGetMultipleSearchesQuery(props.folder.searchIds);

  if (isPending) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Searches in this folder</h3>
        <div>Loading searches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Searches in this folder</h3>
        <GlobalErrorHandler error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-semibold">Searches in this folder</h3> */}
      {!searches || searches.length === 0 ? (
        <p className="text-muted-foreground">No searches in this folder yet.</p>
      ) : (
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
      )}
    </div>
  );
};

export function FolderClientComponent(props: { folderId: string }) {
  const updateFolderPrivacyMutation = useUpdateFolderPrivacyMutation();

  const {
    data: folder,
    isPending,
    error,
  } = useGetFolderByIdQuery(props.folderId as Id<"folders">);

  if (isPending) {
    return <div>Loading...</div>;
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
    <motion.div
      className=""
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
        {folder.name}
      </motion.div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="privacy-toggle" className="text-sm font-medium">
            Private Folder
          </Label>
          <Switch
            id="privacy-toggle"
            checked={!folder.public}
            onCheckedChange={(checked) => {
              updateFolderPrivacyMutation.mutate({
                folderId: props.folderId as Id<"folders">,
                isPrivate: checked,
              });
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {!folder.public
            ? "Only you can see this folder"
            : "Anyone can see this folder"}
        </p>
      </div>

      <div className="mt-1 text-neutral-400">{folder.description}</div>
      <Separator className="mt-4" />
      <div className="mt-4 flex flex-col gap-2">
        <Heading
          heading="Notes"
          subHeading="Add and edit notes for this folder."
          icon={<NotebookPen />}
        />
        <div className="border p-2 rounded-md">
          <Tiptap
            content={folder.content}
            folderId={folder._id}
            editable={true}
          />
        </div>
      </div>
      <Tabs defaultValue="papers" className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="papers">Papers</TabsTrigger>
          <TabsTrigger value="searches">Searches</TabsTrigger>
        </TabsList>
        <TabsContent value="papers">
          <PapersTab folder={folder} />
        </TabsContent>
        <TabsContent value="searches">
          <SearchesTab folder={folder} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
