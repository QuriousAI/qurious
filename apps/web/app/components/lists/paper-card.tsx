"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { Unauthenticated } from "convex/react";
import { useGetCurrentUserFoldersQuery } from "@/queries";
import { type Paper } from "@workspace/semantic-scholar/src";
import { PaperCard } from "@/components/cards/paper";

function PaperCards(props: { papers: Paper[] }) {
  const { data: folders, isPending, error } = useGetCurrentUserFoldersQuery();

  if (isPending) {
    return <div className="">Loading folders...</div>;
  }

  if (error) {
    return <div className="">Folders error: {error.message}</div>;
  }

  return props.papers.map((paper, i) => (
    <PaperCard
      authenticated={true}
      paper={paper}
      folders={folders}
      resultIndex={i + 1}
      key={i}
    />
  ));
}

export const RelevantPapersContent = (props: { papers: Paper[] }) => {
  return (
    <div className="flex flex-col gap-6">
      <Authenticated>
        <PaperCards papers={props.papers} />
      </Authenticated>
      <Unauthenticated>
        {props.papers.map((paper, i) => (
          <PaperCard
            authenticated={false}
            paper={paper}
            resultIndex={i + 1}
            key={i}
          />
        ))}
      </Unauthenticated>
      <AuthLoading>Loading user authentication status...</AuthLoading>
    </div>
  );
};
