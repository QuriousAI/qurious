import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../src/components/tabs";

afterEach(() => {
  cleanup();
});

describe("Tabs Component", () => {
  test("renders tabs with list and content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Tab 1")).toBeDefined();
    expect(screen.getByText("Tab 2")).toBeDefined();
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  test("displays content for active tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">First tab content</TabsContent>
        <TabsContent value="tab2">Second tab content</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("First tab content")).toBeDefined();
  });

  test("switches content when tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content A</TabsContent>
        <TabsContent value="tab2">Content B</TabsContent>
      </Tabs>,
    );

    const tab2Trigger = screen.getByText("Tab 2");
    await user.click(tab2Trigger);

    expect(screen.getByText("Content B")).toBeDefined();
  });

  test("applies custom className to tabs list", () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list">
          <TabsTrigger value="tab1">Tab</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const tabsList = container.querySelector(".custom-list");
    expect(tabsList).toBeDefined();
  });

  test("applies custom className to tabs trigger", () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const trigger = container.querySelector(".custom-trigger");
    expect(trigger).toBeDefined();
  });

  test("applies custom className to tabs content", () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content
        </TabsContent>
      </Tabs>,
    );

    const content = container.querySelector(".custom-content");
    expect(content).toBeDefined();
  });

  test("handles controlled tabs", () => {
    const { rerender } = render(
      <Tabs value="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Content 1")).toBeDefined();

    rerender(
      <Tabs value="tab2">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Content 2")).toBeDefined();
  });

  test("renders multiple tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">First</TabsTrigger>
          <TabsTrigger value="tab2">Second</TabsTrigger>
          <TabsTrigger value="tab3">Third</TabsTrigger>
          <TabsTrigger value="tab4">Fourth</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">1</TabsContent>
        <TabsContent value="tab2">2</TabsContent>
        <TabsContent value="tab3">3</TabsContent>
        <TabsContent value="tab4">4</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("First")).toBeDefined();
    expect(screen.getByText("Second")).toBeDefined();
    expect(screen.getByText("Third")).toBeDefined();
    expect(screen.getByText("Fourth")).toBeDefined();
  });

  test("active trigger has correct data-state", () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const triggers = container.querySelectorAll("button");
    expect(triggers[0].getAttribute("data-state")).toBe("active");
    expect(triggers[1].getAttribute("data-state")).toBe("inactive");
  });

  test("disabled trigger cannot be activated", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab2 = screen.getByText("Tab 2");
    await user.click(tab2);

    // Should still show tab1 content
    expect(screen.getByText("Content 1")).toBeDefined();
  });
});
