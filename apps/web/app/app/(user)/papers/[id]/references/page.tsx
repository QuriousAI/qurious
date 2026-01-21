"use client";

import { useGetPaperReferencesQuery } from "@/queries";
import { PaperCard } from "@/components/cards";
import { useParams } from "next/navigation";
import { Skeleton } from "@workspace/design-system/components/skeleton";

export default function ReferencesPage() {
  const params = useParams<{ id: string }>();
  const paperId = params.id;

  const {
    data: references,
    isLoading,
    error,
  } = useGetPaperReferencesQuery({
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
        Error loading references: {error.message}
      </div>
    );
  }

  if (!references || references.data.length === 0) {
    return <div className="text-muted-foreground">No references found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        References ({references.data.length})
      </h2>
      {references.data.map((r, i) => (
        <PaperCard
          paper={r.citedPaper}
          resultIndex={i + 1}
          key={r.citedPaper?.paperId || i}
        />
      ))}
    </div>
  );
}
