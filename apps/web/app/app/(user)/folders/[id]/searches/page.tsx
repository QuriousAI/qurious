import { SearchesPage } from "../client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FolderSearchesPage({ params }: Props) {
  const { id } = await params;

  return <SearchesPage folderId={id} />;
}
