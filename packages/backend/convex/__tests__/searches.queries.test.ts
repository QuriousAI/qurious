/**
 * Search Queries Tests
 *
 * Tests for search-related query operations including:
 * - getCurrentUserSearches: Get all searches for authenticated user
 * - getMultiple: Get multiple searches by IDs
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  createMockCtx,
  createMockSearch,
  createMockUser,
  mockAuthenticatedUser,
} from "./setup";
import { Id } from "../_generated/dataModel";

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
  getAllOrThrow: vi.fn(),
}));

describe("Search Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCurrentUserSearches", () => {
    test("should return all searches for authenticated user", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const userSearches = [
        createMockSearch({ query: "neural networks", userId: mockUser._id }),
        createMockSearch({ query: "deep learning", userId: mockUser._id }),
      ];

      const otherUserSearch = createMockSearch({
        query: "quantum computing",
        userId: "user_other" as Id<"users">,
      });

      const allSearches = [...userSearches, otherUserSearch];

      const mockCollect = vi.fn().mockResolvedValue(allSearches);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { getCurrentUserSearches } = await import("../searches/queries");
      const result = await getCurrentUserSearches.handler(ctx, {});

      expect(result).toEqual(userSearches);
      expect(result).toHaveLength(2);
      expect(result.every((s) => s.userId === mockUser._id)).toBe(true);
    });

    test("should return empty array when user has no searches", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const mockCollect = vi.fn().mockResolvedValue([]);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { getCurrentUserSearches } = await import("../searches/queries");
      const result = await getCurrentUserSearches.handler(ctx, {});

      expect(result).toEqual([]);
    });

    test("should track analytics with search count", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const userSearches = [
        createMockSearch({ userId: mockUser._id }),
        createMockSearch({ userId: mockUser._id }),
        createMockSearch({ userId: mockUser._id }),
      ];

      const mockCollect = vi.fn().mockResolvedValue(userSearches);
      const mockOrder = vi.fn().mockReturnValue({ collect: mockCollect });
      ctx.db.query = vi.fn().mockReturnValue({ order: mockOrder });

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockResolvedValue(mockUser._id);

      const { captureEvent } = await import("../lib/analytics");
      const { getCurrentUserSearches } = await import("../searches/queries");

      await getCurrentUserSearches.handler(ctx, {});

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "search_query_get_current_user_searches",
        { totalSearches: 3 },
      );
    });

    test("should throw error for unauthenticated user", async () => {
      const ctx = createMockCtx();

      const { getCurrentUserIdOrThrow } = await import("../users/helpers");
      (getCurrentUserIdOrThrow as any).mockRejectedValue(
        new Error("User not authenticated"),
      );

      const { getCurrentUserSearches } = await import("../searches/queries");

      await expect(getCurrentUserSearches.handler(ctx, {})).rejects.toThrow(
        "User not authenticated",
      );
    });
  });

  describe("getMultiple", () => {
    test("should return multiple searches by IDs", async () => {
      const ctx = createMockCtx();
      const searchIds = [
        "search_1" as Id<"searches">,
        "search_2" as Id<"searches">,
        "search_3" as Id<"searches">,
      ];

      const searches = [
        createMockSearch({ _id: searchIds[0], query: "AI" }),
        createMockSearch({ _id: searchIds[1], query: "ML" }),
        createMockSearch({ _id: searchIds[2], query: "DL" }),
      ];

      const { getAllOrThrow } =
        await import("convex-helpers/server/relationships");
      (getAllOrThrow as any).mockResolvedValue(searches);

      const { getMultiple } = await import("../searches/queries");
      const result = await getMultiple.handler(ctx, { searchIds });

      expect(result).toEqual(searches);
      expect(getAllOrThrow).toHaveBeenCalledWith(ctx.db, searchIds);
    });

    test("should handle empty search IDs array", async () => {
      const ctx = createMockCtx();

      const { getAllOrThrow } =
        await import("convex-helpers/server/relationships");
      (getAllOrThrow as any).mockResolvedValue([]);

      const { getMultiple } = await import("../searches/queries");
      const result = await getMultiple.handler(ctx, { searchIds: [] });

      expect(result).toEqual([]);
    });

    test("should track analytics with search count", async () => {
      const ctx = createMockCtx();
      const searchIds = [
        "search_1" as Id<"searches">,
        "search_2" as Id<"searches">,
      ];

      const searches = [
        createMockSearch({ _id: searchIds[0] }),
        createMockSearch({ _id: searchIds[1] }),
      ];

      const { getAllOrThrow } =
        await import("convex-helpers/server/relationships");
      (getAllOrThrow as any).mockResolvedValue(searches);

      const { captureEvent } = await import("../lib/analytics");
      const { getMultiple } = await import("../searches/queries");

      await getMultiple.handler(ctx, { searchIds });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "search_query_get_multiple",
        { searchCount: 2 },
      );
    });

    test("should throw error when search not found", async () => {
      const ctx = createMockCtx();
      const searchIds = ["search_nonexistent" as Id<"searches">];

      const { getAllOrThrow } =
        await import("convex-helpers/server/relationships");
      (getAllOrThrow as any).mockRejectedValue(new Error("Search not found"));

      const { getMultiple } = await import("../searches/queries");

      await expect(getMultiple.handler(ctx, { searchIds })).rejects.toThrow(
        "Search not found",
      );
    });
  });
});
