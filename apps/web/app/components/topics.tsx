"use client";

import { getRandomGroupedQuestions } from "@/utils/questions";
import { motion } from "motion/react";
import { SearchCard } from "./cards";
import { useMemo } from "react";

export const GenericTopics = () => {
  const genericTopics = useMemo(() => getRandomGroupedQuestions(), []);

  return (
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
  );
};
