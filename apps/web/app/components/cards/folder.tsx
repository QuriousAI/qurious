"use client";

import { Button } from "@workspace/design-system/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/design-system/components/card";
import { Dialog, DialogTrigger } from "@workspace/design-system/components/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@workspace/design-system/components/dropdown-menu";
import {
  EllipsisVertical,
  Edit2,
  Trash2,
  Dot,
  Folder,
} from "@workspace/design-system/icons";
import { useState } from "react";
import Link from "next/link";
import { DeleteFolderDialogContent } from "@/components/dialogs/folder/delete";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { EditFolderDialogContent } from "@/components/dialogs/folder/edit";
import { Separator } from "@workspace/design-system/components/separator";
import { InformationTooltip } from "@/components/information-tooltip";

{
  /*
    some explanation for the future me - this is a dropdown menu (that is trigged by the "folder-options" button) that has two options: edit & delete.
    clicking on any button in the dropdown menu will render a dialog component.
    but then you must be wondering why not put the dialog inside the dropdown menu for easier readability?
    well, i'm glad you asked!!! ~
    because that's what the fuck the shadcn/ui docs recommend.

    basically you need to put the dialog as the parent, then the dropdown menu inside the dialog in order to render the dialog where the dropdown menu button is clicked.
    then programatically set the content of the dialog based on the selected option.
    
    man, i sure i wished there was a bullet in my head at this point!
    
    second time, you have a button (three dots) -(triggers)-> dropdown menu -(triggers)-> dialog component
    */
}
const OptionsDialogWithDropDown = (props: { folder: Doc<"folders"> }) => {
  const [selectedDialogState, setSelectedDialogState] = useState<
    "none" | "edit" | "delete"
  >("none");

  const getDialogContent = () => {
    switch (selectedDialogState) {
      case "edit":
        return <EditFolderDialogContent folder={props.folder} />;
      case "delete":
        return (
          <DeleteFolderDialogContent
            folderId={props.folder._id}
            name={props.folder.name}
          />
        );
      case "none":
        return null;
      default:
        throw new Error("Invalid dialog state");
    }
  };

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute top-1/2 right-6 -translate-y-1/2"
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setSelectedDialogState("edit")}>
              <Edit2 />
              <span>Rename</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setSelectedDialogState("delete")}
            >
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {getDialogContent()}
    </Dialog>
  );
};

export const FolderCard = (props: { folder: Doc<"folders"> }) => {
  return (
    <Card className="gap-2 py-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-semibold">
          <Folder className="text-muted-foreground size-5" />
          <div className="flex text-xl items-center gap-2">
            <Link
              className="underline-offset-4 hover:underline"
              href={`/folders/${props.folder._id}`}
            >
              {props.folder.name}
            </Link>
            {props.folder.type === "SYSTEM_CREATED_BOOKMARKS_FOLDER" && (
              <InformationTooltip content="This is a system created folder for your bookmarks. You're free to edit or delete it." />
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="bg-neutral-800 w-fit border-l-2 pl-2 pr-2">
          {props.folder.description}
        </div>
        <OptionsDialogWithDropDown folder={props.folder} />
      </CardContent>

      <CardFooter>
        <div className="">
          Privacy: {props.folder.public ? "Public" : "Private"}
        </div>
        <Dot className="text-muted-foreground" />
        <div className="">{props.folder.paperExternalIds.length} papers</div>
        <Dot className="text-muted-foreground" />
        <div className="">{props.folder.searchIds.length} searches</div>
      </CardFooter>
    </Card>
  );
};
