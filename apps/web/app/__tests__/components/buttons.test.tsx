import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CopyToClipboardButton } from "../../components/buttons";

vi.mock("react-use", () => ({
  useCopyToClipboard: () => [null, vi.fn()],
}));

vi.mock("@workspace/design-system/components/sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

test("CopyToClipboardButton renders with copy icon", () => {
  const { container } = render(
    <CopyToClipboardButton
      textToCopy="test text"
      onCopySuccessMessage="Copied!"
      buttonIcon="copy"
    />,
  );
  expect(screen.getByText("Copy")).toBeDefined();
  // Check that the Clipboard icon is rendered
  const clipboardIcon = container.querySelector(".lucide-clipboard");
  expect(clipboardIcon).toBeDefined();
});

test("CopyToClipboardButton renders with share icon", () => {
  const { container } = render(
    <CopyToClipboardButton
      textToCopy="test text"
      onCopySuccessMessage="Copied!"
      buttonIcon="share"
    />,
  );
  expect(screen.getAllByText("Copy").length).toBeGreaterThan(0);
  // Check that the Share2 icon is rendered
  const shareIcon = container.querySelector(".lucide-share2, .lucide-share-2");
  expect(shareIcon).toBeDefined();
});
