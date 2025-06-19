const sidebarNoSearchPlaceholders: string[] = [
    "And in the beginning, there was a search bar.",
    "Crickets... just crickets.",
    "No searches yet. A mind unburdened by curiosity?",
    "Even the void is searchable... eventually.",
    "You haven't searched anything. A true Zen master.",
    "Nothing here. A clean slate, or a missed opportunity?",
    "If a user never searches, did the search bar ever exist?",
    "The database is silent. Like your DMs.",
    "Not even a whisper of inquiry. Just... 🦗",
    "The journey of a thousand queries begins with a single keystroke.",
    "No search history. Are you enlightened or just lazy?",
    "The emptiness you feel is your search history.",
    "History is written by those who search.",
    "You either die a hero or live long enough to type something in here.",
    "The search bar stares back into you.",
    "Free your mind. And maybe try a search?",
    "You've asked nothing. The silence is profound.",
  ];
  
  export function getRandomSidebarNoSearchPlaceholder(): string {
    const index = Math.floor(Math.random() * sidebarNoSearchPlaceholders.length);
    return sidebarNoSearchPlaceholders[index];
  }
  