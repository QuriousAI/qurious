import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Button } from "../src/components/button";

afterEach(() => {
  cleanup();
});

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  test("renders button with default variant", () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("bg-primary");
  });

  test("renders button with outline variant", () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("border");
  });

  test("renders button with destructive variant", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("bg-destructive");
  });

  test("renders button with different sizes", () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("h-8");
  });

  test("renders disabled button", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = container.querySelector("button");
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  test("handles click events", () => {
    let clicked = false;
    const { container } = render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>,
    );
    const button = container.querySelector("button");
    button?.click();
    expect(clicked).toBe(true);
  });
});
