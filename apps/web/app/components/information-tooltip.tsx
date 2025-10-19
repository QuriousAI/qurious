import { CircleHelp } from "@workspace/design-system/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";

export const InformationTooltip = ({ content }: { content: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleHelp className="size-4 text-neutral-400" />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};
