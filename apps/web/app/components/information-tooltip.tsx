import { CircleHelp } from "@workspace/ui/src/iconography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";

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
