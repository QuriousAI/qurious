"use client";

import { Card, CardContent } from "@workspace/design-system/components/card";
import Link from "next/link";
import { ChevronRight } from "@workspace/design-system/icons";
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
          className="flex items-center justify-between gap-2 text-sm"
          onClick={() => createSearch({ query: props.questionText })}
        >
          <div className="flex items-center gap-2 leading-5">
            {props.questionEmoji && (
              <div className="rounded-sm p-0.5">{props.questionEmoji}</div>
            )}
            <div>{props.questionText}</div>
          </div>
          <ChevronRight
            className="shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
        </Link>
      </CardContent>
    </Card>
  );
};
