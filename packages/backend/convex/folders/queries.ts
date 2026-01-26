import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
import { getCurrentUserIdOrThrow } from "../users/helpers";
import { getOrThrow } from "convex-helpers/server/relationships";
import { captureEvent } from "../lib/analytics";

export const getCurrentUserFolders = query({
  handler: async (ctx) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const allFolders = await ctx.db.query("folders").order("desc").collect();
    const userFolders = allFolders.filter((f) => f.userId === userId);
    await captureEvent(ctx, "folder_query_get_current_user_folders", {
      totalFolders: userFolders.length,
    });
    return userFolders;
  },
});

export const getFolderById = query({
  args: {
    folderId: v.id("folders"),
  },
  handler: async (ctx, args) => {
    const folder = await getOrThrow(ctx, args.folderId);

    // folder is public, no need to check for privacy settings
    if (folder.public) {
      await captureEvent(ctx, "folder_query_get_folder_by_id", {
        folderId: args.folderId,
        isPublic: true,
      });
      return folder;
    }

    // but if the folder is PRIVATE, check if the user trying to access is the owner
    const currentUserId = await getCurrentUserIdOrThrow(ctx);

    // hes's the owner. should send the folder.
    if (folder.userId === currentUserId) {
      await captureEvent(ctx, "folder_query_get_folder_by_id", {
        folderId: args.folderId,
        isPublic: false,
        isOwner: true,
      });
      return folder;
    }

    // if hes not the owner, throw error
    await captureEvent(ctx, "folder_query_get_folder_by_id_denied", {
      folderId: args.folderId,
      isPublic: false,
      isOwner: false,
      reason: "access_denied",
    });
    throw new ConvexError("You can't access this folder.");
  },
});
