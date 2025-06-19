import SearchBar from "@/components/search-bar";
import { APP_NAME } from "@workspace/ui/src/content";
import { Button } from "@workspace/ui/src/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/src/components/card";
import Link from "next/link";
import { Spotlight } from "@workspace/ui/src/components/motion-primitives/spotlight";
import {
  FileText,
  Folders,
  Search,
  UserCog,
} from "@workspace/ui/src/iconography";
import { ReviewSlider } from "@/components/review-slider";
import { questionGridList } from "@/utils/placeholders/questions";
import { AnimatedBeamDemo } from "@/components/features-beam";
import { CallToAction } from "@/components/call-to-action";
import { TAILWIND_GRADIENT_TEXT } from "@/utils/tailwind-gradient";
import { cn } from "@workspace/ui/src/lib/utils";
import type { ReactNode } from "react";

const FeatureCard = (props: {
  icon: ReactNode;
  title: string;
  description: string;
  className: string;
}) => (
  <Card
    className={cn(
      "relative p-[3px] bg-card/25 border-none col-span-3",
      props.className
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
          <div className="text-white font-semibold text-lg">{props.title}</div>
          <div className="">{props.description}</div>
        </CardDescription>
      </CardHeader>
    </Card>
  </Card>
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
    <div className="flex flex-col items-center justify-center gap-1">
      <div className={`text-8xl font-extrabold ${TAILWIND_GRADIENT_TEXT}`}>
        {APP_NAME}
      </div>
      <div className="flex gap-3 text-center text-2xl font-bold opacity-80">
        <div>Search Engine.</div>
        <div>Paper Insights.</div>
        <div>Collaborative Folders.</div>
      </div>
      <div className="text-xl text-muted-foreground">
        A research toolkit for the modern age.
      </div>
    </div>
  );
}

function QuestionGrid() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-medium text-neutral-400">
        Not sure what to search? Here's an idea…
      </div>
      <div className="grid w-fit justify-items-center gap-4 md:grid-cols-2">
        {questionGridList.map((val, i) => (
          <Button
            key={i}
            variant={"secondary"}
            asChild
            className="bg-secondary/50 w-xs py-6 font-normal"
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
      </div>
    </div>
  );
}

const VideoBox = () => {
  return (
    <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
      <Link
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
        className="flex h-full w-full items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-neutral-400">
          <div className="text-4xl">▶️</div>
          <div className="text-sm">Watch our quick demo</div>
        </div>
      </Link>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-40 max-w-7xl px-6 pb-40">
      <div className="flex flex-col items-center justify-center gap-12 h-[80vh]">
        <HeroHeadings />
        <SearchBar />
        <QuestionGrid />
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className={`text-6xl font-bold ${TAILWIND_GRADIENT_TEXT}`}>
          At a Glance.
        </div>
        <VideoBox />
      </div>

      <div className="flex flex-col gap-10">
        <div
          className={`text-6xl font-bold self-center ${TAILWIND_GRADIENT_TEXT}`}
        >
          Why Qurious?
        </div>
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </div>
        {/* <AnimatedBeamDemo /> */}
      </div>

      <div className="flex flex-col gap-10">
        <div
          className={`text-6xl font-bold self-center ${TAILWIND_GRADIENT_TEXT}`}
        >
          People *hate* us.
        </div>
        <div className="flex flex-col gap-4">
          <ReviewSlider direction="left-to-right" />
          <ReviewSlider direction="right-to-left" />
        </div>
      </div>

      <CallToAction />
    </div>
  );
}
