import { api } from "@workspace/backend/_generated/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Id } from "@workspace/backend/_generated/dataModel";

// Search Queries
export const useGetCurrentUserSearchesQuery = () =>
  useQuery({
    ...convexQuery(api.searches.queries.getCurrentUserSearches, {}),
  });

export const useCreateSearchMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.searches.mutations.createSearch),
  });

export const useDeleteSearchMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.searches.mutations.deleteSearch),
  });

export const useDeleteAllSearchesMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(
      api.searches.mutations.deleteCurrentUserSearches
    ),
  });

export const useGetMultipleSearchesQuery = (searchIds: Id<"searches">[]) =>
  useQuery({
    ...convexQuery(api.searches.queries.getMultiple, { searchIds }),
    enabled: searchIds.length > 0,
  });
