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
    return <div>Loading references...</div>;
  }

  if (!references) {
    return <div>No references found~!</div>;
  }

  console.log(references);

  return (
    <div className="">
      <div className="mt-2 flex flex-col gap-4">
        {references.data.map((r, i) => (
          //   <ReferenceTabCard reference={r} key={i} />
          <PaperCard
            paper={r.citedPaper}
            resultIndex={i + 1}
            authenticated={false}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
