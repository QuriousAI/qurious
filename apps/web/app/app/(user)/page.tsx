"use client";

import { getRandomGroupedQuestions } from "@/utils/questions";
import { SearchBar } from "@/components/search-bar";
import { SearchCard } from "@/components/cards";
import { motion } from "motion/react";

export default function Home() {
  const genericTopics = getRandomGroupedQuestions();
  const hasOnboarded = false;

  function getRandomGreeting() {
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
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center justify-center gap-6 h-[75vh]">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="text-4xl font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {getRandomGreeting()}
          </motion.div>
        </motion.div>

        <SearchBar />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <motion.div
          className="text-muted-foreground font-medium underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          (╹ o╹) Try searching about...
        </motion.div>
        {/* The generic topics */}
        <motion.div
          className="flex flex-col gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {genericTopics.map((topic, topicIndex) => (
            <motion.div
              key={topicIndex}
              className="flex flex-col gap-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="font-semibold pl-2">{topic.topic}</div>
              <motion.div
                className="flex flex-col gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {topic.questions.map((question, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <SearchCard
                      questionEmoji={question.emoji}
                      questionText={question.question}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
