import { api } from "@workspace/backend/convex/_generated/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { Id } from "@workspace/backend/convex/_generated/dataModel";

// Folder Queries

export const useGetCurrentUserFoldersQuery = () =>
  useQuery({
    ...convexQuery(api.folders.queries.getCurrentUserFolders, {}),
  });

export const useGetFolderByIdQuery = (folderId: Id<"folders">) =>
  useQuery({
    ...convexQuery(api.folders.queries.getFolderById, { folderId }),
  });

// Folder Mutations

export const useCreateFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.createFolder),
  });

export const useDeleteFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.deleteFolder),
  });

// Add & Remove Paper from Folder

export const useAddPaperToFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.addPaperToFolder),
  });

export const useRemovePaperFromFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.removePaperFromFolder),
  });

// Add & Remove Search from Folder

export const useAddSearchToFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.addSearchToFolder),
  });

export const useRemoveSearchFromFolderMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.removeSearchFromFolder),
  });

// Folder Mutations

export const useDeleteAllFoldersMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(
      api.folders.mutations.deleteCurrentUserFolders
    ),
  });

export const useUpdateFolderPrivacyMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.updateFolderPrivacy),
  });

export const useUpdateFolderNameMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.updateFolderName),
  });

export const useUpdateFolderContentMutation = () =>
  useMutation({
    mutationFn: useConvexMutation(api.folders.mutations.updateFolderContent),
  });
