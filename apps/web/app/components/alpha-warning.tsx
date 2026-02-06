"use client";

import { env } from "@/env";
import { Button } from "@workspace/design-system/components/button";
import { SquareArrowOutUpRight, XIcon } from "@workspace/design-system/icons";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "react-use";

export const AlphaWarning = () => {
  const [dismissedAlphaWarning, setDismissedAlphaWarning] = useLocalStorage(
    "dismissedAlphaWarning",
    false,
  );

  if (dismissedAlphaWarning) {
    return null;
  }

  return (
    <div className="absolute top-0 z-200 w-full bg-amber-900/75 flex items-center justify-between text-sm text-amber-500">
      <div />

      <div className="flex gap-1">
        This is a pre-alpha version. Features may not work as expected and are
        bound to break. Report any bugs on the{" "}
        <Link
          href={env.NEXT_PUBLIC_DISCORD_URL ?? "#"}
          target="_blank"
          className="flex items-center gap-1 underline underline-offset-2"
        >
          Discord
          <SquareArrowOutUpRight className="size-4" />
        </Link>
        .
      </div>

      <Button
        variant="ghost"
        size={"icon"}
        onClick={() => setDismissedAlphaWarning(true)}
      >
        <span className="sr-only">Dismiss</span>
        <XIcon className="size-4" />
      </Button>
    </div>
  );
};
