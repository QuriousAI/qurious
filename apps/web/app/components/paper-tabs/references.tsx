import { useGetPaperReferencesQuery } from "@/queries";
import { PaperCard } from "../cards";

export const ReferencesTabContent = (props: { paperId: string }) => {
  const { data: references, isLoading } = useGetPaperReferencesQuery({
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
    return "Loading references...";
  }

  if (references.data.length === 0) {
    return "No references found~!";
  }

  return (
    <div className="flex flex-col gap-4">
      {references.data.map((r, i) => (
        <PaperCard paper={r.citedPaper} resultIndex={i + 1} key={i} />
      ))}
    </div>
  );
};
