"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

export const RandomGreeting = () => {
  const randomGreeting = useMemo(() => {
    const greetings = [
      "Ready to help. What's on your mind?",
      "How can Qurious assist you today?",
      "Ask anything. Help is ready!",
      "What would you like to explore today?",
      "Your curiosity drives discovery here.",
      "Looking for answers? Let's dive in.",
      "How can your search be made easier?",
      "Hi! Need info or inspiration?",
      "Ready when you are. What's your question?",
      "What knowledge can be unlocked for you today?",
      "Let's find what you're looking for.",
      "How can research be supported today?",
      "What topic is intriguing today?",
      "Need a hand? Ask away!",
      "A helpful research assistant at your service.",
      "Feeling curious? Time to explore.",
      "What's the next question?",
      "Share your biggest wonder.",
      "Listening for your next question. How can help be provided?",
      `What's on your mind today?`,
      `A good place to begin.`,
      `Where would you like to start?`,
      `Take a moment to think.`,
      `Just start typing.`,
      `Start anywhere.`,
      `Capture the thought.`,
      `Something worth exploring?`,
      `What feels important right now?`,
      `Type to begin.`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }, []);
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="text-4xl font-medium text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {randomGreeting}
      </motion.div>
    </motion.div>
  );
};
