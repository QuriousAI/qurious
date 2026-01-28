import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../src/components/card";

afterEach(() => {
  cleanup();
});

describe("Card Component", () => {
  test("renders card with children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeTruthy();
  });

  test("applies custom className to card", () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card?.className).toContain("custom-card");
  });

  test("renders CardHeader with children", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeTruthy();
  });

  test("renders CardTitle with text", () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText("Card Title")).toBeTruthy();
  });

  test("CardTitle has correct data-slot attribute", () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).not.toBeNull();
  });

  test("renders CardDescription with text", () => {
    render(<CardDescription>Card description text</CardDescription>);
    expect(screen.getByText("Card description text")).toBeTruthy();
  });

  test("CardDescription has muted text styling", () => {
    const { container } = render(
      <CardDescription>Description</CardDescription>,
    );
    const description = container.querySelector(
      '[data-slot="card-description"]',
    );
    expect(description?.className).toContain("text-muted-foreground");
  });

  test("renders CardContent with children", () => {
    render(<CardContent>Content section</CardContent>);
    expect(screen.getByText("Content section")).toBeTruthy();
  });

  test("renders CardFooter with children", () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeTruthy();
  });

  test("renders complete card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText("Test Description")).toBeTruthy();
    expect(screen.getByText("Test Content")).toBeTruthy();
    expect(screen.getByText("Test Footer")).toBeTruthy();
  });

  test("applies custom className to all card parts", () => {
    const { container } = render(
      <Card className="card-custom">
        <CardHeader className="header-custom">
          <CardTitle className="title-custom">Title</CardTitle>
          <CardDescription className="desc-custom">Desc</CardDescription>
        </CardHeader>
        <CardContent className="content-custom">Content</CardContent>
        <CardFooter className="footer-custom">Footer</CardFooter>
      </Card>,
    );

    expect(container.querySelector(".card-custom")).not.toBeNull();
    expect(container.querySelector(".header-custom")).not.toBeNull();
    expect(container.querySelector(".title-custom")).not.toBeNull();
    expect(container.querySelector(".desc-custom")).not.toBeNull();
    expect(container.querySelector(".content-custom")).not.toBeNull();
    expect(container.querySelector(".footer-custom")).not.toBeNull();
  });

  test("card has shadow and border styling", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card?.className).toContain("shadow-sm");
    expect(card?.className).toContain("border");
  });

  test("supports nested cards", () => {
    render(
      <Card>
        <CardContent>
          <Card>
            <CardTitle>Nested Card</CardTitle>
          </Card>
        </CardContent>
      </Card>,
    );

    expect(screen.getByText("Nested Card")).toBeTruthy();
  });
});
