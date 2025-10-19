import { Button } from "@workspace/design-system/components/button";
import { Label } from "@workspace/design-system/components/label";
import { Textarea } from "@workspace/design-system/components/textarea";
import { Trash2 } from "@workspace/design-system/icons";
import { InformationTooltip } from "@/components/information-tooltip";
import {
  useDeleteAllFoldersMutation,
  useDeleteAllSearchesMutation,
} from "@/queries";
import { ToastPromise } from "@/utils/toast";

const DeleteAllFoldersButton = () => {
  const deleteAllFoldersMutation = useDeleteAllFoldersMutation();

  const deleteAllFolders = () => {
    ToastPromise({
      mutateAsyncFn: () => deleteAllFoldersMutation.mutateAsync({}),
      loadingMessage: "Deleting all folders...",
      successMessage: "All folders deleted successfully!",
      errorMessage: "Failed to delete all folders.",
    });
  };

  return (
    <Button variant="destructive" onClick={() => deleteAllFolders()}>
      <Trash2 /> Delete All Folders
    </Button>
  );
};
