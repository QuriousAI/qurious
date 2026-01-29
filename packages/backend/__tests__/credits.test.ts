/**
 * Credits Module Tests
 *
 * Tests for credit cost constants to ensure pricing consistency
 */

import { describe, test, expect } from "vitest";

describe("Credits Module", () => {
  test("should have correct credit costs defined", async () => {
    const { PAPER_SUMMARY_CREDITS, STUDY_SNAPSHOT_CREDITS, ASK_PAPER_CREDITS } =
      await import("../credits");

    expect(PAPER_SUMMARY_CREDITS).toBe(2);
    expect(STUDY_SNAPSHOT_CREDITS).toBe(1);
    expect(ASK_PAPER_CREDITS).toBe(1);
  });

  test("credit costs should be positive numbers", async () => {
    const { PAPER_SUMMARY_CREDITS, STUDY_SNAPSHOT_CREDITS, ASK_PAPER_CREDITS } =
      await import("../credits");

    expect(PAPER_SUMMARY_CREDITS).toBeGreaterThan(0);
    expect(STUDY_SNAPSHOT_CREDITS).toBeGreaterThan(0);
    expect(ASK_PAPER_CREDITS).toBeGreaterThan(0);
  });

  test("paper summary should cost more than other features", async () => {
    const { PAPER_SUMMARY_CREDITS, STUDY_SNAPSHOT_CREDITS, ASK_PAPER_CREDITS } =
      await import("../credits");

    expect(PAPER_SUMMARY_CREDITS).toBeGreaterThanOrEqual(
      STUDY_SNAPSHOT_CREDITS,
    );
    expect(PAPER_SUMMARY_CREDITS).toBeGreaterThanOrEqual(ASK_PAPER_CREDITS);
  });
});
