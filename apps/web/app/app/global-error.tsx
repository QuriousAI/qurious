"use client";

import "@workspace/design-system/styles/globals.css";
import { useEffect } from "react";
import { Button } from "@workspace/design-system/components/button";
import {
  RotateCcw,
  AlertTriangle,
  Discord,
  Github,
} from "@workspace/design-system/icons";
import { GeistSans, GeistMono } from "@workspace/design-system/font";
import { ThemeProvider } from "@workspace/design-system/providers/theme-provider";
import { env } from "@/env";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground font-sans">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">
              <div className="flex items-center justify-center size-20 rounded-full bg-destructive/10">
                <AlertTriangle className="size-10 text-destructive" />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Something went wrong
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">
                  An unexpected error occurred. Please try again or contact
                  support if the problem persists.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  onClick={reset}
                  size="lg"
                  variant="default"
                  className="gap-2"
                >
                  <RotateCcw className="size-4" />
                  Try Again
                </Button>

                <div className="flex gap-3">
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <a
                      href={env.NEXT_PUBLIC_DISCORD_URL ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Discord className="size-4" />
                      Report on Discord
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <a
                      href="https://github.com/QuriousAI/qurious/issues/new"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      Report on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
