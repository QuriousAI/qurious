import { PapersPage } from "../client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FolderPapersPage({ params }: Props) {
  const { id } = await params;

  return <PapersPage folderId={id} />;
}
