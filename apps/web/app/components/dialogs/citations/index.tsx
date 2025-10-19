import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/design-system/components/dialog";
import { Clipboard, Quote } from "@workspace/design-system/icons";
import { Button } from "@workspace/design-system/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/design-system/components/tabs";
import { type Author, Paper } from "@workspace/semantic-scholar/src";
import { useCopyToClipboard } from "react-use";
import { Separator } from "@workspace/design-system/components/separator";
import { toast } from "@workspace/design-system/components/sonner";
import { Cite } from "@citation-js/core";
import "@citation-js/plugin-csl";

const citationStyles = [
  {
    displayName: "APA",
    code: "apa",
  },
  // {
  //   displayName: "MLA",
  //   code: "mla",
  // },
  // {
  //   displayName: "Chicago",
  //   code: "chicago",
  // },
  {
    displayName: "Harvard",
    code: "harvard1",
  },
  {
    displayName: "Vancouver",
    code: "vancouver",
  },
  // {
  //   displayName: "BibteX",
  //   code: "bibtex",
  // },
  // {
  //   displayName: "AMA/Numeric",
  //   code: "ama",
  // },
];

export const CiteThisPaperDialog = (props: { paper: Paper }) => {
  const [_, copyToClipboard] = useCopyToClipboard();

  const generateCitation = (styleCode: string): string => {
    const cite = new Cite({
      title: props.paper.title,
      author: props.paper.authors.map((a) => {
        const [first, ...rest] = a.name.split(" ");
        return {
          given: first,
          family: rest.join(" "),
        };
      }),
      issued: { "date-parts": [[new Date(props.paper.year).getFullYear()]] },
      "container-title": props.paper.journal,
      // volume: props.paper.volume,
      // issue: props.paper.issue,
      // page: props.paper.pages,
      // DOI: props.paper.doi,
    });

    const output = cite.format("bibliography", {
      template: styleCode,
      lang: "en-US",
    });

    return output;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Quote /> Cite Paper
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cite this paper</DialogTitle>
          <DialogDescription>
            Select the appropriate citation style for this paper.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="APA">
          <TabsList>
            {citationStyles.map((style) => (
              <TabsTrigger value={style.displayName} key={style.code}>
                {style.displayName}
              </TabsTrigger>
            ))}
          </TabsList>
          {citationStyles.map((style) => {
            const citation = generateCitation(style.code);

            return (
              <TabsContent key={style.code} value={style.displayName}>
                <div className="flex flex-col gap-2">
                  <div className="rounded-md bg-muted p-4 text-sm font-medium text-muted-foreground whitespace-pre-line">
                    {citation}
                  </div>

                  <Separator />
                  <Button variant="secondary">
                    <Clipboard /> Copy
                  </Button>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
