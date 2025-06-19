"use client";

import { Separator } from "@workspace/ui/src/components/separator";
import { CreateFolderDialog } from "@/components/dialogs";
import { FoldersList } from "@/components/lists";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Heading } from "../../../components/heading";
import { Folders } from "@workspace/ui/src/iconography";

export const FolderAuthSTate = () => {
  return (
    <>
      <Authenticated>
        {/* Header */}
        {/* <div className="flex items-center justify-between px-4"> */}
        {/* <div className="text-3xl font-semibold">Folders</div> */}
        <Heading
          heading="Folders"
          subHeading="Organize and manage your folders."
          icon={<Folders />}
          actions={<CreateFolderDialog />}
        />
        {/* </div> */}
        {/* <Separator className="mt-1 mb-4" /> */}
        <div className="my-4" />
        {/* Folders List */}
        <FoldersList />
      </Authenticated>
      <Unauthenticated>You're not signed in!</Unauthenticated>
      <AuthLoading>Loading user...</AuthLoading>
    </>
  );
};
