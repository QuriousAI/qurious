"use client";

import { Button } from "@workspace/ui/src/components/button";
import { Input } from "@workspace/ui/src/components/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@workspace/ui/src/components/dialog";
import { Label } from "@workspace/ui/src/components/label";
import { Plus } from "@workspace/ui/src/iconography";
import { useState } from "react";
import { toast } from "@workspace/ui/src/components/sonner";
import { useCreateFolderMutation } from "@/queries";

export function CreateFolderDialog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutateAsync } = useCreateFolderMutation();

  const createFolderOnSave = () => {
    toast.promise(
      mutateAsync({
        name: name,
        description: description,
      }),
      {
        loading: "Creating folder...",
        success: {
          message: `${name} folder created successfully!`,
          richColors: true,
        },
        error: { message: "Failed to create folder", richColors: true },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            Create a new Folder here. Click save when you're done.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label className="ml-1 text-xs text-neutral-400">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="ml-1 text-xs text-neutral-400">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={createFolderOnSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
