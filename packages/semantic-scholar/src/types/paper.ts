import { Author } from "./author";
import { FieldOfStudy } from "./fields-of-study";
import { PublicationType } from "./publication-types";

export type Paper = {
  paperId?: string;
  corpusId?: number;
  externalIds?: Record<string, unknown>;
  url?: string;
  title?: string;
  abstract?: string;
  venue?: string;
  publicationVenue?: PublicationVenue;
  year?: number;
  referenceCount?: number;
  citationCount?: number;
  influentialCitationCount?: number;
  isOpenAccess?: boolean;
  openAccessPdf?: OpenAccessPdf;
  fieldsOfStudy?: FieldOfStudy[];
  s2FieldsOfStudy?: S2FieldOfStudy[];
  publicationTypes?: PublicationType[];
  publicationDate?: string;
  journal?: Journal;
  citationStyles?: {
    bibtex?: string;
  };
  authors?: Author[];
  citations?: Paper[];
  references?: Paper[];
  embedding?: Embedding;
  tldr?: Tldr;
};

type S2FieldOfStudy = {
  category?: string;
  source?: string;
};

type Embedding = {
  model?: string;
  vector?: number[];
};

type Tldr = {
  model?: string;
  text?: string;
};

type Journal = {
  volume?: string;
  pages?: string;
  name?: string;
};

type OpenAccessPdf = {
  url?: string;
  status?: string;
  license?: string;
  disclaimer?: string;
};

type PublicationVenue = {
  id?: string;
  name?: string;
  type?: string;
  alternate_names?: string[];
  url?: string;
};
