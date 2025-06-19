export const publicationTypes = [
  "Review",
  "JournalArticle",
  "CaseReport",
  "ClinicalTrial",
  "Conference",
  "Dataset",
  "Editorial",
  "LettersAndComments",
  "MetaAnalysis",
  "News",
  "Study",
  "Book",
  "BookSection",
] as const;

export type PublicationType = (typeof publicationTypes)[number];
