"use client";

import { Separator } from "@workspace/ui/src/components/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/src/components/tabs";
import { Textarea } from "@workspace/ui/src/components/textarea";
import { Label } from "@workspace/ui/src/components/label";
import {
  useGetFolderByIdQuery,
  useGetMultiplePapersDetailsQuery,
  useGetMultipleSearchesQuery,
  useUpdateFolderPrivacyMutation,
} from "@/queries";
import { PaperCard, SearchCard } from "../../../../components/cards";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { Switch } from "@workspace/ui/src/components/switch";
import Tiptap from "../../../../components/tiptap";
import { Heading } from "../../../../components/global-heading";
import { Folder, NotebookPen, User } from "@workspace/ui/src/iconography";

const PapersTab = (props) => {
  const {
    data: papers,
    isPending,
    error,
  } = useGetMultiplePapersDetailsQuery({
    paperIds: props.folder.paperExternalIds,
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
        <div className="text-red-500">
          Error loading papers: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-semibold">Papers in this folder</h3> */}
      {!papers || papers.length === 0 ? (
        <p className="text-muted-foreground">No papers in this folder yet.</p>
      ) : (
        <div className="space-y-2">
          {papers.map((paper, i) => (
            <PaperCard paper={paper} key={i} resultIndex={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const SearchesTab = (props) => {
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
        <div className="text-red-500">
          Error loading searches: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-semibold">Searches in this folder</h3> */}
      {!searches || searches.length === 0 ? (
        <p className="text-muted-foreground">No searches in this folder yet.</p>
      ) : (
        <div className="space-y-2">
          {searches.map((search, index) => (
            // <div key={search._id} className="p-3 border rounded-lg">
            //   <p className="font-medium">Query: {search.query}</p>
            //   <p className="text-sm text-muted-foreground">
            //     Created: {new Date(search._creationTime).toLocaleDateString()}
            //   </p>
            // </div>
            <SearchCard questionText={search.query} />
          ))}
        </div>
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
    console.log({ error });
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

    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <div className="text-3xl font-bold flex items-center gap-4">
        <Folder className="text-muted-foreground size-10" />
        {folder.name}
      </div>

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
    </div>
  );
}
