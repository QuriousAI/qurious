import { NextStep, Step } from "nextstepjs";
import { ShadcnDarkModeCard } from "./card";

const steps: Step[] = [
  {
    icon: "🤖",
    title: "Hi, I'm QuriousBot.",
    content: "Let me show you around the app.",
    showControls: true,
    showSkip: true,
  },
  {
    icon: "🤖",
    title: "Search Bar",
    content:
      "This is the search bar. Use it to search whatever you're interested in.",
    selector: "#tour-search-bar",
    showControls: true,
    showSkip: true,
    nextRoute: "/search?q=Generative+AI",
  },
  {
    icon: "🤖",
    title: "Search Result",
    content: "Your results",
    selector: "#tour-relavant-papers",
    showControls: true,
    showSkip: true,
  },
  {
    icon: "🤖",
    title: "Search Result",
    content: "paper",
    selector: "#tour-paper-card",
    showControls: true,
    showSkip: true,
  },
  {
    icon: "🤖",
    title: "Help Center",
    content: "If you have any doubts, you can check out the help center.",
    selector: "#tour-help-icon",
    showControls: true,
    showSkip: true,
    side: "bottom-right",
  },
];

export const OnboardingSteps = ({ children }) => (
  <NextStep
    steps={[{ tour: "tour-1", steps: steps }]}
    cardComponent={ShadcnDarkModeCard}
  >
    {children}
  </NextStep>
);
