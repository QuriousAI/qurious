import type { Paper } from "@workspace/semantic-scholar/src";

export const extractFieldsFromPapers = (papers: Paper[] | undefined) => {
  console.log(papers);

  if (!papers) return;

  return papers.reduce(
    (acc, paper) => {
      const obj = {} as { abstract: string; tldr: string; title: string };

      if (paper.abstract) {
        obj["abstract"] = paper.abstract;
      }

      if (paper.tldr) {
        if (paper.tldr.text) {
          obj["tldr"] = paper.tldr.text;
        }
      }

      if (obj.abstract || obj.tldr) {
        if (!paper.title) {
          throw new Error("Title is undefined");
        }
        obj["title"] = paper.title;
        return [...acc, obj];
      }

      return acc;
    },
    [] as { abstract: string; tldr: string; title: string }[],
  );
};
