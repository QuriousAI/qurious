import { Button } from "@workspace/ui/src/components/button";
import { Label } from "@workspace/ui/src/components/label";
import { Textarea } from "@workspace/ui/src/components/textarea";
import { Trash2 } from "@workspace/ui/src/iconography";
import { InformationToolTip } from "@/components/information-tooltip";
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
