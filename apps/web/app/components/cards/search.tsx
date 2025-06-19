"use client";

import { Card, CardContent } from "@workspace/ui/src/components/card";
import Link from "next/link";
import { Search } from "@workspace/ui/src/iconography";
import { useCreateSearchMutation } from "@/queries";

export const SearchCard = (props: {
  questionText: string;
  questionEmoji?: string;
}) => {
  const { mutateAsync: createSearch } = useCreateSearchMutation();

  return (
    <Card className="py-2 transition hover:brightness-120 border">
      <CardContent className="px-4">
        <Link
          href={`/search?q=${props.questionText}`}
          className="flex items-center justify-between gap-2"
          onClick={() => createSearch({ query: props.questionText })}
        >
          <div className="flex items-center gap-2">
            {props.questionEmoji && (
              <div className="rounded-sm p-0.5">{props.questionEmoji}</div>
            )}
            <div>{props.questionText}</div>
          </div>
          <Search
            className="shrink-0 text-muted-foreground"
            strokeWidth={2.8}
          />
        </Link>
      </CardContent>
    </Card>
  );
};
