/**
 * Test Setup for Convex Backend Testing
 *
 * This file provides mock utilities and test helpers for testing Convex functions.
 */

import { vi } from "vitest";
import { Id } from "../_generated/dataModel";

// Mock Convex context utilities
export const createMockAuth = (userId?: Id<"users">, sessionId?: string) => ({
  getUserIdentity: vi.fn().mockResolvedValue(
    userId
      ? {
          subject: `clerk-user-${userId}`,
          tokenIdentifier: `clerk-token-${sessionId || "session-123"}`,
        }
      : null,
  ),
});

export const createMockDb = () => {
  const store = new Map<string, any[]>();

  return {
    query: vi.fn((tableName: string) => ({
      collect: vi.fn().mockResolvedValue(store.get(tableName) || []),
      order: vi.fn().mockReturnThis(),
      filter: vi.fn().mockReturnThis(),
      withIndex: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      first: vi.fn().mockResolvedValue(store.get(tableName)?.[0] || null),
    })),
    insert: vi.fn((tableName: string, doc: any) => {
      const id = `${tableName}_${Date.now()}` as any;
      const newDoc = { ...doc, _id: id, _creationTime: Date.now() };
      const existing = store.get(tableName) || [];
      store.set(tableName, [...existing, newDoc]);
      return Promise.resolve(id);
    }),
    patch: vi.fn((id: Id<any>, updates: Partial<any>) => {
      return Promise.resolve();
    }),
    delete: vi.fn((id: Id<any>) => {
      return Promise.resolve();
    }),
    get: vi.fn((id: Id<any>) => {
      return Promise.resolve(null);
    }),
    _store: store, // Access internal store for assertions
    _reset: () => store.clear(),
  };
};

export const createMockCtx = (
  options: {
    userId?: Id<"users">;
    clerkId?: string;
    isAuthenticated?: boolean;
  } = {},
) => {
  const mockDb = createMockDb();
  const mockAuth = createMockAuth(options.userId);

  return {
    db: mockDb,
    auth: mockAuth,
    scheduler: {
      runAfter: vi.fn(),
      runAt: vi.fn(),
    },
  };
};

// Mock user data factory
export const createMockUser = (overrides: Partial<any> = {}) => ({
  _id: "user_test123" as Id<"users">,
  _creationTime: Date.now(),
  name: "Test User",
  clerkId: "clerk_test123",
  credits: 100,
  details: "",
  summarySettings: "",
  ...overrides,
});

// Mock search data factory
export const createMockSearch = (overrides: Partial<any> = {}) => ({
  _id: "search_test123" as Id<"searches">,
  _creationTime: Date.now(),
  query: "machine learning",
  userId: "user_test123" as Id<"users">,
  ...overrides,
});

// Mock folder data factory
export const createMockFolder = (overrides: Partial<any> = {}) => ({
  _id: "folder_test123" as Id<"folders">,
  _creationTime: Date.now(),
  name: "Test Folder",
  description: "Test Description",
  content: "",
  paperExternalIds: [],
  searchIds: [],
  public: false,
  type: "USER_CREATED_CUSTOM_FOLDER" as const,
  userId: "user_test123" as Id<"users">,
  ...overrides,
});

// Mock analytics capture
export const mockCaptureEvent = vi.fn();

// Utility to mock authentication for tests
export const mockAuthenticatedUser = (ctx: any, user: any) => {
  ctx.auth.getUserIdentity.mockResolvedValue({
    subject: user.clerkId,
    tokenIdentifier: "test-token",
  });
  ctx.db.query("users").withIndex("byClerkId", vi.fn()).first = vi
    .fn()
    .mockResolvedValue(user);
};

// Utility to mock unauthenticated state
export const mockUnauthenticatedUser = (ctx: any) => {
  ctx.auth.getUserIdentity.mockResolvedValue(null);
};
