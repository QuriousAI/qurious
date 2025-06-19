import { FolderClientComponent } from "./client";
import { fetchQuery } from "convex/nextjs";
import { api } from "@workspace/backend/convex/_generated/api";
import {} from "@clerk/nextjs";

type Props = {
  params?: Promise<{
    id?: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  try {
    const folder = await fetchQuery(api.folders.queries.getFolderById, {
      folderId: id,
    });

    return {
      title: `${folder.name} | Folder | Qurious`,
    };
  } catch {
    return { title: "Folder | Qurious" };
  }
}

export default async function FolderPage(props: Props) {
  const params = await props.params;

  const { id } = params;

  return <FolderClientComponent folderId={id} />;
}
