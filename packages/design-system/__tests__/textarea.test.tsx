import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../src/components/textarea";

afterEach(() => {
  cleanup();
});

describe("Textarea Component", () => {
  test("renders textarea element", () => {
    render(<Textarea placeholder="Enter description" />);
    expect(screen.getByPlaceholderText("Enter description")).toBeDefined();
  });

  test("accepts text input", async () => {
    const user = userEvent.setup();
    const { container } = render(<Textarea />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    await user.type(textarea, "Multi-line\ntext content");
    expect(textarea.value).toBe("Multi-line\ntext content");
  });

  test("handles disabled state", () => {
    const { container } = render(<Textarea disabled />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  test("applies custom className", () => {
    const { container } = render(<Textarea className="custom-textarea" />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.className).toContain("custom-textarea");
  });

  test("handles onChange event", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      value = e.target.value;
    };

    const { container } = render(<Textarea onChange={handleChange} />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    await user.type(textarea, "test value");
    expect(value).toBe("test value");
  });

  test("handles controlled value", () => {
    const { container, rerender } = render(
      <Textarea value="initial" readOnly />,
    );
    let textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe("initial");

    rerender(<Textarea value="updated" readOnly />);
    textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe("updated");
  });

  test("handles rows attribute", () => {
    const { container } = render(<Textarea rows={5} />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("rows")).toBe("5");
  });

  test("handles readOnly attribute", () => {
    const { container } = render(<Textarea readOnly />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
  });

  test("handles required attribute", () => {
    const { container } = render(<Textarea required />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.required).toBe(true);
  });

  test("handles maxLength attribute", () => {
    const { container } = render(<Textarea maxLength={100} />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("maxLength")).toBe("100");
  });

  test("supports multiline text", async () => {
    const user = userEvent.setup();
    const { container } = render(<Textarea />);
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    await user.type(textarea, "Line 1{Enter}Line 2{Enter}Line 3");
    expect(textarea.value).toContain("\n");
    expect(textarea.value.split("\n").length).toBe(3);
  });

  test("handles aria-invalid attribute", () => {
    const { container } = render(<Textarea aria-invalid={true} />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("aria-invalid")).toBe("true");
  });
});
