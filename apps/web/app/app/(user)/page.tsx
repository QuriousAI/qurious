"use client";

import { getRandomGroupedQuestions } from "@/utils/questions";
import { SearchBar } from "@/components/search-bar";
import { APP_CONTENT, APP_NAME } from "@workspace/design-system/content";
// import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SearchCard } from "@/components/cards";
import { motion } from "motion/react";

export default function Home() {
  const genericTopics = getRandomGroupedQuestions();
  const hasOnboarded = false;

  function getRandomGreeting() {
    const greetings = [
      "Ready to help. What's on your mind?",
      "How can I assist you today?",
      "Ask me anything. I'm here to help!",
      "What would you like to explore today?",
      "Your curiosity is my command.",
      "Looking for answers? Let's dive in.",
      "How can I make your search easier?",
      "Hi! Need info or inspiration?",
      "Ready when you are. What's your question?",
      "Here to assist—just type your query.",
      "What knowledge can I unlock for you today?",
      "Let's find what you're looking for.",
      "How can I support your research?",
      "What topic intrigues you today?",
      "Need a hand? Ask away!",
      "Your personal research assistant is here.",
      "Curious? So am I. Let's explore.",
      "What's the next question?",
      "Hit me with your biggest wonder.",
      "I'm listening. How can I help?",
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
          {APP_CONTENT["/home"].trySearchingAbout}
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
