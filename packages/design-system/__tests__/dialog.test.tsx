import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../src/components/dialog";
import { Button } from "../src/components/button";

describe("Dialog Component", () => {
  test("renders dialog trigger", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
      </Dialog>,
    );
    expect(screen.getByText("Open Dialog")).toBeDefined();
  });

  test("opens dialog when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByText("Open");
    await user.click(trigger);

    expect(screen.getByText("Dialog Title")).toBeDefined();
  });

  test("renders dialog header with title and description", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test description text</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));

    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test description text")).toBeDefined();
  });

  test("renders dialog footer", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));

    expect(
      screen.getAllByRole("button", { name: /Cancel|Confirm/i }).length,
    ).toBeGreaterThan(0);
  });

  test("closes dialog when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Content</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Dialog Content")).toBeDefined();

    // Find and click close button (X icon)
    // Find and click close button (X icon)
    const closeButton = document.querySelector('[data-slot="dialog-close"]');
    expect(closeButton).not.toBeNull();
    await user.click(closeButton as HTMLElement);

    // Check that dialog content is gone
    expect(screen.queryByText("Dialog Content")).toBeNull();
  });

  test("applies custom className to content", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent className="custom-dialog">
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));

    await user.click(screen.getByText("Open"));

    // Dialog content is portalled, query document
    const dialog = document.querySelector(".custom-dialog");
    expect(dialog).not.toBeNull();
  });

  test("renders controlled dialog", () => {
    const { rerender } = render(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText("Controlled Dialog")).toBeNull();

    rerender(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Controlled Dialog")).toBeDefined();
  });

  test("calls onOpenChange when dialog state changes", async () => {
    const user = userEvent.setup();
    let isOpen = false;
    const handleOpenChange = (open: boolean) => {
      isOpen = open;
    };

    render(
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));
    expect(isOpen).toBe(true);
  });

  test("renders dialog overlay", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    await user.click(screen.getByText("Open"));

    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).not.toBeNull();
  });
});
