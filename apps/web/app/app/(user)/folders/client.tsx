"use client";

import { Separator } from "@workspace/design-system/components/separator";
import { CreateFolderDialog } from "@/components/dialogs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Heading } from "../../../components/global-heading";
import { Folders } from "@workspace/design-system/icons";

import { FolderCard } from "@/components/cards/folder";
import { useGetCurrentUserFoldersQuery } from "@/queries";
import { SearchX } from "@workspace/design-system/icons";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/design-system/components/alert";

export const FoldersList = () => {
  const { data, isPending, error } = useGetCurrentUserFoldersQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return (
      <Alert variant="destructive">
        <SearchX className="h-4 w-4" />
        <AlertTitle>No folders found!</AlertTitle>
        <AlertDescription>
          Create one to by clicking the "+" button.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((folder, i) => (
        <FolderCard folder={folder} key={i} />
      ))}
    </div>
  );
};

export const FolderClient = () => {
  return (
    <>
      <Authenticated>
        <Heading
          heading="Folders"
          subHeading="Organize and manage your folders."
          icon={<Folders />}
          actions={<CreateFolderDialog />}
        />
        <div className="my-4" />
        <FoldersList />
      </Authenticated>
      <Unauthenticated>You're not signed in!</Unauthenticated>
      <AuthLoading>Loading auth status...</AuthLoading>
    </>
  );
};
