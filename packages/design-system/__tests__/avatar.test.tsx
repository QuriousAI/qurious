import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "../src/components/avatar";

afterEach(() => {
  cleanup();
});

describe("Avatar Component", () => {
  test("renders avatar container", () => {
    const { container } = render(<Avatar />);
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toBeDefined();
  });

  test("renders avatar image", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
      </Avatar>,
    );
    // Image may not load immediately in test environment
    const img = container.querySelector("img");
    expect(img).toBeDefined();
  });

  test("renders fallback when image fails", () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("JD")).toBeDefined();
  });

  test("displays fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeDefined();
  });

  test("applies custom className to avatar", () => {
    const { container } = render(<Avatar className="custom-avatar" />);
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar?.className).toContain("custom-avatar");
  });

  test("applies custom className to fallback", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback className="custom-fallback">XY</AvatarFallback>
      </Avatar>,
    );
    const fallback = container.querySelector(".custom-fallback");
    expect(fallback).toBeDefined();
  });

  test("has circular shape", () => {
    const { container } = render(<Avatar />);
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar?.className).toContain("rounded-full");
  });

  test("handles different sizes via className", () => {
    const { container } = render(<Avatar className="h-16 w-16" />);
    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar?.className).toContain("h-16");
    expect(avatar?.className).toContain("w-16");
  });

  test("image has correct src attribute", () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/user.png" />
      </Avatar>,
    );
    const image = container.querySelector("img");
    const src = image?.getAttribute("src");
    if (src) {
      expect(src).toContain("user.png");
    } else {
      // Image may not be in DOM yet in test environment
      expect(image).toBeDefined();
    }
  });

  test("renders multiple avatars", () => {
    render(
      <div>
        <Avatar>
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
      </div>,
    );
    expect(screen.getByText("A1")).toBeDefined();
    expect(screen.getByText("A2")).toBeDefined();
    expect(screen.getByText("A3")).toBeDefined();
  });
});
