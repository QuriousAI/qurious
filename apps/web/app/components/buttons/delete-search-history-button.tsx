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

const DeleteSearchHistoryButton = () => {
  const deleteAllSearchesMutation = useDeleteAllSearchesMutation();

  const deleteSearchHistory = () => {
    ToastPromise({
      mutateAsyncFn: () => deleteAllSearchesMutation.mutateAsync({}),
      loadingMessage: "Deleting search history...",
      successMessage: "Search history deleted successfully!",
      errorMessage: "Failed to delete search history.",
    });
  };

  return (
    <Button variant="destructive" onClick={() => deleteSearchHistory()}>
      <Trash2 /> Delete Search History
    </Button>
  );
};
