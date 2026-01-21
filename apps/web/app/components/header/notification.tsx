import { Button } from "@workspace/design-system/components/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";
import { CircleHelp } from "@workspace/design-system/icons";

// TODO: Implement notification functionality
// Note: This component is currently a placeholder for future notification features
export const Notification = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      id="tour-help-icon"
    >
      <Tooltip>
        <TooltipTrigger>
          <Link target="_blank" href="/help">
            <CircleHelp className="size-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
    </Button>
  );
};
