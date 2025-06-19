import questions from "./questions.json";

export const getRandomQuestions = (limit: number = 10) => {
  return questions.sort(() => Math.random() - 0.5).slice(0, limit);
};

export const getRandomGroupedQuestions = (): {
  topic: string;
  questions: { question: string; emoji: string }[];
}[] => {
  // First shuffle all questions
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  // Then group them by topic
  const groupedByTopic = shuffledQuestions.reduce(
    (acc, question) => {
      acc[question.topic] = [...(acc[question.topic] || []), question];
      return acc;
    },
    {} as Record<string, typeof questions>
  );

  // Convert the grouped object into the expected array format
  return Object.entries(groupedByTopic).map(([topic, questions]) => ({
    topic,
    questions: questions.map(({ question, emoji }) => ({ question, emoji })),
  }));
};
