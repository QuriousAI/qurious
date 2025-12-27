import { getRandomGroupedQuestions } from "@/utils/questions";
import { SearchBar } from "@/components/search-bar";
import { APP_CONTENT, APP_NAME } from "@workspace/design-system/content";
// import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SearchCard } from "@/components/cards";

export const metadata = {
  title: "Home | Qurious",
};

export default function Home() {
  const genericTopics = getRandomGroupedQuestions();
  const hasOnboarded = false;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* {!hasOnboarded && <Onboarder />} */}

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
