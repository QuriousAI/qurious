import { expect, test, describe } from "vitest";
import { extractFieldsFromPapers } from "../../utils/extractor";
import type { Paper } from "@workspace/semantic-scholar/src";

describe("extractFieldsFromPapers", () => {
  test("returns undefined when papers is undefined", () => {
    const result = extractFieldsFromPapers(undefined);
    expect(result).toBeUndefined();
  });

  test("returns empty array when papers is empty", () => {
    const result = extractFieldsFromPapers([]);
    expect(result).toEqual([]);
  });

  test("extracts paper with abstract only", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Test Paper",
        abstract: "This is an abstract",
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual({
      title: "Test Paper",
      abstract: "This is an abstract",
    });
  });

  test("extracts paper with tldr only", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Test Paper",
        tldr: { text: "This is a TLDR" },
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual({
      title: "Test Paper",
      tldr: "This is a TLDR",
    });
  });

  test("extracts paper with both abstract and tldr", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Complete Paper",
        abstract: "Full abstract text",
        tldr: { text: "Short summary" },
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual({
      title: "Complete Paper",
      abstract: "Full abstract text",
      tldr: "Short summary",
    });
  });

  test("filters out papers without abstract or tldr", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Paper with Abstract",
        abstract: "Has abstract",
      } as Paper,
      {
        paperId: "2",
        title: "Paper without content",
      } as Paper,
      {
        paperId: "3",
        title: "Paper with TLDR",
        tldr: { text: "Has TLDR" },
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(2);
    expect(result?.[0].title).toBe("Paper with Abstract");
    expect(result?.[1].title).toBe("Paper with TLDR");
  });

  test("throws error when paper has abstract/tldr but no title", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        abstract: "Has abstract but no title",
      } as Paper,
    ];

    expect(() => extractFieldsFromPapers(papers)).toThrow("Title is undefined");
  });

  test("handles multiple papers correctly", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "First Paper",
        abstract: "First abstract",
        tldr: { text: "First TLDR" },
      } as Paper,
      {
        paperId: "2",
        title: "Second Paper",
        abstract: "Second abstract",
      } as Paper,
      {
        paperId: "3",
        title: "Third Paper",
        tldr: { text: "Third TLDR" },
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(3);
    expect(result?.[0].title).toBe("First Paper");
    expect(result?.[1].title).toBe("Second Paper");
    expect(result?.[2].title).toBe("Third Paper");
  });

  test("preserves order of papers", () => {
    const papers: Paper[] = [
      { paperId: "3", title: "C", abstract: "Abstract C" } as Paper,
      { paperId: "1", title: "A", abstract: "Abstract A" } as Paper,
      { paperId: "2", title: "B", abstract: "Abstract B" } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result?.[0].title).toBe("C");
    expect(result?.[1].title).toBe("A");
    expect(result?.[2].title).toBe("B");
  });

  test("handles empty abstract string", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Paper",
        abstract: "",
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toEqual([]);
  });

  test("handles papers with null tldr", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Paper",
        abstract: "Has abstract",
        tldr: null,
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual({
      title: "Paper",
      abstract: "Has abstract",
    });
  });

  test("handles empty tldr text", () => {
    const papers: Paper[] = [
      {
        paperId: "1",
        title: "Paper",
        abstract: "Has abstract",
        tldr: { text: "" },
      } as Paper,
    ];

    const result = extractFieldsFromPapers(papers);
    // Either it omits the tldr or returns it as is, depending on desired behavior.
    // The prompt says "assert that the resulting array either omits the tldr or returns the paper without an empty tldr.text (mirroring the 'handles empty abstract string' test)"
    // The "handles empty abstract string" test returns empty array if abstract is empty? No, line 154 expects result to equal [].
    // So if tldr is empty (and abstract present), maybe it should return the paper but without tldr?
    // "returns the paper without an empty tldr.text"
    expect(result).toHaveLength(1);
    expect(result?.[0]).toEqual({
      title: "Paper",
      abstract: "Has abstract",
    });
    // tldr should be omitted if text is empty
    expect(result?.[0].tldr).toBeUndefined();
  });
});
