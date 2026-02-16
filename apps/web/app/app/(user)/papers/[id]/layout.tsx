import { api } from "@workspace/backend/_generated/api";
import { fetchAction } from "convex/nextjs";
import { createMetadata } from "@workspace/seo/metadata";
import { PaperLayoutClient } from "./client";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
      },
    );

    return createMetadata({
      title: `${paper.title} | Paper`,
      description:
        paper.tldr?.text || paper.abstract || "View paper details on Qurious",
    });
  } catch {
    return createMetadata({
      title: "Paper",
      description: "View paper details on Qurious",
    });
  }
}

export default async function PaperLayout({ params, children }: Props) {
  const { id } = await params;

  return <PaperLayoutClient paperId={id}>{children}</PaperLayoutClient>;
}
