import { SearchCard } from "../cards";

export const SearchCardList = (props: {
  questions: {
    emoji?: string;
    question: string;
  }[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {props.questions.map((question) => (
        <SearchCard
          questionEmoji={question.emoji}
          questionText={question.question}
        />
      ))}
    </div>
  );
};
