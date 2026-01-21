"use client";

import { useGetPaperRecommendationsQuery } from "@/queries";
import { PaperCard } from "@/components/cards";
import { useParams } from "next/navigation";
import { Skeleton } from "@workspace/design-system/components/skeleton";

export default function RecommendedPage() {
  const params = useParams<{ id: string }>();
  const paperId = params.id;

  const {
    data: recommendations,
    isLoading,
    error,
  } = useGetPaperRecommendationsQuery({
    paperId,
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
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
    return (
      <div className="text-destructive">
        Error loading recommendations: {error.message}
      </div>
    );
  }

  if (!recommendations || recommendations.recommendedPapers.length === 0) {
    return (
      <div className="text-muted-foreground">No recommendations found.</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        Recommended Papers ({recommendations.recommendedPapers.length})
      </h2>
      {recommendations.recommendedPapers.map((paper, i) => (
        <PaperCard paper={paper} resultIndex={i + 1} key={paper.paperId || i} />
      ))}
    </div>
  );
}
