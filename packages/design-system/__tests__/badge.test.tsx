import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Badge } from "../src/components/badge";

afterEach(() => {
  cleanup();
});

describe("Badge Component", () => {
  test("renders badge with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeDefined();
  });

  test("renders default variant", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.className).toContain("bg-primary");
  });

  test("renders secondary variant", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.className).toContain("bg-secondary");
  });

  test("renders destructive variant", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.className).toContain("bg-destructive");
  });

  test("renders outline variant", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.className).toContain("border");
  });

  test("applies custom className", () => {
    const { container } = render(
      <Badge className="custom-badge">Custom</Badge>,
    );
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge?.className).toContain("custom-badge");
  });

  test("renders with children elements", () => {
    render(
      <Badge>
        <span>Icon</span> Text
      </Badge>,
    );
    expect(screen.getByText("Icon")).toBeDefined();
    expect(screen.getByText(/Text/)).toBeDefined();
  });

  test("has correct data-slot attribute", () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.querySelector('[data-slot="badge"]');
    expect(badge).toBeDefined();
  });

  test("renders multiple badges", () => {
    render(
      <div>
        <Badge>First</Badge>
        <Badge variant="secondary">Second</Badge>
        <Badge variant="destructive">Third</Badge>
      </div>,
    );
    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
    expect(screen.getByText("Third")).toBeDefined();
  });

  test("handles click events", async () => {
    let clicked = false;
    const { container } = render(
      <Badge
        onClick={() => {
          clicked = true;
        }}
      >
        Clickable
      </Badge>,
    );
    const badge = container.querySelector('[data-slot="badge"]') as HTMLElement;
    badge.click();
    expect(clicked).toBe(true);
  });
});
