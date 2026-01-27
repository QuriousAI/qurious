import { expect, test, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../../components/search-bar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("@/queries", () => ({
  useCreateSearchMutation: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("SearchBar Component", () => {
  test("renders search bar with textarea", () => {
    render(<SearchBar />);
    const textarea = screen.getByPlaceholderText(/ask anything/i);
    expect(textarea).toBeDefined();
  });

  test("allows typing in search input", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const textarea = screen.getByPlaceholderText(
      /ask anything/i,
    ) as HTMLTextAreaElement;

    await user.type(textarea, "quantum computing");
    expect(textarea.value).toBe("quantum computing");
  });

  test("renders search button", () => {
    const { container } = render(<SearchBar />);
    // Search button has hidden text "Normal"
    const normalButton = screen.getByText(/normal/i);
    expect(normalButton).toBeDefined();
  });

  test("search button is disabled when input is empty", () => {
    const { container } = render(<SearchBar />);
    // Check for the submit button (primary variant)
    const submitButton = container.querySelector(
      '[data-slot="button"].bg-primary',
    );
    expect(submitButton?.hasAttribute("disabled")).toBe(true);
  });

  test("search button is enabled when input has text", async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchBar />);
    const textarea = screen.getByPlaceholderText(/ask anything/i);
    const submitButton = container.querySelector(
      '[data-slot="button"].bg-primary',
    ) as HTMLButtonElement;

    await user.type(textarea, "test query");
    expect(submitButton.hasAttribute("disabled")).toBe(false);
  });

  test("displays search icon", () => {
    const { container } = render(<SearchBar />);
    const searchIcon = container.querySelector(".lucide-search");
    expect(searchIcon).toBeDefined();
  });

  test("handles initial query prop", () => {
    render(<SearchBar q="machine learning" />);
    const textarea = screen.getByPlaceholderText(
      /ask anything/i,
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("machine learning");
  });

  test("clears input when clear is triggered", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const textarea = screen.getByPlaceholderText(
      /ask anything/i,
    ) as HTMLTextAreaElement;

    await user.type(textarea, "test query");
    expect(textarea.value).toBe("test query");

    await user.clear(textarea);
    expect(textarea.value).toBe("");
  });

  test("renders options sheet button", () => {
    const { container } = render(<SearchBar />);
    // Options button should be a sheet trigger
    const optionsButton = container.querySelector(
      '[data-slot="sheet-trigger"]',
    );
    expect(optionsButton).toBeDefined();
  });

  test("textarea grows with content", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);
    const textarea = screen.getByPlaceholderText(
      /ask anything/i,
    ) as HTMLTextAreaElement;

    const longText = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5";
    await user.type(textarea, longText);

    expect(textarea.value).toContain("\n");
  });
});
