import { getRandomGroupedQuestions } from "@/utils/questions";
import { SearchBar } from "@/components/search-bar";
import { APP_CONTENT, APP_NAME } from "@workspace/design-system/content";
// import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SearchCard } from "@/components/cards";

export const metadata = {
  title: "Home | Qurious",
};

const Icon = () => (
  <div className="flex items-center justify-center">
    <div className="size-40 bg-radial-[at_25%_25%] bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-3xl shadow-2xl flex items-center justify-center">
      <div className="bg-gradient-to-tl drop-shadow-blue-600 from-blue-400 to-blue-600 brightness-125 inline-block text-transparent bg-clip-text text-9xl font-bold drop-shadow-xl/10">
        Q
      </div>
    </div>
  </div>
);

export default function Home() {
  const genericTopics = getRandomGroupedQuestions();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* <Onboarder /> */}

      {/* <DownloadLogo /> */}

      <div className="flex w-full flex-col items-center justify-center gap-6 h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-medium">
            {/* <Authenticated>
              {APP_CONTENT["/home"].lead(user.user?.firstName)}
            </Authenticated> */}
            {/* <Unauthenticated>{APP_CONTENT["/home"].lead()}</Unauthenticated>
            <AuthLoading>{APP_CONTENT["/home"].lead()}</AuthLoading> */}
            Welcome.
          </div>
        </div>

        <SearchBar />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="text-muted-foreground text-lg">
          {APP_CONTENT["/home"].trySearchingAbout}
        </div>
        {/* The generic topics */}
        <div className="flex flex-col gap-12 w-19/20">
          {genericTopics.map((topic) => (
            <div className="flex flex-col gap-2">
              <div className="font-medium pl-2">{topic.topic}</div>
              <div className="flex flex-col gap-2">
                {topic.questions.map((question, i) => (
                  <SearchCard
                    key={i}
                    questionEmoji={question.emoji}
                    questionText={question.question}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
