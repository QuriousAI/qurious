import { PaperComponent } from "./client";
import { api } from "@workspace/backend/convex/_generated/api";
import { Skeleton } from "@workspace/ui/src/components/skeleton";
import { fetchAction } from "convex/nextjs";
import { Suspense } from "react";

type Props = {
  params?: Promise<{
    id?: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  try {
    const paper = await fetchAction(
      api.externalActions.semanticScholar.paperDetails.getPaperDetails,
      {
        paperId: id,
        // Note - we're fetching all these fields on purpose so that this triggers the cache hit when we fetch paper details
        fields: [
          "title",
          "authors",
          "publicationDate",
          "year",
          "tldr",
          "abstract",
          "citationCount",
          "influentialCitationCount",
          "referenceCount",
          "paperId",
          "referenceCount",
          "externalIds",
        ],
      }
    );

    return {
      title: `${paper.title} | Paper | Qurious`,
    };
  } catch (e) {
    console.error({ e });
    return { title: "Paper | Qurious" };
  }
}

export default async function PaperPage(props: Props) {
  const params = await props.params;

  const { id } = params;

  return <PaperComponent id={id} />;
}
