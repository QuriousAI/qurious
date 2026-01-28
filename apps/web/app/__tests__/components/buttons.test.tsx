import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CopyToClipboardButton } from "../../components/buttons";
import userEvent from "@testing-library/user-event";
import { toast } from "@workspace/design-system/components/sonner";

// Use vi.hoisted to ensure mock is accessible
const { mockCopy } = vi.hoisted(() => ({ mockCopy: vi.fn() }));

vi.mock("react-use", () => ({
  useCopyToClipboard: () => [null, mockCopy],
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
  expect(screen.getByText("Copy")).toBeInTheDocument();
  // Check that the Clipboard icon is rendered
  const clipboardIcon = container.querySelector(".lucide-clipboard");
  expect(clipboardIcon).not.toBeNull();
});

test("CopyToClipboardButton renders with share icon", () => {
  const { container } = render(
    <CopyToClipboardButton
      textToCopy="test text"
      onCopySuccessMessage="Copied!"
      buttonIcon="share"
    />,
  );
  expect(screen.getByText("Copy")).toBeInTheDocument();
  // Check that the Share2 icon is rendered
  const shareIcon = container.querySelector(".lucide-share2, .lucide-share-2");
  expect(shareIcon).not.toBeNull();
});

test("copies text and shows toast on click", async () => {
  const user = userEvent.setup();
  const textToCopy = "Hello World";
  const successMessage = "Successfully copied!";

  render(
    <CopyToClipboardButton
      textToCopy={textToCopy}
      onCopySuccessMessage={successMessage}
      buttonIcon="copy"
    />,
  );

  const button = screen.getByText("Copy");
  await user.click(button);

  expect(mockCopy).toHaveBeenCalledWith(textToCopy);
  expect(toast.success).toHaveBeenCalledWith(
    successMessage,
    expect.objectContaining({
      richColors: true,
    }),
  );
});
