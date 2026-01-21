"use client";

import { useGetPaperCitationsQuery } from "@/queries";
import { PaperCard } from "@/components/cards";
import { useParams } from "next/navigation";
import { Skeleton } from "@workspace/design-system/components/skeleton";

export default function CitationsPage() {
  const params = useParams<{ id: string }>();
  const paperId = params.id;

  const {
    data: citations,
    isLoading,
    error,
  } = useGetPaperCitationsQuery({
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
        Error loading citations: {error.message}
      </div>
    );
  }

  if (!citations || citations.data.length === 0) {
    return <div className="text-muted-foreground">No citations found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        Citations ({citations.data.length})
      </h2>
      {citations.data.map((c, i) => (
        <PaperCard
          paper={c.citingPaper}
          resultIndex={i + 1}
          key={c.citingPaper?.paperId || i}
        />
      ))}
    </div>
  );
}
