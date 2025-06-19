import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/src/components/dialog";
import { Clipboard, Quote } from "@workspace/ui/src/iconography";
import { Button } from "@workspace/ui/src/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/src/components/tabs";
import { type Author, Paper } from "@workspace/semantic-scholar/src";
import { useCopyToClipboard } from "react-use";
import { Separator } from "@workspace/ui/src/components/separator";
import { toast } from "@workspace/ui/src/components/sonner";

type CitationInfo = {
  authors: Author[]; // e.g., ["John Smith", "Jane Doe"]
  title: string;
  year: number;
  publisher: string;
  city?: string;
  page?: number;
  index?: number;
};

type CitationFunction = (info: CitationInfo) => string;

function formatAuthors(authors: Author[], style: string): string {
  if (authors.length === 0) return "";

  switch (style) {
    case "APA":
      return authors.length <= 20
        ? authors
            .map((a) => `${a.name}`)
            .join(", ")
            .replace(/, ([^,]*)$/, " & $1")
        : `${authors[0].name} et al.`;

    case "MLA":
    case "Chicago":
    case "Harvard":
      return authors.length === 1
        ? authors[0].name
        : authors.length === 2
          ? `${authors[0].name} and ${authors[1].name}`
          : `${authors[0]} et al.`;

    case "IEEE":
      return authors.length <= 3 ? authors.join(", ") : `${authors[0]} et al.`;

    case "AMA":
    case "Vancouver":
      return authors.join(", ");

    default:
      return authors.join(", ");
  }
}

const citationStyles: {
  citationStyleName: string;
  citationFunc: CitationFunction;
}[] = [
  {
    citationStyleName: "APA",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "APA");
      return `${authors}. (${info.year}). *${info.title}*. ${info.publisher}.`;
    },
  },
  {
    citationStyleName: "MLA",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "MLA");
      return `${authors}. *${info.title}*. ${info.publisher}, ${info.year}.`;
    },
  },
  {
    citationStyleName: "Chicago",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "Chicago");
      return `${authors}. *${info.title}*. ${info.city ?? "Unknown"}: ${info.publisher}, ${info.year}.`;
    },
  },
  {
    citationStyleName: "IEEE",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "IEEE");
      return `[${info.index ?? 1}] ${authors}, *${info.title}*, ${info.city ?? "Unknown"}: ${info.publisher}, ${info.year}.`;
    },
  },
  {
    citationStyleName: "AMA",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "AMA");
      return `${info.index ?? 1}. ${authors}. *${info.title}*. ${info.city ?? "Unknown"}, ${info.publisher}; ${info.year}.`;
    },
  },
  {
    citationStyleName: "Harvard",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "Harvard");
      return `${authors}, ${info.year}. *${info.title}*. ${info.city ?? "Unknown"}: ${info.publisher}.`;
    },
  },
  {
    citationStyleName: "Vancouver",
    citationFunc: (info) => {
      const authors = formatAuthors(info.authors, "Vancouver");
      return `${info.index ?? 1}. ${authors}. ${info.title}. ${info.city ?? "Unknown"}: ${info.publisher}; ${info.year}.`;
    },
  },
];

export const CiteThisPaperDialog = (props: { paper: Paper }) => {
  const [_, copyToClipboard] = useCopyToClipboard();

  const onClickCopyAndToast = (citation: string, citationStyleName: string) => {
    copyToClipboard(citation);
    toast.success(`Copied ${citationStyleName} citation to clipboard.`);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Quote />
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
              <TabsTrigger
                value={style.citationStyleName}
                key={style.citationStyleName}
              >
                {style.citationStyleName}
              </TabsTrigger>
            ))}
          </TabsList>
          {citationStyles.map((style) => (
            <TabsContent
              key={style.citationStyleName}
              value={style.citationStyleName}
            >
              <div className="flex flex-col gap-2">
                {style.citationFunc({
                  authors: props.paper.authors,
                  title: "Sample Title",
                  year: 2024,
                  publisher: "Sample Publisher",
                  city: "Sample City",
                  page: 1,
                  index: 1,
                })}

                <Separator />

                <Button
                  variant="secondary"
                  onClick={() =>
                    onClickCopyAndToast(
                      style.citationFunc({
                        authors: props.paper.authors,
                        title: "Sample Title",
                        year: 2024,
                        publisher: "Sample Publisher",
                        city: "Sample City",
                        page: 1,
                        index: 1,
                      }),
                      style.citationStyleName
                    )
                  }
                >
                  <Clipboard /> Copy
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export const CiteThisPaperDialogWithTooltip = (props: { paper: Paper }) => (
  <Tooltip>
    <TooltipTrigger>
      <CiteThisPaperDialog paper={props.paper} />
    </TooltipTrigger>
    <TooltipContent>Cite this paper</TooltipContent>
  </Tooltip>
);
