import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Separator } from "../src/components/separator";

afterEach(() => {
  cleanup();
});

describe("Separator Component", () => {
  test("renders separator", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).not.toBeNull();
  });

  test("renders horizontal separator by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.getAttribute("data-orientation")).toBe("horizontal");
  });

  test("renders vertical separator", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.getAttribute("data-orientation")).toBe("vertical");
  });

  test("applies custom className", () => {
    const { container } = render(<Separator className="custom-separator" />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.className).toContain("custom-separator");
  });

  test("renders as decorative by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.getAttribute("role")).toBe("none");
  });

  test("can be non-decorative", () => {
    const { container } = render(<Separator decorative={false} />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).not.toBeNull();
  });

  test("horizontal separator has correct height", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.className).toContain("h-px");
  });

  test("vertical separator has correct width", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator?.className).toContain("w-px");
  });

  test("renders in a layout", () => {
    render(
      <div>
        <p>Content above</p>
        <Separator />
        <p>Content below</p>
      </div>,
    );

    expect(screen.getByText("Content above")).toBeTruthy();
    expect(screen.getByText("Content below")).toBeTruthy();
  });

  test("renders multiple separators", () => {
    const { container } = render(
      <div>
        <Separator />
        <Separator />
        <Separator />
      </div>,
    );

    const separators = container.querySelectorAll('[data-slot="separator"]');
    expect(separators.length).toBe(3);
  });
});
