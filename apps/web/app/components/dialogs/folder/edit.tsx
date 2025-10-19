"use client";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/design-system/components/dialog";
import { Label } from "@workspace/design-system/components/label";
import { Input } from "@workspace/design-system/components/input";
import { Button } from "@workspace/design-system/components/button";
import { useState } from "react";
import { toast } from "@workspace/design-system/components/sonner";
import { Switch } from "@workspace/design-system/components/switch";
import { useUpdateFolderNameMutation } from "@/queries";
import { Doc } from "@workspace/backend/_generated/dataModel";

export function EditFolderDialogContent(props: { folder: Doc<"folders"> }) {
  const [name, setName] = useState(props.folder.name);

  const updateFolderNameMutation = useUpdateFolderNameMutation();

  const updateFolder = () => {
    if (!name.trim()) {
      toast.error("Please enter a folder name", { richColors: true });
      return;
    }

    updateFolderNameMutation.mutate(
      {
        folderId: props.folder._id,
        name: name.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Folder renamed successfully", { richColors: true });
          // Close dialog or reset form as needed
        },
        onError: (error) => {
          toast.error("Failed to rename folder", { richColors: true });
        },
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename Folder</DialogTitle>
        <DialogDescription>Enter a new name for your folder.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="ml-1 text-xs text-neutral-400">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={updateFolder}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
