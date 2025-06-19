"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@workspace/ui/src/lib/utils";
import { AnimatedBeam } from "@workspace/ui/src/components/magicui/animated-beam";
import { User } from "@workspace/ui/src/iconography";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const quriousRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const semanticScholarRef = useRef<HTMLDivElement>(null);
  const obsidianRef = useRef<HTMLDivElement>(null);
  const zoteroRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex self-center gap-4">
          <Circle ref={aiRef}>
            <span className="text-black">AI</span>
          </Circle>
          <Circle ref={semanticScholarRef}>
            <span className="text-black">SS</span>
          </Circle>
        </div>

        <div className="flex items-center justify-between">
          <Circle ref={userRef}>
            <User color="black" />
          </Circle>

          <Circle ref={quriousRef} className="size-16">
            <span className="text-black text-5xl font-semibold">Q</span>
          </Circle>
          <div className="flex flex-col gap-4">
            <Circle ref={obsidianRef}>
              <span className="text-black">Ob</span>
            </Circle>
            <Circle ref={zoteroRef}>
              <span className="text-black">Zot</span>
            </Circle>
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={quriousRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={quriousRef}
        toRef={semanticScholarRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={quriousRef}
        toRef={aiRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={quriousRef}
        toRef={obsidianRef}
        startYOffset={-2.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={quriousRef}
        toRef={zoteroRef}
        startYOffset={2.5}
      />
    </div>
  );
}
