"use client";

import * as React from "react";
import { Text } from "@workspace/design-system/icons";
import { useFont } from "@workspace/design-system/providers/font-provider";

import { Button } from "@workspace/design-system/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/design-system/components/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";

export function FontToggle() {
  const { font, setFont } = useFont();

  return (
    <Tooltip>
      <TooltipTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Text
                strokeWidth={2.8}
                className="h-[1.2rem] w-[1.2rem]"
              />
              <span className="sr-only">Toggle font</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => setFont("sans")}
              className={font === "sans" ? "bg-accent" : ""}
            >
              Sans
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setFont("mono")}
              className={font === "mono" ? "bg-accent" : ""}
            >
              Mono
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>Font Family</TooltipContent>
    </Tooltip>
  );
}
