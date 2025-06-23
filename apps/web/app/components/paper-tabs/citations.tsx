import { useGetPaperCitationsQuery } from "@/queries";
import { PaperCard } from "../cards";

export const CitationsTabContent = (props: { paperId: string }) => {
  const { data: citations, isLoading } = useGetPaperCitationsQuery({
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
    return "Loading citations...";
  }

  if (citations.data.length === 0) {
    return "No citations found~!";
  }

  return (
    <div className="flex flex-col gap-4">
      {citations.data.map((c, i) => (
        <PaperCard paper={c.citingPaper} resultIndex={i + 1} key={i} />
      ))}
    </div>
  );
};
