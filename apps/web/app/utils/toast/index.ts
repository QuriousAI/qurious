import { toast } from "@workspace/ui/src/components/sonner";
import { playToastSound } from "@workspace/ui/src/lib/sound";

export const ToastPromise = (props: {
  mutateAsyncFn: () => Promise<any>;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
}) =>
  toast.promise(props.mutateAsyncFn(), {
    loading: props.loadingMessage,
    success() {
      playToastSound();
      return {
        message: props.successMessage,
        richColors: true,
      };
    },
    error: {
      message: props.errorMessage,
      richColors: true,
    },
  });
