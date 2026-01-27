import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchCard } from "../../components/cards/search";

vi.mock("next/link", () => ({
  default: ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

vi.mock("@/queries", () => ({
  useCreateSearchMutation: () => ({
    mutateAsync: vi.fn(),
  }),
}));

test("SearchCard renders with question text", () => {
  const { container } = render(
    <SearchCard questionText="What is quantum computing?" />,
  );
  expect(screen.getByText("What is quantum computing?")).toBeDefined();
  const link = container.querySelector("a");
  expect(link).not.toBeNull();
  expect(link!.getAttribute("href")).toBe(
    "/search?q=What is quantum computing?",
  );
});

test("SearchCard renders with emoji when provided", () => {
  const { container } = render(
    <SearchCard questionText="How do cells work?" questionEmoji="🧬" />,
  );
  expect(screen.getByText("🧬")).toBeDefined();
  expect(screen.getByText("How do cells work?")).toBeDefined();
  const link = container.querySelector("a");
  expect(link).not.toBeNull();
  expect(link!.getAttribute("href")).toBe("/search?q=How do cells work?");
});
