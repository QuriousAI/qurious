"use client";

import { Card, CardContent } from "@workspace/design-system/components/card";
import Link from "next/link";
import { ChevronRight } from "@workspace/design-system/icons";
import { useCreateSearchMutation } from "@/queries";
import { motion } from "motion/react";

export const SearchCard = (props: {
  questionText: string;
  questionEmoji?: string;
}) => {
  const { mutateAsync: createSearch } = useCreateSearchMutation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ x: 4 }}
    >
      <Card className="py-2 transition-all hover:brightness-110 border hover:border-primary/50">
        <CardContent className="px-4">
          <Link
            href={`/search?q=${props.questionText}`}
            className="flex items-center justify-between gap-2 text-sm"
            onClick={() => createSearch({ query: props.questionText })}
          >
            <div className="flex items-center gap-2 leading-5">
              {props.questionEmoji && (
                <motion.div
                  className="rounded-sm p-0.5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {props.questionEmoji}
                </motion.div>
              )}
              <div>{props.questionText}</div>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight
                className="shrink-0 text-muted-foreground"
                strokeWidth={1.5}
              />
            </motion.div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};
