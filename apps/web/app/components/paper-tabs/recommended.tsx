import { useGetPaperRecommendationsQuery } from "@/queries";
import { PaperCard } from "../cards";

export const RecommendedTabContent = (props: { paperId: string }) => {
  const { data: recommendations, isLoading } = useGetPaperRecommendationsQuery({
    paperId: props.paperId,
    fields: [
      "title",
      "abstract",
      "authors",
      "year",
      "citationCount",
      "openAccessPdf",
      "url",
      "venue",
      "publicationTypes",
      "fieldsOfStudy",
    ],
  });

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (!recommendations) {
    return <div>No recommendations found~!</div>;
  }

  console.log(recommendations);

  return (
    <div className="">
      <div className="mt-2 flex flex-col gap-4">
        {recommendations.recommendedPapers.map((paper, i) => (
          <PaperCard
            paper={paper}
            resultIndex={i + 1}
            authenticated={false}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
