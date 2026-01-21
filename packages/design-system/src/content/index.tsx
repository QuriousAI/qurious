export const APP_NAME = "Qurious";
export const APP_DESCRIPTION = "A research tool for the AI age.";

// Legal page constants
export const LEGAL_CONFIG = {
  lastUpdated: "January 21, 2026",
  contactEmail: "admin@quriousai.xyz",
  privacyEmail: "admin@quriousai.xyz",
} as const;

export const APP_CONTENT = {
  "/home": {
    lead(user?: string) {
      const name = user ? `${user}, ` : "";
      const messages = [
        `${name}What's on your mind today?`,
        `${name}A good place to begin.`,
        `${name}Where would you like to start?`,
        `${name}Take a moment to think.`,
        `${name}Just start typing.`,
        `${name}Start anywhere.`,
        `${name}Capture the thought.`,
        `${name}Something worth exploring?`,
        `${name}What feels important right now?`,
        `${name}Type to begin.`,
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
    trySearchingAbout: "(╹ o╹) Try searching about...",
  },
  unauthenticatedSidebar: {
    title: "Join Qurious.",
    lead: "Supercharge your research workflow.",
    features: [
      "Chat with papers, get instant insights.",
      "225M+ research papers.",
      "AI-powered search engine.",
      "Save, annotate, and organize papers into folders.",
      "Tons more features added ",
    ],
    signUpButton: "Get Started",
  },
};
