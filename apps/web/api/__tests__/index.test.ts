import { expect, test, describe } from "vitest";
import app from "../src/index.js";

describe("API Routes", () => {
  test("GET / returns 401 without authentication (covered in auth.test.ts)", async () => {
    // Duplicate of auth.test.ts "GET / returns 401 without auth"
    // Keeping file structure but test is redundant.
    expect(true).toBe(true);
  });
});
