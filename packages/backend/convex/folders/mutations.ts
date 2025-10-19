import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { getOrThrow } from "convex-helpers/server/relationships";
import { getCurrentUserIdOrThrow } from "../users/helpers";

export const addPaperToFolder = mutation({
  args: {
    folderId: v.id("folders"),
    paperId: v.string(),
  },
  handler: async (ctx, args) => {
    const folder = await getOrThrow(ctx, args.folderId);
    await ctx.db.patch(args.folderId, {
      paperExternalIds: [...folder.paperExternalIds, args.paperId],
    });
  },
});

export const removePaperFromFolder = mutation({
  args: {
    folderId: v.id("folders"),
    paperId: v.string(),
  },
  handler: async (ctx, args) => {
    const folder = await getOrThrow(ctx, args.folderId);
    await ctx.db.patch(args.folderId, {
      paperExternalIds: folder.paperExternalIds.filter(
        (id) => id !== args.paperId
      ),
    });
  },
});

export const addSearchToFolder = mutation({
  args: {
    folderId: v.id("folders"),
    searchId: v.id("searches"),
  },
  handler: async (ctx, args) => {
    const folder = await getOrThrow(ctx, args.folderId);
    await ctx.db.patch(args.folderId, {
      searchIds: [...folder.searchIds, args.searchId],
    });
  },
});

// wait, can anyone with the convex url endpoint run this?
export const removeSearchFromFolder = mutation({
  args: {
    folderId: v.id("folders"),
    searchId: v.id("searches"),
  },
  handler: async (ctx, args) => {
    const folder = await getOrThrow(ctx, args.folderId);
    await ctx.db.patch(args.folderId, {
      searchIds: folder.searchIds.filter((id) => id !== args.searchId),
    });
  },
});

export const deleteFolder = mutation({
  args: {
    folderId: v.id("folders"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.folderId);
  },
});

export const createFolder = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    await ctx.db.insert("folders", {
      name: args.name,
      description: args.description,
      type: "USER_CREATED_CUSTOM_FOLDER",
      userId: userId,
      content: "",
      public: false,
      paperExternalIds: [],
      searchIds: [],
    });
  },
});

export const deleteCurrentUserFolders = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserIdOrThrow(ctx);

    const folders = await ctx.db
      .query("folders")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    for (const folder of folders) {
      await ctx.db.delete(folder._id);
    }
  },
});

export const updateFolderPrivacy = mutation({
  args: {
    folderId: v.id("folders"),
    isPrivate: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);

    const folder = await ctx.db.get(args.folderId);
    if (!folder) {
      throw new ConvexError("Folder not found");
    }

    // Only the folder owner can change privacy settings
    if (folder.userId !== userId) {
      throw new ConvexError(
        "You can only change privacy settings for your own folders"
      );
    }

    await ctx.db.patch(args.folderId, {
      public: !args.isPrivate, // public is the opposite of isPrivate
    });
  },
});

export const updateFolderName = mutation({
  args: {
    folderId: v.id("folders"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);

    const folder = await ctx.db.get(args.folderId);
    if (!folder) {
      throw new ConvexError("Folder not found");
    }

    // Only the folder owner can rename the folder
    if (folder.userId !== userId) {
      throw new ConvexError("You can only rename your own folders");
    }

    await ctx.db.patch(args.folderId, {
      name: args.name,
    });
  },
});

export const updateFolderContent = mutation({
  args: {
    folderId: v.id("folders"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserIdOrThrow(ctx);

    const folder = await ctx.db.get(args.folderId);
    if (!folder) {
      throw new ConvexError("Folder not found");
    }

    // Only the folder owner can update the folder content
    if (folder.userId !== userId) {
      throw new ConvexError("You can only update your own folders");
    }

    await ctx.db.patch(args.folderId, {
      content: args.content,
    });
  },
});
