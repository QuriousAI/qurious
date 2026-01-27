import { expect, test, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaperCard } from "../../components/cards/paper";
import type { Paper } from "@workspace/semantic-scholar/src";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("convex/react", () => ({
  Authenticated: ({ children }: any) => <>{children}</>,
}));

vi.mock("@/queries", () => ({
  useGetPaperSnapshotQuery: () => ({
    data: undefined,
    isLoading: false,
  }),
  useGetCurrentUserFoldersQuery: () => ({
    data: [],
    isLoading: false,
  }),
}));

const mockPaper: Paper = {
  paperId: "test-123",
  title: "A Study on Quantum Computing",
  authors: [
    { authorId: "1", name: "John Doe" },
    { authorId: "2", name: "Jane Smith" },
  ],
  year: 2023,
  citationCount: 150,
  referenceCount: 45,
  influentialCitationCount: 12,
  abstract: "This paper explores quantum computing principles.",
  isOpenAccess: true,
  openAccessPdf: { url: "https://example.com/paper.pdf" },
  publicationDate: "2023-06-15",
  journal: { name: "Nature" },
  fieldsOfStudy: ["Computer Science", "Physics"],
} as Paper;

describe("PaperCard Component", () => {
  test("renders paper title", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText("A Study on Quantum Computing")).toBeDefined();
  });

  test("renders result index", () => {
    render(<PaperCard paper={mockPaper} resultIndex={5} />);
    expect(screen.getByText("5")).toBeDefined();
  });

  test("renders author names", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/John Doe/)).toBeDefined();
    expect(screen.getByText(/Jane Smith/)).toBeDefined();
  });

  test("renders publication year", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/2023/)).toBeDefined();
  });

  test("renders citation count badge", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/Citations: 150/)).toBeDefined();
  });

  test("renders reference count badge", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/References: 45/)).toBeDefined();
  });

  test("renders influential citation count", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/Influential: 12/)).toBeDefined();
  });

  test("shows open access badge when paper is open access", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText("Open Access")).toBeDefined();
  });

  test("does not show open access badge for closed papers", () => {
    const closedPaper = { ...mockPaper, isOpenAccess: false };
    render(<PaperCard paper={closedPaper} resultIndex={1} />);
    const badges = screen.queryByText("Open Access");
    expect(badges).toBeNull();
  });

  test("renders link to paper detail page", () => {
    const { container } = render(
      <PaperCard paper={mockPaper} resultIndex={1} />,
    );
    const link = container.querySelector(
      `a[href="/papers/${mockPaper.paperId}"]`,
    );
    expect(link).toBeDefined();
  });

  test("renders journal name when available", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/Nature/)).toBeDefined();
  });

  test("handles paper without citations gracefully", () => {
    const noCitationPaper = {
      ...mockPaper,
      citationCount: undefined,
      referenceCount: undefined,
      influentialCitationCount: undefined,
    };
    render(<PaperCard paper={noCitationPaper} resultIndex={1} />);
    expect(screen.getByText("A Study on Quantum Computing")).toBeDefined();
  });

  test("handles paper without year", () => {
    const noYearPaper = { ...mockPaper, year: undefined };
    render(<PaperCard paper={noYearPaper} resultIndex={1} />);
    expect(screen.getByText("A Study on Quantum Computing")).toBeDefined();
  });

  test("handles paper without authors", () => {
    const noAuthorsPaper = { ...mockPaper, authors: [] };
    render(<PaperCard paper={noAuthorsPaper} resultIndex={1} />);
    expect(screen.getByText("A Study on Quantum Computing")).toBeDefined();
  });

  test("renders abstract when available", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(
      screen.getByText(/explores quantum computing principles/),
    ).toBeDefined();
  });

  test("displays fields of study", () => {
    render(<PaperCard paper={mockPaper} resultIndex={1} />);
    expect(screen.getByText(/Computer Science/)).toBeDefined();
    expect(screen.getByText(/Physics/)).toBeDefined();
  });

  test("card is clickable", () => {
    const { container } = render(
      <PaperCard paper={mockPaper} resultIndex={1} />,
    );
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeDefined();
  });
});
