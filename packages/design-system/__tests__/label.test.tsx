import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Label } from "../src/components/label";

describe("Label Component", () => {
  test("renders label with text", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeDefined();
  });

  test("associates with input via htmlFor", () => {
    render(
      <div>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" type="email" />
      </div>,
    );
    const label = screen.getByText("Email");
    expect(label.getAttribute("for")).toBe("email-input");
  });

  test("applies custom className", () => {
    const { container } = render(<Label className="custom-label">Label</Label>);
    const label = container.querySelector("label");
    expect(label?.className).toContain("custom-label");
  });

  test("renders with children elements", () => {
    render(
      <Label>
        <span>Required</span> Field
      </Label>,
    );
    expect(screen.getByText("Required")).toBeDefined();
    expect(screen.getByText(/Field/)).toBeDefined();
  });

  test("handles disabled styling via peer classes", () => {
    const { container } = render(<Label>Disabled Label</Label>);
    const label = container.querySelector("label");
    expect(label?.className).toContain("peer-disabled:cursor-not-allowed");
  });

  test("has correct font weight", () => {
    const { container } = render(<Label>Label Text</Label>);
    const label = container.querySelector("label");
    expect(label?.className).toContain("font-medium");
  });

  test("renders multiple labels", () => {
    render(
      <div>
        <Label htmlFor="name">Name</Label>
        <Label htmlFor="age">Age</Label>
        <Label htmlFor="city">City</Label>
      </div>,
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Age")).toBeDefined();
    expect(screen.getByText("City")).toBeDefined();
  });

  test("supports click events", () => {
    let clicked = false;
    const { container } = render(
      <Label
        onClick={() => {
          clicked = true;
        }}
      >
        Clickable
      </Label>,
    );
    const label = container.querySelector("label") as HTMLLabelElement;
    label.click();
    expect(clicked).toBe(true);
  });
});
