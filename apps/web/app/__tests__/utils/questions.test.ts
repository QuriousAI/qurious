import { expect, test, describe, vi } from "vitest";
import { getRandomGroupedQuestions } from "../../utils/questions";

describe("getRandomGroupedQuestions", () => {
  test("returns an array of topics", () => {
    const result = getRandomGroupedQuestions();
    expect(Array.isArray(result)).toBe(true);
  });

  test("each topic has required properties", () => {
    const result = getRandomGroupedQuestions();

    result.forEach((topic) => {
      expect(topic).toHaveProperty("topic");
      expect(topic).toHaveProperty("questions");
      expect(typeof topic.topic).toBe("string");
      expect(Array.isArray(topic.questions)).toBe(true);
    });
  });

  test("each question has question property", () => {
    const result = getRandomGroupedQuestions();

    result.forEach((topic) => {
      topic.questions.forEach((question) => {
        expect(question).toHaveProperty("question");
        expect(typeof question.question).toBe("string");
        expect(question.question.length).toBeGreaterThan(0);
      });
    });
  });

  test("returns shuffled results", () => {
    // Stub Math.random for deterministic shuffling
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);

    try {
      const result1 = getRandomGroupedQuestions();

      // Change random value to produce different order
      randomSpy.mockReturnValue(0.1);
      const result2 = getRandomGroupedQuestions();

      // This assertion assumes the implementation actually uses Math.random()
      // effectively enough that 0.5 and 0.1 yield different results or same results logic
      // Since the requirement is to stub it to produce deterministic, differing outcomes,
      // we can manipulate it.
      // If the implementation is a simple .sort(() => Math.random() - 0.5),
      // mocking constant return might not shuffle well or might not change order?

      // User requested: "supply a predefined sequence of random values for each invocation... run twice... assert orders differ"
      // Let's mock a sequence using mockReturnValueOnce

      randomSpy.mockReset();
      // First run sequence
      randomSpy
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.9)
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.8);

      const run1 = getRandomGroupedQuestions();
      const order1 = run1.map((t) => t.topic).join(",");

      // Second run sequence (inverse to ensure diff)
      randomSpy
        .mockReturnValueOnce(0.9)
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.8)
        .mockReturnValueOnce(0.2);

      const run2 = getRandomGroupedQuestions();
      const order2 = run2.map((t) => t.topic).join(",");

      expect(order1).not.toBe(order2);
    } finally {
      randomSpy.mockRestore();
    }
  });
});
