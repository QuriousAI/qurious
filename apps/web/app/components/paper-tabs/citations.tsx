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
    return <div>Loading citations...</div>;
  }

  if (!citations) {
    return <div>No citations found~!</div>;
  }

  return (
    <div className="">
      <div className="mt-2 flex flex-col gap-4">
        {citations.data.map((c, i) => (
          <PaperCard
            paper={c.citingPaper}
            resultIndex={i + 1}
            authenticated={false}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
