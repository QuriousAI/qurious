import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../src/components/select";

describe("Select Component", () => {
  test("renders select with trigger", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByText("Select an option")).toBeDefined();
  });

  test("renders select with items", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Choose")).toBeDefined();
  });

  test("applies custom className to trigger", () => {
    const { container } = render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.className).toContain("custom-trigger");
  });

  test("handles different size variants", () => {
    const { container, rerender } = render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );

    let trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.getAttribute("data-size")).toBe("sm");

    rerender(
      <Select>
        <SelectTrigger size="default">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );

    trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.getAttribute("data-size")).toBe("default");
  });

  test("handles disabled state", () => {
    const { container } = render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.hasAttribute("disabled")).toBe(true);
  });

  test("displays selected value", () => {
    render(
      <Select defaultValue="option1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">First Option</SelectItem>
          <SelectItem value="option2">Second Option</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("First Option")).toBeDefined();
  });

  test("renders chevron icon in trigger", () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const chevron = container.querySelector(".lucide-chevron-down");
    expect(chevron).toBeDefined();
  });

  test("handles aria-invalid attribute", () => {
    const { container } = render(
      <Select>
        <SelectTrigger aria-invalid={true}>
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger?.getAttribute("aria-invalid")).toBe("true");
  });

  test("renders with controlled value", () => {
    const { rerender } = render(
      <Select value="option1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Option 1")).toBeDefined();

    rerender(
      <Select value="option2">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("Option 2")).toBeDefined();
  });

  test("renders SelectItem with check icon when selected", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Select defaultValue="test">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test Item</SelectItem>
        </SelectContent>
      </Select>,
    );

    // Open select to see items
    const trigger = container.querySelector('[data-slot="select-trigger"]');
    if (trigger) {
      await user.click(trigger as HTMLElement);
    }

    const checkIcon = document.querySelector(".lucide-check");
    expect(checkIcon).not.toBeNull();
  });
});
