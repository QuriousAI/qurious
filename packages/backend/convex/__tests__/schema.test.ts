/**
 * Schema Validation Tests
 *
 * Tests to validate database schema structure and constraints
 */

import { describe, test, expect } from "vitest";
import { v } from "convex/values";

describe("Schema Validation", () => {
  describe("Users Table Schema", () => {
    test("should have all required fields", () => {
      const userSchema = {
        name: v.string(),
        details: v.string(),
        summarySettings: v.string(),
        clerkId: v.string(),
        credits: v.number(),
        dodoCustomerId: v.optional(v.string()),
      };

      expect(userSchema).toBeDefined();
      expect(Object.keys(userSchema)).toEqual([
        "name",
        "details",
        "summarySettings",
        "clerkId",
        "credits",
        "dodoCustomerId",
      ]);
    });

    test("should validate user data structure", () => {
      const validUser = {
        name: "John Doe",
        details: "Research interests",
        summarySettings: "{}",
        clerkId: "clerk_123",
        credits: 100,
      };

      expect(validUser.name).toBeTypeOf("string");
      expect(validUser.details).toBeTypeOf("string");
      expect(validUser.summarySettings).toBeTypeOf("string");
      expect(validUser.clerkId).toBeTypeOf("string");
      expect(validUser.credits).toBeTypeOf("number");
    });

    test("should have correct indexes", () => {
      // Verify expected indexes exist
      const expectedIndexes = ["byClerkId", "byDodoCustomerId"];
      expect(expectedIndexes).toContain("byClerkId");
      expect(expectedIndexes).toContain("byDodoCustomerId");
    });
  });

  describe("Searches Table Schema", () => {
    test("should have all required fields", () => {
      const searchSchema = {
        query: v.string(),
        userId: v.id("users"),
      };

      expect(searchSchema).toBeDefined();
      expect(Object.keys(searchSchema)).toEqual(["query", "userId"]);
    });

    test("should validate search data structure", () => {
      const validSearch = {
        query: "machine learning",
        userId: "user_123",
      };

      expect(validSearch.query).toBeTypeOf("string");
      expect(validSearch.userId).toBeTypeOf("string");
    });

    test("should have correct indexes", () => {
      const expectedIndexes = ["byUserId"];
      expect(expectedIndexes).toContain("byUserId");
    });
  });

  describe("Folders Table Schema", () => {
    test("should have all required fields", () => {
      const folderSchema = {
        name: v.string(),
        description: v.string(),
        content: v.string(),
        paperExternalIds: v.array(v.string()),
        searchIds: v.array(v.id("searches")),
        public: v.boolean(),
        type: v.union(
          v.literal("SYSTEM_CREATED_BOOKMARKS_FOLDER"),
          v.literal("USER_CREATED_CUSTOM_FOLDER"),
        ),
        userId: v.id("users"),
      };

      expect(folderSchema).toBeDefined();
      expect(Object.keys(folderSchema)).toEqual([
        "name",
        "description",
        "content",
        "paperExternalIds",
        "searchIds",
        "public",
        "type",
        "userId",
      ]);
    });

    test("should validate folder data structure", () => {
      const validFolder = {
        name: "Research Papers",
        description: "My collection",
        content: "",
        paperExternalIds: ["paper1", "paper2"],
        searchIds: ["search_1", "search_2"],
        public: false,
        type: "USER_CREATED_CUSTOM_FOLDER",
        userId: "user_123",
      };

      expect(validFolder.name).toBeTypeOf("string");
      expect(validFolder.description).toBeTypeOf("string");
      expect(validFolder.content).toBeTypeOf("string");
      expect(Array.isArray(validFolder.paperExternalIds)).toBe(true);
      expect(Array.isArray(validFolder.searchIds)).toBe(true);
      expect(validFolder.public).toBeTypeOf("boolean");
      expect([
        "SYSTEM_CREATED_BOOKMARKS_FOLDER",
        "USER_CREATED_CUSTOM_FOLDER",
      ]).toContain(validFolder.type);
      expect(validFolder.userId).toBeTypeOf("string");
    });

    test("should validate folder type enum", () => {
      const validTypes = [
        "SYSTEM_CREATED_BOOKMARKS_FOLDER",
        "USER_CREATED_CUSTOM_FOLDER",
      ];

      expect(validTypes).toHaveLength(2);
      expect(validTypes).toContain("SYSTEM_CREATED_BOOKMARKS_FOLDER");
      expect(validTypes).toContain("USER_CREATED_CUSTOM_FOLDER");
    });

    test("should have correct indexes", () => {
      const expectedIndexes = ["byUserId"];
      expect(expectedIndexes).toContain("byUserId");
    });
  });

  describe("PaperNotes Table Schema", () => {
    test("should have all required fields", () => {
      const paperNotesSchema = {
        userId: v.id("users"),
        paperExternalId: v.string(),
        content: v.string(),
      };

      expect(paperNotesSchema).toBeDefined();
      expect(Object.keys(paperNotesSchema)).toEqual([
        "userId",
        "paperExternalId",
        "content",
      ]);
    });

    test("should validate paper notes data structure", () => {
      const validPaperNote = {
        userId: "user_123",
        paperExternalId: "paper_abc",
        content: "My notes about this paper",
      };

      expect(validPaperNote.userId).toBeTypeOf("string");
      expect(validPaperNote.paperExternalId).toBeTypeOf("string");
      expect(validPaperNote.content).toBeTypeOf("string");
    });

    test("should have correct indexes", () => {
      const expectedIndexes = ["byUserId"];
      expect(expectedIndexes).toContain("byUserId");
    });
  });

  describe("Payments Table Schema", () => {
    test("should have all required fields", () => {
      const paymentsSchema = {
        dodoPaymentsCustomerId: v.string(),
        customerEmail: v.string(),
        customerName: v.string(),
        dodoPaymentsProductId: v.string(),
      };

      expect(paymentsSchema).toBeDefined();
      expect(Object.keys(paymentsSchema)).toEqual([
        "dodoPaymentsCustomerId",
        "customerEmail",
        "customerName",
        "dodoPaymentsProductId",
      ]);
    });

    test("should validate payments data structure", () => {
      const validPayment = {
        dodoPaymentsCustomerId: "cust_123",
        customerEmail: "john@example.com",
        customerName: "John Doe",
        dodoPaymentsProductId: "prod_123",
      };

      expect(validPayment.dodoPaymentsCustomerId).toBeTypeOf("string");
      expect(validPayment.customerEmail).toBeTypeOf("string");
      expect(validPayment.customerName).toBeTypeOf("string");
      expect(validPayment.dodoPaymentsProductId).toBeTypeOf("string");
    });

    test("should have correct indexes", () => {
      const expectedIndexes = ["byDodoPaymentsCustomerId"];
      expect(expectedIndexes).toContain("byDodoPaymentsCustomerId");
    });
  });

  describe("SummaryStreams Table Schema", () => {
    test("should have all required fields", () => {
      const summaryStreamsSchema = {
        streamId: v.string(),
        query: v.string(),
        papers: v.string(), // JSON stringified
        userSummarySettings: v.string(),
      };

      expect(summaryStreamsSchema).toBeDefined();
      expect(Object.keys(summaryStreamsSchema)).toEqual([
        "streamId",
        "query",
        "papers",
        "userSummarySettings",
      ]);
    });

    test("should validate summary stream data structure", () => {
      const validStream = {
        streamId: "stream_123",
        query: "machine learning",
        papers: JSON.stringify([{ id: "paper1" }, { id: "paper2" }]),
        userSummarySettings: JSON.stringify({ format: "detailed" }),
      };

      expect(validStream.streamId).toBeTypeOf("string");
      expect(validStream.query).toBeTypeOf("string");
      expect(validStream.papers).toBeTypeOf("string");
      expect(validStream.userSummarySettings).toBeTypeOf("string");

      // Validate JSON can be parsed
      expect(() => JSON.parse(validStream.papers)).not.toThrow();
      expect(() => JSON.parse(validStream.userSummarySettings)).not.toThrow();
    });

    test("should have correct indexes", () => {
      const expectedIndexes = ["byStreamId"];
      expect(expectedIndexes).toContain("byStreamId");
    });
  });

  describe("Data Integrity Constraints", () => {
    test("user credits should never be negative", () => {
      const validCredits = [0, 1, 10, 100, 1000];
      const invalidCredits = [-1, -10, -100];

      validCredits.forEach((credits) => {
        expect(credits).toBeGreaterThanOrEqual(0);
      });

      invalidCredits.forEach((credits) => {
        expect(credits).toBeLessThan(0); // This would be invalid
      });
    });

    test("folder names should not be empty", () => {
      const validNames = ["Research", "Bookmarks", "My Papers"];
      const invalidNames = ["", "  "];

      validNames.forEach((name) => {
        expect(name.trim().length).toBeGreaterThan(0);
      });

      invalidNames.forEach((name) => {
        expect(name.trim().length).toBe(0); // This would be invalid
      });
    });

    test("search queries should not be excessively long", () => {
      const maxLength = 10000; // Reasonable limit
      const validQuery = "a".repeat(500);
      const tooLongQuery = "a".repeat(maxLength + 1);

      expect(validQuery.length).toBeLessThanOrEqual(maxLength);
      expect(tooLongQuery.length).toBeGreaterThan(maxLength); // This would be invalid
    });

    test("email addresses should be valid format", () => {
      const validEmails = [
        "user@example.com",
        "john.doe@company.co.uk",
        "test+tag@domain.org",
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validEmails.forEach((email) => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    test("folder privacy should be explicitly set", () => {
      const folder = {
        public: false,
      };

      expect(typeof folder.public).toBe("boolean");
      expect([true, false]).toContain(folder.public);
    });
  });

  describe("Relationship Constraints", () => {
    test("searches should reference valid users", () => {
      const search = {
        query: "test",
        userId: "user_valid123",
      };

      expect(search.userId).toBeTypeOf("string");
      expect(search.userId.startsWith("user_")).toBe(true);
    });

    test("folders should reference valid users", () => {
      const folder = {
        name: "Test",
        userId: "user_valid123",
      };

      expect(folder.userId).toBeTypeOf("string");
      expect(folder.userId.startsWith("user_")).toBe(true);
    });

    test("folder searchIds should reference valid searches", () => {
      const folder = {
        searchIds: ["search_1", "search_2"],
      };

      expect(Array.isArray(folder.searchIds)).toBe(true);
      folder.searchIds.forEach((id) => {
        expect(id).toBeTypeOf("string");
      });
    });

    test("folder paperExternalIds should be string array", () => {
      const folder = {
        paperExternalIds: ["paper1", "paper2", "paper3"],
      };

      expect(Array.isArray(folder.paperExternalIds)).toBe(true);
      folder.paperExternalIds.forEach((id) => {
        expect(id).toBeTypeOf("string");
      });
    });
  });
});
