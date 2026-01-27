/**
 * Folder Mutations Tests
 *
 * Tests for folder-related mutation operations including:
 * - createFolder: Create a new folder
 * - deleteFolder: Delete a folder by ID
 * - addPaperToFolder: Add paper to folder
 * - removePaperFromFolder: Remove paper from folder
 * - addSearchToFolder: Add search to folder
 * - removeSearchFromFolder: Remove search from folder
 * - updateFolderPrivacy: Update folder privacy settings
 * - updateFolderName: Update folder name
 * - updateFolderContent: Update folder content
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  createMockCtx,
  createMockFolder,
  createMockUser,
  mockAuthenticatedUser,
} from "./setup";
import { Id } from "../_generated/dataModel";
import { ConvexError } from "convex/values";

// Mock analytics
vi.mock("../lib/analytics", () => ({
  captureEvent: vi.fn(),
}));

// Mock helpers
vi.mock("../users/helpers", () => ({
  getCurrentUserIdOrThrow: vi.fn(),
}));

// Mock convex-helpers
vi.mock("convex-helpers/server/relationships", () => ({
  getOrThrow: vi.fn(),
}));

describe("Folder Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createFolder", () => {
    test("should create new folder for authenticated user", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folderId = "folder_new123" as Id<"folders">;
      ctx.db.insert = vi.fn().mockResolvedValue(folderId);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { createFolder } = await import("../folders/mutations");
      await (createFolder as any).handler(ctx, {
        name: "Research Papers",
        description: "My research collection",
      });

      expect(ctx.db.insert).toHaveBeenCalledWith("folders", {
        name: "Research Papers",
        description: "My research collection",
        type: "USER_CREATED_CUSTOM_FOLDER",
        userId: mockUser._id,
        content: "",
        public: false,
        paperExternalIds: [],
        searchIds: [],
      });
    });

    test("should track analytics event", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folderId = "folder_new123" as Id<"folders">;
      ctx.db.insert = vi.fn().mockResolvedValue(folderId);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { captureEvent } = await import("../lib/analytics");
      const { createFolder } = await import("../folders/mutations");

      await (createFolder as any).handler(ctx, {
        name: "Test Folder",
        description: "Test Description",
      });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_mutation_create_folder",
        {
          folderId,
          name: "Test Folder",
          type: "USER_CREATED_CUSTOM_FOLDER",
        },
      );
    });
  });

  describe("addPaperToFolder", () => {
    test("should add paper to folder", async () => {
      const ctx = createMockCtx();
      const folder = createMockFolder({
        paperExternalIds: ["paper1", "paper2"],
      });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { addPaperToFolder } = await import("../folders/mutations");
      await (addPaperToFolder as any).handler(ctx, {
        folderId: folder._id,
        paperId: "paper3",
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        paperExternalIds: ["paper1", "paper2", "paper3"],
      });
    });

    test("should track analytics with paper count", async () => {
      const ctx = createMockCtx();
      const folder = createMockFolder({ paperExternalIds: ["paper1"] });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { captureEvent } = await import("../lib/analytics");
      const { addPaperToFolder } = await import("../folders/mutations");

      await (addPaperToFolder as any).handler(ctx, {
        folderId: folder._id,
        paperId: "paper2",
      });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_mutation_add_paper_to_folder",
        {
          folderId: folder._id,
          paperId: "paper2",
          previousPaperCount: 1,
        },
      );
    });
  });

  describe("removePaperFromFolder", () => {
    test("should remove paper from folder", async () => {
      const ctx = createMockCtx();
      const folder = createMockFolder({
        paperExternalIds: ["paper1", "paper2", "paper3"],
      });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { removePaperFromFolder } = await import("../folders/mutations");
      await (removePaperFromFolder as any).handler(ctx, {
        folderId: folder._id,
        paperId: "paper2",
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        paperExternalIds: ["paper1", "paper3"],
      });
    });

    test("should handle removing non-existent paper", async () => {
      const ctx = createMockCtx();
      const folder = createMockFolder({
        paperExternalIds: ["paper1", "paper2"],
      });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { removePaperFromFolder } = await import("../folders/mutations");
      await (removePaperFromFolder as any).handler(ctx, {
        folderId: folder._id,
        paperId: "paper_nonexistent",
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        paperExternalIds: ["paper1", "paper2"],
      });
    });
  });

  describe("addSearchToFolder", () => {
    test("should add search to folder", async () => {
      const ctx = createMockCtx();
      const searchIds = [
        "search_1" as Id<"searches">,
        "search_2" as Id<"searches">,
      ];
      const folder = createMockFolder({ searchIds });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { addSearchToFolder } = await import("../folders/mutations");
      const newSearchId = "search_3" as Id<"searches">;
      await (addSearchToFolder as any).handler(ctx, {
        folderId: folder._id,
        searchId: newSearchId,
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        searchIds: [...searchIds, newSearchId],
      });
    });
  });

  describe("removeSearchFromFolder", () => {
    test("should remove search from folder", async () => {
      const ctx = createMockCtx();
      const searchIds = [
        "search_1" as Id<"searches">,
        "search_2" as Id<"searches">,
        "search_3" as Id<"searches">,
      ];
      const folder = createMockFolder({ searchIds });

      const { getOrThrow } =
        await import("convex-helpers/server/relationships");
      (getOrThrow as any).mockResolvedValue(folder);

      const { removeSearchFromFolder } = await import("../folders/mutations");
      await (removeSearchFromFolder as any).handler(ctx, {
        folderId: folder._id,
        searchId: "search_2" as Id<"searches">,
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        searchIds: ["search_1", "search_3"],
      });
    });
  });

  describe("deleteFolder", () => {
    test("should delete folder by ID", async () => {
      const ctx = createMockCtx();
      const folderId = "folder_delete123" as Id<"folders">;

      const { deleteFolder } = await import("../folders/mutations");
      await (deleteFolder as any).handler(ctx, { folderId });

      expect(ctx.db.delete).toHaveBeenCalledWith(folderId);
    });

    test("should track analytics event", async () => {
      const ctx = createMockCtx();
      const folderId = "folder_delete123" as Id<"folders">;

      const { captureEvent } = await import("../lib/analytics");
      const { deleteFolder } = await import("../folders/mutations");

      await (deleteFolder as any).handler(ctx, { folderId });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_mutation_delete_folder",
        { folderId },
      );
    });
  });

  describe("updateFolderPrivacy", () => {
    test("should update folder privacy for owner", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        userId: mockUser._id,
        public: false,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderPrivacy } = await import("../folders/mutations");
      await (updateFolderPrivacy as any).handler(ctx, {
        folderId: folder._id,
        isPrivate: false, // Make public
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        public: true,
      });
    });

    test("should throw error when folder not found", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      ctx.db.get = vi.fn().mockResolvedValue(null);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderPrivacy } = await import("../folders/mutations");

      await expect(
        (updateFolderPrivacy as any).handler(ctx, {
          folderId: "folder_123" as Id<"folders">,
          isPrivate: false,
        }),
      ).rejects.toThrow("Folder not found");
    });

    test("should throw error when non-owner tries to update", async () => {
      const mockUser = createMockUser({ _id: "user_123" as Id<"users"> });
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        userId: "user_other" as Id<"users">,
        public: false,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderPrivacy } = await import("../folders/mutations");

      await expect(
        (updateFolderPrivacy as any).handler(ctx, {
          folderId: folder._id,
          isPrivate: false,
        }),
      ).rejects.toThrow(
        "You can only change privacy settings for your own folders",
      );
    });
  });

  describe("updateFolderName", () => {
    test("should update folder name for owner", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        name: "Old Name",
        userId: mockUser._id,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderName } = await import("../folders/mutations");
      await (updateFolderName as any).handler(ctx, {
        folderId: folder._id,
        name: "New Name",
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        name: "New Name",
      });
    });

    test("should throw error when non-owner tries to rename", async () => {
      const mockUser = createMockUser({ _id: "user_123" as Id<"users"> });
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        userId: "user_other" as Id<"users">,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderName } = await import("../folders/mutations");

      await expect(
        (updateFolderName as any).handler(ctx, {
          folderId: folder._id,
          name: "New Name",
        }),
      ).rejects.toThrow("You can only rename your own folders");
    });
  });

  describe("updateFolderContent", () => {
    test("should update folder content for owner", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        content: "Old content",
        userId: mockUser._id,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderContent } = await import("../folders/mutations");
      await (updateFolderContent as any).handler(ctx, {
        folderId: folder._id,
        content: "New content with more details",
      });

      expect(ctx.db.patch).toHaveBeenCalledWith(folder._id, {
        content: "New content with more details",
      });
    });

    test("should throw error when non-owner tries to update content", async () => {
      const mockUser = createMockUser({ _id: "user_123" as Id<"users"> });
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const folder = createMockFolder({
        userId: "user_other" as Id<"users">,
      });

      ctx.db.get = vi.fn().mockResolvedValue(folder);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { updateFolderContent } = await import("../folders/mutations");

      await expect(
        (updateFolderContent as any).handler(ctx, {
          folderId: folder._id,
          content: "New content",
        }),
      ).rejects.toThrow("You can only update your own folders");
    });
  });
});
