/**
 * Folder Queries Tests
 *
 * Tests for folder-related query operations including:
 * - getCurrentUserFolders: Get all folders for authenticated user
 * - getFolderById: Get folder by ID with privacy checks
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import { createMockCtx, createMockFolder, createMockUser } from "./setup";
import { Id } from "../convex/_generated/dataModel";

// Mock analytics
const { mockCaptureEvent } = vi.hoisted(() => ({
  mockCaptureEvent: vi.fn(),
}));
vi.mock("../lib/analytics", () => ({
  captureEvent: mockCaptureEvent,
}));

// Mock helpers
const { mockGetCurrentUserIdOrThrow } = vi.hoisted(() => ({
  mockGetCurrentUserIdOrThrow: vi.fn(),
}));
vi.mock("../users/helpers", () => ({
  getCurrentUserIdOrThrow: mockGetCurrentUserIdOrThrow,
}));

// Mock convex-helpers
const { mockGetOrThrow } = vi.hoisted(() => ({
  mockGetOrThrow: vi.fn(),
}));
vi.mock("convex-helpers/server/relationships", () => ({
  getOrThrow: mockGetOrThrow,
}));

// Import after mocks are set up
import {
  getCurrentUserFolders,
  getFolderById,
} from "../convex/folders/queries";

describe("Folder Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCurrentUserFolders", () => {
    test("should return all folders for authenticated user", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });

      const userFolders = [
        createMockFolder({ name: "Research Papers", userId: mockUser._id }),
        createMockFolder({ name: "Bookmarks", userId: mockUser._id }),
      ];

      const otherUserFolder = createMockFolder({
        name: "Other Folder",
        userId: "user_other" as Id<"users">,
      });

      const allFolders = [...userFolders, otherUserFolder];

      const mockCollect = vi.fn().mockResolvedValue(allFolders);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      const result = await (getCurrentUserFolders as any).handler(ctx, {});

      expect(result).toEqual(userFolders);
      expect(result).toHaveLength(2);
      expect(result.every((f) => f.userId === mockUser._id)).toBe(true);
    });

    test("should return empty array when user has no folders", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });

      const mockCollect = vi.fn().mockResolvedValue([]);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      const result = await (getCurrentUserFolders as any).handler(ctx, {});

      expect(result).toEqual([]);
    });

    test("should track analytics with folder count", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });

      const userFolders = [
        createMockFolder({ userId: mockUser._id }),
        createMockFolder({ userId: mockUser._id }),
        createMockFolder({ userId: mockUser._id }),
      ];

      const mockCollect = vi.fn().mockResolvedValue(userFolders);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      await (getCurrentUserFolders as any).handler(ctx, {});

      expect(mockCaptureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_query_get_current_user_folders",
        { totalFolders: 3 },
      );
    });
  });

  describe("getFolderById", () => {
    test("should return public folder without authentication check", async () => {
      const ctx = createMockCtx();
      const publicFolder = createMockFolder({
        name: "Public Research",
        public: true,
      });

      mockGetOrThrow.mockResolvedValue(publicFolder);

      const result = await (getFolderById as any).handler(ctx, {
        folderId: publicFolder._id,
      });

      expect(result).toEqual(publicFolder);
    });

    test("should return private folder for owner", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });

      const privateFolder = createMockFolder({
        name: "Private Research",
        public: false,
        userId: mockUser._id,
      });

      mockGetOrThrow.mockResolvedValue(privateFolder);
      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      const result = await (getFolderById as any).handler(ctx, {
        folderId: privateFolder._id,
      });

      expect(result).toEqual(privateFolder);
    });

    test("should throw error for private folder accessed by non-owner", async () => {
      const mockUser = createMockUser({ _id: "user_123" as Id<"users"> });
      const ctx = createMockCtx({ userId: mockUser._id });

      const privateFolder = createMockFolder({
        name: "Private Research",
        public: false,
        userId: "user_other" as Id<"users">,
      });

      mockGetOrThrow.mockResolvedValue(privateFolder);
      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      await expect(
        (getFolderById as any).handler(ctx, { folderId: privateFolder._id }),
      ).rejects.toThrow("You can't access this folder.");
    });

    test("should track analytics for public folder access", async () => {
      const ctx = createMockCtx();
      const publicFolder = createMockFolder({ public: true });

      mockGetOrThrow.mockResolvedValue(publicFolder);

      await (getFolderById as any).handler(ctx, { folderId: publicFolder._id });

      expect(mockCaptureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_query_get_folder_by_id",
        {
          folderId: publicFolder._id,
          isPublic: true,
        },
      );
    });

    test("should track analytics for private folder owner access", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });

      const privateFolder = createMockFolder({
        public: false,
        userId: mockUser._id,
      });

      mockGetOrThrow.mockResolvedValue(privateFolder);
      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      await (getFolderById as any).handler(ctx, {
        folderId: privateFolder._id,
      });

      expect(mockCaptureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_query_get_folder_by_id",
        {
          folderId: privateFolder._id,
          isPublic: false,
          isOwner: true,
        },
      );
    });

    test("should track analytics for denied access", async () => {
      const mockUser = createMockUser({ _id: "user_123" as Id<"users"> });
      const ctx = createMockCtx({ userId: mockUser._id });

      const privateFolder = createMockFolder({
        public: false,
        userId: "user_other" as Id<"users">,
      });

      mockGetOrThrow.mockResolvedValue(privateFolder);
      mockGetCurrentUserIdOrThrow.mockResolvedValue(mockUser._id);

      await expect(
        (getFolderById as any).handler(ctx, { folderId: privateFolder._id }),
      ).rejects.toThrow();

      expect(mockCaptureEvent).toHaveBeenCalledWith(
        ctx,
        "folder_query_get_folder_by_id_denied",
        {
          folderId: privateFolder._id,
          isPublic: false,
          isOwner: false,
          reason: "access_denied",
        },
      );
    });
  });
});
