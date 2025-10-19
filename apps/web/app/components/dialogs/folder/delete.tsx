"use client";

import { Button } from "@workspace/design-system/components/button";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@workspace/design-system/components/dialog";
import { toast } from "@workspace/design-system/components/sonner";
import { useDeleteFolderMutation } from "@/queries";
import { Id } from "@workspace/backend/_generated/dataModel";

export function DeleteFolderDialogContent(props: {
  name: string;
  folderId: Id<"folders">;
}) {
  const { mutateAsync } = useDeleteFolderMutation();

  const onClick = () => {
    toast.promise(mutateAsync({ folderId: props.folderId }), {
      position: "top-center",
      loading: "Deleting folder...",
      success: () => {
        return {
          message: `${props.name} folder deleted successfully`,
          richColors: true,
        };
      },
      error: { message: "Failed to delete folder", richColors: true },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your folder
          data (papers, searches & notes) from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={onClick} variant="destructive">
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
