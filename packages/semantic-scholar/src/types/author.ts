export type Author = {
  authorId?: string;
  externalIds?: {
    DBLP?: number[];
  };
  url?: string;
  name?: string;
  affiliations?: string[];
  homepage?: string;
  paperCount?: number;
  citationCount?: number;
  hIndex?: number;
};
