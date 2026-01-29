/**
 * Schema Validation Tests
 *
 * Tests to validate database schema structure and constraints using the exported schema.
 */

import { describe, test, expect } from "vitest";
import schema from "../convex/schema";

describe("Schema Validation", () => {
  describe("Users Table Schema", () => {
    const table = schema.tables.users;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byClerkId");
      expect(indexNames).toContain("byDodoCustomerId");
    });
  });

  describe("Searches Table Schema", () => {
    const table = schema.tables.searches;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byUserId");
    });
  });

  describe("Folders Table Schema", () => {
    const table = schema.tables.folders;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byUserId");
    });
  });

  describe("PaperNotes Table Schema", () => {
    const table = schema.tables.paperNotes;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byUserId");
    });
  });

  describe("Payments Table Schema", () => {
    const table = schema.tables.payments;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byDodoPaymentsCustomerId");
    });
  });

  describe("SummaryStreams Table Schema", () => {
    const table = schema.tables.summaryStreams;

    test("should be defined", () => {
      expect(table).toBeDefined();
    });

    test("should have correct indexes", () => {
      const indexNames = (table as any).indexes.map(
        (i: any) => i.indexDescriptor,
      );
      expect(indexNames).toContain("byStreamId");
    });
  });
});
