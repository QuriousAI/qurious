/**
 * User Queries Tests
 *
 * Tests for user-related query operations including:
 * - getCurrentUser: Fetching authenticated user data
 * - getByAuthId: Internal query for auth lookups
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  createMockCtx,
  createMockUser,
  mockAuthenticatedUser,
  mockUnauthenticatedUser,
} from "./setup";

// Mock analytics
vi.mock("../lib/analytics", () => ({
  captureEvent: vi.fn(),
}));

// Mock helpers
vi.mock("../users/helpers", () => ({
  getCurrentUserOrThrow: vi.fn(),
}));

describe("User Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCurrentUser", () => {
    test("should return authenticated user data", async () => {
      const mockUser = createMockUser({
        name: "John Doe",
        credits: 150,
      });
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { getCurrentUser } = await import("../users/queries");
      const result = await (getCurrentUser as any).handler(ctx, {});

      expect(result).toEqual(mockUser);
      expect(getCurrentUserOrThrow).toHaveBeenCalledWith(ctx);
    });

    test("should throw error when user is not authenticated", async () => {
      const ctx = createMockCtx();
      mockUnauthenticatedUser(ctx);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockRejectedValue(
        new Error("User not authenticated"),
      );

      const { getCurrentUser } = await import("../users/queries");

      await expect((getCurrentUser as any).handler(ctx, {})).rejects.toThrow(
        "User not authenticated",
      );
    });

    test("should track analytics event", async () => {
      const mockUser = createMockUser();
      const ctx = createMockCtx({ userId: mockUser._id });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { captureEvent } = await import("../lib/analytics");
      const { getCurrentUser } = await import("../users/queries");

      await (getCurrentUser as any).handler(ctx, {});

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "user_query_get_current_user",
        {},
      );
    });
  });

  describe("getByAuthId", () => {
    test("should return user by Clerk ID", async () => {
      const mockUser = createMockUser({ clerkId: "clerk_abc123" });
      const ctx = createMockCtx();

      const mockFirst = vi.fn().mockResolvedValue(mockUser);
      const mockWithIndex = vi.fn().mockReturnValue({ first: mockFirst });

      ctx.db.query = vi.fn().mockReturnValue({
        withIndex: mockWithIndex,
      });

      const { getByAuthId } = await import("../users/queries");
      const result = await (getByAuthId as any).handler(ctx, {
        authId: "clerk_abc123",
      });

      expect(result).toEqual(mockUser);
      expect(ctx.db.query).toHaveBeenCalledWith("users");
      expect(mockWithIndex).toHaveBeenCalledWith(
        "byClerkId",
        expect.any(Function),
      );
    });

    test("should return null when user not found", async () => {
      const ctx = createMockCtx();

      const mockFirst = vi.fn().mockResolvedValue(null);
      const mockEq = vi.fn().mockReturnValue({ first: mockFirst });
      const mockWithIndex = vi.fn().mockReturnValue({ eq: mockEq });

      ctx.db.query = vi.fn().mockReturnValue({
        withIndex: mockWithIndex,
      });

      const { getByAuthId } = await import("../users/queries");
      const result = await getByAuthId.handler(ctx, {
        authId: "nonexistent_clerk_id",
      });

      expect(result).toBeNull();
    });

    test("should handle empty Clerk ID", async () => {
      const ctx = createMockCtx();

      const mockFirst = vi.fn().mockResolvedValue(null);
      const mockEq = vi.fn().mockReturnValue({ first: mockFirst });
      const mockWithIndex = vi.fn().mockReturnValue({ eq: mockEq });

      ctx.db.query = vi.fn().mockReturnValue({
        withIndex: mockWithIndex,
      });

      const { getByAuthId } = await import("../users/queries");
      const result = await (getByAuthId as any).handler(ctx, { authId: "" });

      expect(result).toBeNull();
    });
  });
});
