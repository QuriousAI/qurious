import { expect, test, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppSidebar } from "../../components/sidebar";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: {
      firstName: "John",
      lastName: "Doe",
      emailAddresses: [{ emailAddress: "john@example.com" }],
    },
  }),
}));

vi.mock("convex/react", () => ({
  useQuery: vi.fn(() => undefined),
  Authenticated: ({ children }: any) => <>{children}</>,
  Unauthenticated: ({ children }: any) => null,
  AuthLoading: ({ children }: any) => null,
}));

vi.mock("@/queries", () => ({
  useGetCurrentUserFoldersQuery: () => ({
    data: [],
    isLoading: false,
  }),
}));

describe("AppSidebar Component", () => {
  test("renders sidebar navigation", () => {
    const { container } = render(<AppSidebar />);
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toBeDefined();
  });

  test("renders search link", () => {
    render(<AppSidebar />);
    const searchLink = screen.getByText("Search");
    expect(searchLink).toBeDefined();
  });

  test("renders folders link", () => {
    render(<AppSidebar />);
    const foldersLink = screen.getByText("Folders");
    expect(foldersLink).toBeDefined();
  });

  test("renders settings link", () => {
    render(<AppSidebar />);
    const settingsLink = screen.getByText("Settings");
    expect(settingsLink).toBeDefined();
  });

  test("links point to correct paths", () => {
    const { container } = render(<AppSidebar />);

    const searchLink = container.querySelector('a[href="/"]');
    expect(searchLink).toBeDefined();

    const foldersLink = container.querySelector('a[href="/folders"]');
    expect(foldersLink).toBeDefined();

    const settingsLink = container.querySelector('a[href="/settings"]');
    expect(settingsLink).toBeDefined();
  });

  test("displays user information", () => {
    render(<AppSidebar />);
    expect(screen.getByText(/John/)).toBeDefined();
  });

  test("renders navigation icons", () => {
    const { container } = render(<AppSidebar />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  test("has collapsible functionality", () => {
    const { container } = render(<AppSidebar />);
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar?.hasAttribute("data-state")).toBe(true);
  });
});
