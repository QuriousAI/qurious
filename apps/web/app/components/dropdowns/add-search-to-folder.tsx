import { Folder, Plus } from "@workspace/design-system/icons";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@workspace/design-system/components/dropdown-menu";
import {
  useAddSearchToFolderMutation,
  useGetCurrentUserFoldersQuery,
  useRemoveSearchFromFolderMutation,
} from "@/queries";
import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import { Checkbox } from "@workspace/design-system/components/checkbox";
import { toast } from "@workspace/design-system/components/sonner";
import { playToastSound } from "@workspace/design-system/lib/sound";

const MyDropdownMenuItem = (props: {
  folder: Doc<"folders">;
  searchId: Id<"searches">;
}) => {
  const checked = props.folder.searchIds.includes(props.searchId);

  const { mutateAsync: addSearchToFolderMutation } =
    useAddSearchToFolderMutation();
  const { mutateAsync: removeSearchFromFolderMutation } =
    useRemoveSearchFromFolderMutation();

  const onSelect = (e: Event) => {
    e.preventDefault();
    if (checked) {
      toast.promise(
        removeSearchFromFolderMutation({
          folderId: props.folder._id,
          searchId: props.searchId,
        }),
        {
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
        addSearchToFolderMutation({
          folderId: props.folder._id,
          searchId: props.searchId,
        }),
        {
          loading: "Adding to folder...",
          success: () => {
            playToastSound();
            return {
              message: "Added to folder!",
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
      onSelect={onSelect}
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

export const AddSearchToFolderDropdownMenu = (props: {
  searchId: Id<"searches">;
}) => {
  const { data: folders = [] } = useGetCurrentUserFoldersQuery();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2">
        <Plus className="size-4 text-muted-foreground" />
        Add to Folder
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {folders.map((folder) => (
            <MyDropdownMenuItem
              key={folder._id}
              folder={folder}
              searchId={props.searchId}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
