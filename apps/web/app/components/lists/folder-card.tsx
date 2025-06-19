"use client";

export const FolderCardList = () => {};

import { FolderCard } from "@/components/cards/folder";
import { useGetCurrentUserFoldersQuery } from "@/queries";
import { SearchX } from "@workspace/ui/src/iconography";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/src/components/alert";

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
