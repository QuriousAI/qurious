import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/(user)/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => "/",
}));

vi.mock("convex/react", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useConvex: vi.fn(),
  useAction: vi.fn(),
}));

vi.mock("@/queries", () => ({
  useCreateSearchMutation: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock("@/utils/questions", () => ({
  getRandomGroupedQuestions: () => [],
}));

test("Page", () => {
  render(<Page />);
  // Check that the page renders without errors
  expect(screen.getByText(/Try searching about.../i)).toBeDefined();
});
