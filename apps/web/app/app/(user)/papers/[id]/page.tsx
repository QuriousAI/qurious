import { OverviewPage } from "./client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PaperOverviewPage({ params }: Props) {
  const { id } = await params;

  return <OverviewPage paperId={id} />;
}
