"use client";

import { Id } from "@workspace/backend/convex/_generated/dataModel";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@workspace/ui/src/components/dialog";
import { Button } from "@workspace/ui/src/components/button";
import { useDeleteSearchMutation } from "@/queries";
import { toast } from "@workspace/ui/src/components/sonner";
import { Trash2 } from "@workspace/ui/src/iconography";

export function DeleteSearchDialogContent(props: {
  name: string;
  searchId: Id<"searches">;
}) {
  const { mutateAsync } = useDeleteSearchMutation();

  const onClick = () => {
    toast.promise(mutateAsync({ searchId: props.searchId }), {
      loading: "Deleting search...",
      success: () => {
        return {
          message: `${props.name} search deleted successfully`,
          richColors: true,
        };
      },
      error: { message: "Failed to delete search", richColors: true },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your search
          data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        {/* <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose> */}
        <DialogClose asChild>
          <Button onClick={onClick} variant="destructive">
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
