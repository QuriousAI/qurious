/**
 * Search Mutations Tests
 *
 * Tests for search-related mutation operations including:
 * - createSearch: Create a new search record
 * - deleteSearch: Delete a search by ID
 * - deleteCurrentUserSearches: Delete all searches for current user
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  createMockCtx,
  createMockSearch,
  createMockUser,
  mockAuthenticatedUser,
} from "./setup";
import { Id } from "../convex/_generated/dataModel";

// Mock PostHog
vi.mock("@samhoque/convex-posthog", () => ({
  PostHog: vi.fn().mockImplementation(() => ({
    trackUserEvent: vi.fn().mockResolvedValue(undefined),
  })),
}));

// Mock helpers
vi.mock("../users/helpers", () => ({
  getCurrentUserIdOrThrow: vi.fn(),
}));

// Mock the generated api
vi.mock("../convex/_generated/api", () => ({
  components: {
    posthog: {},
  },
}));

describe("Search Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createSearch", () => {
    test("should create new search for authenticated user", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const searchId = "search_new123" as Id<"searches">;
      ctx.db.insert = vi.fn().mockResolvedValue(searchId);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { createSearch } = await import("../searches/mutations");
      await (createSearch as any).handler(ctx, { query: "machine learning" });

      expect(ctx.db.insert).toHaveBeenCalledWith("searches", {
        query: "machine learning",
        userId: mockUser._id,
      });
    });

    test("should handle empty query string", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      ctx.db.insert = vi.fn().mockResolvedValue("search_123" as Id<"searches">);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { createSearch } = await import("../searches/mutations");
      await (createSearch as any).handler(ctx, { query: "" });

      expect(ctx.db.insert).toHaveBeenCalledWith("searches", {
        query: "",
        userId: mockUser._id,
      });
    });

    test("should handle very long query strings", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const longQuery = "a".repeat(1000);
      ctx.db.insert = vi.fn().mockResolvedValue("search_123" as Id<"searches">);

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { createSearch } = await import("../searches/mutations");
      await (createSearch as any).handler(ctx, { query: longQuery });

      expect(ctx.db.insert).toHaveBeenCalledWith("searches", {
        query: longQuery,
        userId: mockUser._id,
      });
    });

    test("should throw error for unauthenticated user", async () => {
      const ctx = createMockCtx();

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockRejectedValue(
        new Error("User not authenticated"),
      );

      const { createSearch } = await import("../searches/mutations");

      await expect(
        (createSearch as any).handler(ctx, { query: "test" }),
      ).rejects.toThrow("User not authenticated");
    });
  });

  describe("deleteSearch", () => {
    test("should delete search by ID", async () => {
      const ctx = createMockCtx();
      const searchId = "search_delete123" as Id<"searches">;

      const { deleteSearch } = await import("../searches/mutations");
      await (deleteSearch as any).handler(ctx, { searchId });

      expect(ctx.db.delete).toHaveBeenCalledWith(searchId);
    });
  });

  describe("deleteCurrentUserSearches", () => {
    test("should delete all searches for authenticated user", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const userSearches = [
        createMockSearch({
          _id: "search_1" as Id<"searches">,
          userId: mockUser._id,
        }),
        createMockSearch({
          _id: "search_2" as Id<"searches">,
          userId: mockUser._id,
        }),
        createMockSearch({
          _id: "search_3" as Id<"searches">,
          userId: mockUser._id,
        }),
      ];

      const mockCollect = vi.fn().mockResolvedValue(userSearches);
      const mockFilter = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ filter: mockFilter });

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { deleteCurrentUserSearches } =
        await import("../searches/mutations");
      await (deleteCurrentUserSearches as any).handler(ctx, {});

      // Verify all searches were deleted
      expect(ctx.db.delete).toHaveBeenCalledTimes(3);
      expect(ctx.db.delete).toHaveBeenCalledWith("search_1");
      expect(ctx.db.delete).toHaveBeenCalledWith("search_2");
      expect(ctx.db.delete).toHaveBeenCalledWith("search_3");
    });

    test("should handle user with no searches", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const mockCollect = vi.fn().mockResolvedValue([]);
      const mockFilter = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ filter: mockFilter });

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { deleteCurrentUserSearches } =
        await import("../searches/mutations");
      await (deleteCurrentUserSearches as any).handler(ctx, {});

      expect(ctx.db.delete).not.toHaveBeenCalled();
    });

    test("should throw error for unauthenticated user", async () => {
      const ctx = createMockCtx();

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockRejectedValue(
        new Error("User not authenticated"),
      );

      const { deleteCurrentUserSearches } =
        await import("../searches/mutations");

      await expect(
        (deleteCurrentUserSearches as any).handler(ctx, {}),
      ).rejects.toThrow("User not authenticated");
    });
  });
});
