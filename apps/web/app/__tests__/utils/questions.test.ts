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
    const result1 = getRandomGroupedQuestions();
    const result2 = getRandomGroupedQuestions();

    // Both should be arrays with data
    expect(result1.length).toBeGreaterThan(0);
    expect(result2.length).toBeGreaterThan(0);

    // Results have the same structure
    expect(typeof result1[0].topic).toBe("string");
    expect(Array.isArray(result1[0].questions)).toBe(true);
  });
});
