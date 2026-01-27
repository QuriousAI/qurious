import { expect, test, describe, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "../src/components/switch";

afterEach(() => {
  cleanup();
});

describe("Switch Component", () => {
  test("renders switch element", () => {
    const { container } = render(<Switch />);
    const switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl).not.toBeNull();
  });

  test("handles checked state", () => {
    const { container } = render(<Switch checked={true} />);
    const switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.getAttribute("data-state")).toBe("checked");
  });

  test("handles unchecked state", () => {
    const { container } = render(<Switch checked={false} />);
    const switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.getAttribute("data-state")).toBe("unchecked");
  });

  test("handles disabled state", () => {
    const { container } = render(<Switch disabled />);
    const switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.hasAttribute("disabled")).toBe(true);
  });

  test("toggles when clicked", async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = (newChecked: boolean) => {
      checked = newChecked;
    };

    const { container } = render(<Switch onCheckedChange={handleChange} />);
    const switchEl = container.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;

    await user.click(switchEl);
    expect(checked).toBe(true);
  });

  test("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    let clicked = false;
    const handleChange = () => {
      clicked = true;
    };

    const { container } = render(
      <Switch disabled onCheckedChange={handleChange} />,
    );
    const switchEl = container.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;

    await user.click(switchEl);
    expect(clicked).toBe(false);
  });

  test("applies custom className", () => {
    const { container } = render(<Switch className="custom-switch" />);
    const switchEl = container.querySelector('[data-slot="switch"]');
    expect(switchEl?.className).toContain("custom-switch");
  });

  test("renders thumb element", () => {
    const { container } = render(<Switch />);
    const thumb = container.querySelector('[data-slot="switch-thumb"]');
    expect(thumb).toBeDefined();
  });

  test("has correct aria attributes", () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    const switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.getAttribute("aria-label")).toBe("Enable notifications");
  });

  test("supports controlled component pattern", () => {
    const { container, rerender } = render(<Switch checked={false} />);

    let switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.getAttribute("data-state")).toBe("unchecked");

    rerender(<Switch checked={true} />);
    switchEl = container.querySelector('button[role="switch"]');
    expect(switchEl?.getAttribute("data-state")).toBe("checked");
  });
});
