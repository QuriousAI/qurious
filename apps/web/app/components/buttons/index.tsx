import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@workspace/design-system/components/tooltip";
import { Button } from "@workspace/design-system/components/button";
import { toast } from "@workspace/design-system/components/sonner";
import { useCopyToClipboard } from "react-use";
import { Clipboard, Share2 } from "@workspace/design-system/icons";

export const CopyToClipboardButtonWithTooltip = (props: {
  textToCopy: string;
  tooltipContent: string;
  onCopySuccessMessage: string;
  buttonIcon: "share" | "copy";
}) => (
  <Tooltip>
    <TooltipTrigger>
      <CopyToClipboardButton
        textToCopy={props.textToCopy}
        onCopySuccessMessage={props.onCopySuccessMessage}
        buttonIcon={props.buttonIcon}
      />
    </TooltipTrigger>
    <TooltipContent>{props.tooltipContent}</TooltipContent>
  </Tooltip>
);

export const CopyToClipboardButton = (props: {
  textToCopy: string;
  onCopySuccessMessage: string;
  buttonIcon: "share" | "copy";
}) => {
  const [_, copyToClipboard] = useCopyToClipboard();

  const copyToClipboardOnClick = () => {
    copyToClipboard(props.textToCopy);
    toast.success(props.onCopySuccessMessage, {
      richColors: true,
    });
  };

  const icon = props.buttonIcon === "share" ? <Share2 /> : <Clipboard />;

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboardOnClick}>
      {icon}
    </Button>
  );
};
