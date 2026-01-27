import { expect, test, describe } from "vitest";
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
    const iterations = 10;
    const orders = new Set<string>();

    for (let i = 0; i < iterations; i++) {
      const result = getRandomGroupedQuestions();
      const order = result.map((t) => t.topic).join(",");
      orders.add(order);
    }

    // Expect at least 2 different orders in 10 tries
    expect(orders.size).toBeGreaterThan(1);
  });
});
