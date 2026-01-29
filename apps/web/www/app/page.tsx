"use client";

import SearchBar from "@/components/search-bar";
import { APP_NAME } from "@workspace/design-system/content";
import { Button } from "@workspace/design-system/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import Link from "next/link";
import { Spotlight } from "@workspace/design-system/components/motion-primitives/spotlight";
import { TextEffect } from "@workspace/design-system/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@workspace/design-system/components/motion-primitives/animated-group";
import {
  FileText,
  Folders,
  Search,
  UserCog,
} from "@workspace/design-system/icons";
import { ReviewSlider } from "@/components/review-slider";
import { questionGridList } from "@/utils/placeholders/questions";
import { AnimatedBeamDemo } from "@/components/features-beam";
import { CallToAction } from "@/components/call-to-action";
import { TAILWIND_GRADIENT_TEXT } from "@/utils/tailwind-gradient";
import { cn } from "@workspace/design-system/lib/utils";
import type { ReactNode } from "react";
import { motion } from "motion/react";

const FeatureCard = (props: {
  icon: ReactNode;
  title: string;
  description: string;
  className: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Card
      className={cn(
        "relative p-[3px] bg-card/25 col-span-3 transition-shadow duration-300 hover:shadow-lg hover:shadow-amber-500/10",
        props.className,
      )}
    >
      <Spotlight className="bg-amber-200/25 blur-3xl " />
      <Card className="relative h-full border-none shadow-none bg-card/25">
        <Spotlight
          className="bg-amber-400/25 blur-3xl"
          size={40}
          springOptions={{
            bounce: 0.3,
            duration: 0.1,
          }}
        />
        <CardHeader>
          <CardTitle className="pb-4">
            <Button
              size="icon"
              className="p-10 group dark:hover:bg-transparent"
              variant="ghost"
            >
              {props.icon}
            </Button>
          </CardTitle>
          <CardDescription className="text-base">
            <div className="text-white font-semibold text-lg">
              {props.title}
            </div>
            <div className="">{props.description}</div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Card>
  </motion.div>
);

const features = [
  {
    icon: (
      <Search className="size-14 text-neutral-400 group-hover:text-neutral-200 duration-300 transition-colors" />
    ),
    title: "Smarter Search",
    description:
      "AI summaries, powerful filters, and sorting to surface what matters.",
    className: "col-span-1",
  },
  {
    icon: (
      <FileText className="size-14 text-neutral-400 group-hover:text-neutral-200 duration-300 transition-colors" />
    ),
    title: "Paper Insights",
    description: "Chat with papers, explore paper graphs and visual context.",
    className: "col-span-2",
  },
  {
    icon: (
      <Folders className="size-14 text-neutral-400 group-hover:text-neutral-200 duration-300 transition-colors" />
    ),
    title: "Collaborative Folders",
    description: "Take notes, organize research, and share with your peers.",
    className: "col-span-2",
  },
  {
    icon: (
      <UserCog className="size-14 text-neutral-400 group-hover:text-neutral-200 duration-300 transition-colors" />
    ),
    title: "Customization",
    description:
      "Personalize your experience with user details and summary preferences.",
    className: "col-span-1",
  },
];

function HeroHeadings() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <TextEffect
        per="char"
        speedReveal={1.5}
        speedSegment={0.8}
        className={`text-8xl font-extrabold ${TAILWIND_GRADIENT_TEXT}`}
      >
        {APP_NAME}
      </TextEffect>
      <AnimatedGroup
        preset="blur-slide"
        className="flex gap-3 text-center text-2xl font-bold opacity-80"
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
              },
            },
          },
        }}
      >
        <div>Search Engine.</div>
        <div>Paper Insights.</div>
        <div>Collaborative Folders.</div>
      </AnimatedGroup>
      <TextEffect
        per="word"
        preset="fade-in-blur"
        delay={0.8}
        className="text-xl text-muted-foreground"
      >
        A research toolkit for the modern age.
      </TextEffect>
    </motion.div>
  );
}

function QuestionGrid() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <div className="font-medium text-neutral-400">
        Not sure what to search? Here's an idea…
      </div>
      <AnimatedGroup
        preset="scale"
        className="grid w-fit justify-items-center gap-4 md:grid-cols-2"
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          },
        }}
      >
        {questionGridList.map((val, i) => (
          <Button
            key={i}
            variant={"secondary"}
            asChild
            className="bg-secondary/50 w-xs py-6 font-normal hover:scale-105 transition-transform"
          >
            <Link
              href={`/search?q=${val.questionText}`}
              className="flex items-center justify-between gap-2"
            >
              <div className="text-base">{val.questionEmoji}</div>
              <div className="">{val.questionText}</div>
            </Link>
          </Button>
        ))}
      </AnimatedGroup>
    </motion.div>
  );
}

const VideoBox = () => {
  return (
    <motion.div
      className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Link
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        className="flex h-full w-full items-center justify-center"
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-neutral-400"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="text-4xl">▶️</div>
          <div className="text-sm">Watch our quick demo</div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Section wrapper with scroll-triggered animation
const AnimatedSection = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

// Animated section heading
const SectionHeading = ({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) => (
  <TextEffect
    per="word"
    // preset="fade-"
    delay={delay}
    className={`text-6xl font-bold self-center ${TAILWIND_GRADIENT_TEXT}`}
  >
    {children}
  </TextEffect>
);

export default function Home() {
  return (
    <div className="flex flex-col gap-40 max-w-7xl px-6 pb-40">
      <motion.div
        className="flex flex-col items-center justify-center gap-12 h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <HeroHeadings />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <SearchBar />
        </motion.div>
        <QuestionGrid />
      </motion.div>

      {/* <AnimatedSection className="flex flex-col items-center gap-10">
        <SectionHeading>At a Glance.</SectionHeading>
        <VideoBox />
      </AnimatedSection> */}

      <AnimatedSection className="flex flex-col gap-10">
        <SectionHeading>Why Qurious?</SectionHeading>
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={feature.className}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        {/* <AnimatedBeamDemo /> */}
      </AnimatedSection>

      <AnimatedSection className="flex flex-col gap-10">
        <SectionHeading>People *hate* us.</SectionHeading>
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ReviewSlider direction="left-to-right" />
          <ReviewSlider direction="right-to-left" />
        </motion.div>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CallToAction />
      </motion.div>
    </div>
  );
}
