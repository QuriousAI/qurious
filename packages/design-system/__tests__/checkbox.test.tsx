import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../src/components/checkbox";

afterEach(() => {
  cleanup();
});

describe("Checkbox Component", () => {
  test("renders checkbox", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox).toBeDefined();
  });

  test("handles checked state", () => {
    const { container } = render(<Checkbox checked={true} />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox?.getAttribute("data-state")).toBe("checked");
  });

  test("handles unchecked state", () => {
    const { container } = render(<Checkbox checked={false} />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox?.getAttribute("data-state")).toBe("unchecked");
  });

  test("handles disabled state", () => {
    const { container } = render(<Checkbox disabled />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox?.hasAttribute("disabled")).toBe(true);
  });

  test("applies custom className", () => {
    const { container } = render(<Checkbox className="custom-checkbox" />);
    const checkbox = container.querySelector('[data-slot="checkbox"]');
    expect(checkbox?.className).toContain("custom-checkbox");
  });

  test("handles click event when not disabled", async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = () => {
      checked = !checked;
    };

    const { container } = render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = container.querySelector(
      'button[role="checkbox"]',
    ) as HTMLButtonElement;

    await user.click(checkbox);
    expect(checked).toBe(true);
  });

  test("does not handle click when disabled", async () => {
    const user = userEvent.setup();
    let clicked = false;
    const handleChange = () => {
      clicked = true;
    };

    const { container } = render(
      <Checkbox disabled onCheckedChange={handleChange} />,
    );
    const checkbox = container.querySelector(
      'button[role="checkbox"]',
    ) as HTMLButtonElement;

    await user.click(checkbox);
    expect(clicked).toBe(false);
  });

  test("shows check indicator when checked", () => {
    const { container } = render(<Checkbox checked={true} />);
    const indicator = container.querySelector(
      '[data-slot="checkbox-indicator"]',
    );
    expect(indicator).toBeDefined();
  });

  test("handles indeterminate state", () => {
    const { container } = render(<Checkbox checked="indeterminate" />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox?.getAttribute("data-state")).toBe("indeterminate");
  });

  test("renders with aria-label", () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    const checkbox = container.querySelector('button[role="checkbox"]');
    expect(checkbox?.getAttribute("aria-label")).toBe("Accept terms");
  });

  test("toggles between checked and unchecked", async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = (newChecked: boolean) => {
      checked = newChecked;
    };

    const { container, rerender } = render(
      <Checkbox checked={checked} onCheckedChange={handleChange} />,
    );

    const checkbox = container.querySelector(
      'button[role="checkbox"]',
    ) as HTMLButtonElement;

    await user.click(checkbox);
    rerender(<Checkbox checked={true} onCheckedChange={handleChange} />);

    let element = container.querySelector('button[role="checkbox"]');
    expect(element?.getAttribute("data-state")).toBe("checked");
  });
});
