import { fetchQuery } from "convex/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { createMetadata } from "@workspace/seo/metadata";
import { FolderLayoutClient } from "./client";

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
    const folder = await fetchQuery(api.folders.queries.getFolderById, {
      folderId: id as Id<"folders">,
    });

    return createMetadata({
      title: `${folder.name} | Folder`,
      description: `View and manage papers and searches in the ${folder.name} folder`,
    });
  } catch {
    return createMetadata({
      title: "Folder",
      description: "View and manage papers and searches in this folder",
    });
  }
}

export default async function FolderLayout({ params, children }: Props) {
  const { id } = await params;

  return <FolderLayoutClient folderId={id}>{children}</FolderLayoutClient>;
}
