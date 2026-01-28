import { Button } from "@workspace/design-system/components/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";
import { CircleHelp } from "@workspace/design-system/icons";
import { env } from "@/env";

export const Help = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      id="tour-help-icon"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link target="_blank" href={env.NEXT_PUBLIC_WEB_HELP_URL ?? ""}>
            <CircleHelp className="size-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
    </Button>
  );
};
