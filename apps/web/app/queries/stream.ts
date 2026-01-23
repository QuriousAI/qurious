import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "@workspace/backend/_generated/api";

export const useCreateStreamMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(
      api.externalActions.ai.paperSummary.createStream,
    ),
  });
