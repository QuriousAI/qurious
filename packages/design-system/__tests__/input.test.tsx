import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../src/components/input";

afterEach(() => {
  cleanup();
});

describe("Input Component", () => {
  test("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeDefined();
  });

  test("accepts text input", async () => {
    const user = userEvent.setup();
    const { container } = render(<Input />);
    const input = container.querySelector("input") as HTMLInputElement;

    await user.type(input, "Hello World");
    expect(input.value).toBe("Hello World");
  });

  test("handles different input types", () => {
    const { container, rerender } = render(<Input type="email" />);
    let input = container.querySelector("input");
    expect(input?.getAttribute("type")).toBe("email");

    rerender(<Input type="password" />);
    input = container.querySelector("input");
    expect(input?.getAttribute("type")).toBe("password");

    rerender(<Input type="number" />);
    input = container.querySelector("input");
    expect(input?.getAttribute("type")).toBe("number");
  });

  test("handles disabled state", () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test("applies custom className", () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector("input");
    expect(input?.className).toContain("custom-class");
  });

  test("handles onChange event", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    const { container } = render(<Input onChange={handleChange} />);
    const input = container.querySelector("input") as HTMLInputElement;

    await user.type(input, "test");
    expect(value).toBe("test");
  });

  test("handles value prop (controlled)", () => {
    const { container, rerender } = render(<Input value="initial" readOnly />);
    let input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("initial");

    rerender(<Input value="updated" readOnly />);
    input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("updated");
  });

  test("sets aria-invalid attribute", () => {
    const { container } = render(<Input aria-invalid={true} />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("aria-invalid")).toBe("true");
  });

  test("supports file input type", () => {
    const { container } = render(<Input type="file" />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("type")).toBe("file");
  });

  test("handles readOnly attribute", () => {
    const { container } = render(<Input readOnly />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test("handles required attribute", () => {
    const { container } = render(<Input required />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  test("handles maxLength attribute", () => {
    const { container } = render(<Input maxLength={10} />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("maxLength")).toBe("10");
  });
});
