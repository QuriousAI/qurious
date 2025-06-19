"use client";

import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";
import { Folder, FolderPlus } from "@workspace/ui/src/iconography";
import { Button } from "@workspace/ui/src/components/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@workspace/ui/src/components/dropdown-menu";
import { Checkbox } from "@workspace/ui/src/components/checkbox";
import { toast } from "@workspace/ui/src/components/sonner";
import {
  useAddPaperToFolderMutation,
  useRemovePaperFromFolderMutation,
} from "@/queries";
import { playToastSound } from "@workspace/ui/src/lib/sound";

export const AddPaperToFolderDropdownMenuWithTooltip = (props: {
  folders: Doc<"folders">[];
  paperId: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AddPaperToFolderDropdownMenu
          folders={props.folders}
          paperId={props.paperId}
        />
      </TooltipTrigger>
      <TooltipContent>Add to folder</TooltipContent>
    </Tooltip>
  );
};

const FolderCheckbox = (props: { folder: Doc<"folders">; paperId: string }) => {
  const { mutateAsync: addPaperToFolderMutation } =
    useAddPaperToFolderMutation();
  const { mutateAsync: removePaperFromFolderMutation } =
    useRemovePaperFromFolderMutation();

  const checked = props.folder.paperExternalIds.includes(props.paperId);

  const onCheckedChange = (e: Event) => {
    e.preventDefault();

    if (checked) {
      toast.promise(
        removePaperFromFolderMutation({
          folderId: props.folder._id,
          paperId: props.paperId,
        }),
        {
          position: "top-center",
          loading: "Removing from folder...",
          success: () => {
            return {
              message: "Removed from folder",
              richColors: true,
            };
          },
          error: { message: "Failed to remove from folder", richColors: true },
        }
      );
    } else {
      toast.promise(
        addPaperToFolderMutation({
          folderId: props.folder._id,
          paperId: props.paperId,
        }),
        {
          position: "top-center",
          loading: "Adding to folder...",
          success: () => {
            playToastSound();
            return {
              message: "Added to folder",
              richColors: true,
            };
          },
          error: { message: "Failed to add to folder", richColors: true },
        }
      );
    }
  };
  return (
    <DropdownMenuItem
      onSelect={(e) => onCheckedChange(e)}
      className="flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-1">
        <Folder />
        <div className="text-muted-foreground">/</div>
        <div className="">{props.folder.name}</div>
      </div>
      <Checkbox className="[&_*]:!stroke-black" checked={checked} />
    </DropdownMenuItem>
  );
};

/**
 * This is a button that opens a Dropdown Menu with a list of folders.
 * It allows the user to select one or more folders to add a paper/remove a paper from
 */
export const AddPaperToFolderDropdownMenu = (props: {
  folders: Doc<"folders">[];
  paperId: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <FolderPlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Folders /</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {props.folders.map((folder) => (
          <FolderCheckbox
            key={folder._id}
            folder={folder}
            paperId={props.paperId}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
