import { Button } from "@workspace/ui/src/components/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";
import { CircleHelp } from "@workspace/ui/src/iconography";

export const Help = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      id="tour-help-icon"
    >
      <Tooltip>
        <TooltipTrigger>
          <Link target="_blank" href="http://localhost:3000">
            <CircleHelp className="size-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
    </Button>
  );
};
