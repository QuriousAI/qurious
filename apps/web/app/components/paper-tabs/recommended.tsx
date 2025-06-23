import { useGetPaperRecommendationsQuery } from "@/queries";
import { PaperCard } from "../cards";

export const RecommendedTabContent = (props: { paperId: string }) => {
  const {
    data: recommendations,
    isLoading,
    error,
  } = useGetPaperRecommendationsQuery({
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

  if (error) {
    return `Error: ${error}`;
  }

  console.log(recommendations);

  if (recommendations.recommendedPapers.length === 0) {
    return <div>No recommendations found~!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {recommendations.recommendedPapers.map((paper, i) => (
        <PaperCard paper={paper} resultIndex={i + 1} key={i} />
      ))}
    </div>
  );
};
