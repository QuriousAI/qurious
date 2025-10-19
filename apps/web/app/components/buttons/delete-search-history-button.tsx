import { Button } from "@workspace/design-system/components/button";
import { Label } from "@workspace/design-system/components/label";
import { Textarea } from "@workspace/design-system/components/textarea";
import { Trash2 } from "@workspace/design-system/icons";
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
