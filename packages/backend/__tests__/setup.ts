/**
 * Test Setup for Convex Backend Testing
 *
 * This file provides mock utilities and test helpers for testing Convex functions.
 */

import { vi } from "vitest";
import { Id } from "../convex/_generated/dataModel";

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

  const createQueryBuilder = (tableName: string) => {
    const builder: any = {
      collect: vi.fn().mockResolvedValue(store.get(tableName) || []),
      order: vi.fn().mockReturnValue(undefined), // Will be set to return builder
      filter: vi.fn().mockReturnValue(undefined),
      withIndex: vi.fn().mockReturnValue(undefined),
      eq: vi.fn().mockReturnValue(undefined),
      first: vi.fn().mockResolvedValue(store.get(tableName)?.[0] || null),
      unique: vi.fn().mockResolvedValue(store.get(tableName)?.[0] || null),
      take: vi.fn().mockResolvedValue(store.get(tableName)?.slice(0, 1) || []),
    };

    // Fix chaining interactions
    builder.order.mockReturnValue(builder);
    builder.filter.mockReturnValue(builder);
    builder.withIndex.mockReturnValue(builder);
    builder.eq.mockReturnValue(builder);

    return builder;
  };

  return {
    query: vi.fn((tableName: string) => createQueryBuilder(tableName)),
    insert: vi.fn((tableName: string, doc: any) => {
      const id = `${tableName}_${Date.now()}` as any;
      const newDoc = { ...doc, _id: id, _creationTime: Date.now() };
      const existing = store.get(tableName) || [];
      store.set(tableName, [...existing, newDoc]);
      return Promise.resolve(id);
    }),
    patch: vi.fn((id: Id<any>, updates: Partial<any>) => {
      // Find the table that contains this ID
      for (const [tableName, docs] of store.entries()) {
        const index = docs.findIndex((d) => d._id === id);
        if (index !== -1) {
          const updatedDoc = { ...docs[index], ...updates };
          docs[index] = updatedDoc;
          store.set(tableName, docs);
          return Promise.resolve();
        }
      }
      return Promise.resolve();
    }),
    delete: vi.fn((id: Id<any>) => {
      for (const [tableName, docs] of store.entries()) {
        const index = docs.findIndex((d) => d._id === id);
        if (index !== -1) {
          docs.splice(index, 1);
          store.set(tableName, docs);
          return Promise.resolve();
        }
      }
      return Promise.resolve();
    }),
    get: vi.fn((id: Id<any>) => {
      for (const [tableName, docs] of store.entries()) {
        const doc = docs.find((d) => d._id === id);
        if (doc) return Promise.resolve(doc);
      }
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
  // Pass userId or clerkId info to auth
  const mockAuth = createMockAuth(options.userId);
  if (options.clerkId) {
    mockAuth.getUserIdentity.mockResolvedValue({
      subject: options.clerkId,
      tokenIdentifier: "test-token",
    });
  }
  if (options.isAuthenticated === false) {
    mockAuth.getUserIdentity.mockResolvedValue(null);
  }

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

// Mock Convex server functions to expose handler directly
vi.mock("../convex/_generated/server", () => ({
  mutation: (args: any) => args,
  query: (args: any) => args,
  internalMutation: (args: any) => args,
  internalQuery: (args: any) => args,
  action: (args: any) => args,
  internalAction: (args: any) => args,
}));
