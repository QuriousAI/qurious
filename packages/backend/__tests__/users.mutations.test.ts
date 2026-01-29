/**
 * User Mutations Tests
 *
 * Tests for user-related mutation operations including:
 * - createFromClerk: Create new user from Clerk webhook
 * - updateFromClerk: Update user from Clerk webhook
 * - deleteFromClerk: Delete user from Clerk webhook
 * - deductCredits: Deduct credits from user account
 */

import { describe, test, expect, vi, beforeEach } from "vitest";
import { createMockCtx, createMockUser, mockAuthenticatedUser } from "./setup";
import { ConvexError } from "convex/values";
import { Id } from "../convex/_generated/dataModel";

// Mock analytics
vi.mock("../lib/analytics", () => ({
  captureEvent: vi.fn(),
}));

// Mock helpers
vi.mock("../users/helpers", () => ({
  getCurrentUserOrThrow: vi.fn(),
  userByClerkId: vi.fn(),
}));

describe("User Mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createFromClerk", () => {
    test("should create new user with initial credits", async () => {
      const ctx = createMockCtx();
      const clerkData = {
        id: "clerk_new123",
        first_name: "Jane",
        last_name: "Doe",
        email_addresses: [{ email_address: "jane@example.com" }],
      };

      const userId = "user_new123" as Id<"users">;
      ctx.db.insert = vi
        .fn()
        .mockResolvedValueOnce(userId) // First call for user
        .mockResolvedValueOnce("folder_123" as Id<"folders">); // Second call for folder

      const { createFromClerk } = await import("../users/mutations");
      // Cast to any to access internal handler for testing
      await (createFromClerk as any).handler(ctx, { data: clerkData });

      // Verify user was created with correct data
      expect(ctx.db.insert).toHaveBeenCalledWith("users", {
        clerkId: "clerk_new123",
        name: "Jane Doe",
        details: "",
        summarySettings: "",
        credits: 100,
      });

      // Verify Bookmarks folder was created
      expect(ctx.db.insert).toHaveBeenCalledWith("folders", {
        name: "Bookmarks",
        description: "My Bookmarks",
        type: "SYSTEM_CREATED_BOOKMARKS_FOLDER",
        userId: userId,
        content: "",
        public: false,
        paperExternalIds: [],
        searchIds: [],
      });
    });

    test("should track analytics with user email", async () => {
      const ctx = createMockCtx();
      const clerkData = {
        id: "clerk_new123",
        first_name: "Jane",
        last_name: "Doe",
        email_addresses: [{ email_address: "jane@example.com" }],
      };

      ctx.db.insert = vi
        .fn()
        .mockResolvedValueOnce("user_new123" as Id<"users">)
        .mockResolvedValueOnce("folder_123" as Id<"folders">);

      const { captureEvent } = await import("../lib/analytics");
      const { createFromClerk } = await import("../users/mutations");
      await (createFromClerk as any).handler(ctx, { data: clerkData });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "user_mutation_create_from_clerk",
        {
          clerkUserId: "clerk_new123",
          email: "jane@example.com",
        },
      );
    });
  });

  describe("updateFromClerk", () => {
    test("should update existing user data", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ clerkId: "clerk_existing" });
      const clerkData = {
        id: "clerk_existing",
        first_name: "John",
        last_name: "Updated",
      };

      const { userByClerkId } = await import("../users/helpers");
      (userByClerkId as any).mockResolvedValue(mockUser);

      const { updateFromClerk } = await import("../users/mutations");
      await (updateFromClerk as any).handler(ctx, { data: clerkData });

      expect(ctx.db.patch).toHaveBeenCalledWith(mockUser._id, {
        name: "John Updated",
      });
    });

    test("should throw error when user does not exist", async () => {
      const ctx = createMockCtx();
      const clerkData = {
        id: "clerk_nonexistent",
        first_name: "John",
        last_name: "Doe",
      };

      const { userByClerkId } = await import("../users/helpers");
      (userByClerkId as any).mockResolvedValue(null);

      const { updateFromClerk } = await import("../users/mutations");

      await expect(
        (updateFromClerk as any).handler(ctx, { data: clerkData }),
      ).rejects.toThrow("user doesn't exist");
    });

    test("should track analytics event", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ clerkId: "clerk_existing" });
      const clerkData = {
        id: "clerk_existing",
        first_name: "John",
        last_name: "Updated",
      };

      const { userByClerkId } = await import("../users/helpers");
      (userByClerkId as any).mockResolvedValue(mockUser);

      const { captureEvent } = await import("../lib/analytics");
      const { updateFromClerk } = await import("../users/mutations");

      await (updateFromClerk as any).handler(ctx, { data: clerkData });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "user_mutation_update_from_clerk",
        { clerkUserId: "clerk_existing" },
      );
    });
  });

  describe("deleteFromClerk", () => {
    test("should delete existing user", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ clerkId: "clerk_delete" });

      const { userByClerkId } = await import("../users/helpers");
      (userByClerkId as any).mockResolvedValue(mockUser);

      const { deleteFromClerk } = await import("../users/mutations");
      await (deleteFromClerk as any).handler(ctx, {
        clerkUserId: "clerk_delete",
      });

      expect(ctx.db.delete).toHaveBeenCalledWith(mockUser._id);
    });

    test("should throw error when user does not exist", async () => {
      const ctx = createMockCtx();

      const { userByClerkId } = await import("../users/helpers");
      (userByClerkId as any).mockResolvedValue(null);

      const { deleteFromClerk } = await import("../users/mutations");

      await expect(
        (deleteFromClerk as any).handler(ctx, {
          clerkUserId: "clerk_nonexistent",
        }),
      ).rejects.toThrow("user doesn't exist");
    });
  });

  describe("deductCredits", () => {
    test("should deduct credits from user account", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 100 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { deductCredits } = await import("../users/mutations");
      await (deductCredits as any).handler(ctx, { amount: 10 });

      expect(ctx.db.patch).toHaveBeenCalledWith(mockUser._id, {
        credits: 90,
      });
    });

    test("should throw error when insufficient credits", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 5 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { deductCredits } = await import("../users/mutations");

      await expect(
        (deductCredits as any).handler(ctx, { amount: 10 }),
      ).rejects.toThrow("insufficient credits");
    });

    test("should track analytics on successful deduction", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 100 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { captureEvent } = await import("../lib/analytics");
      const { deductCredits } = await import("../users/mutations");

      await (deductCredits as any).handler(ctx, { amount: 10 });

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "user_mutation_deduct_credits",
        {
          amount: 10,
          previousCredits: 100,
          newCredits: 90,
        },
      );
    });

    test("should track analytics on failed deduction", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 5 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { captureEvent } = await import("../lib/analytics");
      const { deductCredits } = await import("../users/mutations");

      await expect(
        (deductCredits as any).handler(ctx, { amount: 10 }),
      ).rejects.toThrow("insufficient credits");

      expect(captureEvent).toHaveBeenCalledWith(
        ctx,
        "user_mutation_deduct_credits_failed",
        {
          amount: 10,
          currentCredits: 5,
          reason: "insufficient_credits",
        },
      );
    });

    test("should handle exact credit amount", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 10 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { deductCredits } = await import("../users/mutations");
      await (deductCredits as any).handler(ctx, { amount: 10 });

      expect(ctx.db.patch).toHaveBeenCalledWith(mockUser._id, {
        credits: 0,
      });
    });

    test("should handle zero credit deduction", async () => {
      const ctx = createMockCtx();
      const mockUser = createMockUser({ credits: 100 });
      mockAuthenticatedUser(ctx, mockUser);

      const { getCurrentUserOrThrow } = await import("../users/helpers");
      (getCurrentUserOrThrow as any).mockResolvedValue(mockUser);

      const { deductCredits } = await import("../users/mutations");
      await (deductCredits as any).handler(ctx, { amount: 0 });

      expect(ctx.db.patch).toHaveBeenCalledWith(mockUser._id, {
        credits: 100,
      });
    });
  });
});
