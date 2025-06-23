import { FieldOfStudy } from "../types/fields-of-study";
import { Paper } from "../types/paper";
import { PublicationType } from "../types/publication-types";
import { fetchSemanticScholarAPI } from "./fetch";
import { GetRelevantPapersReturnType } from "./return-types";

const SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org";
const GRAPH_API_URL = `${SEMANTIC_SCHOLAR_API_URL}/graph/v1`;
const RECOMMENDATIONS_API_URL = `${SEMANTIC_SCHOLAR_API_URL}/recommendations/v1`;

export class SemanticScholarAPIClient {
  /**
   * Searches for relevant papers based on a query. Typically used on `/search` page inside app.
   * Calls https://api.semanticscholar.org/graph/v1/paper/search
   */
  getRelevantPapers(options: {
    query: string;
    fields: string[];

    publicationTypes: PublicationType[];
    openAccessPdf: boolean;
    minCitationCount: number;
    fieldsOfStudy: FieldOfStudy[];

    offset: number;
    limit: number;
  }) {
    const searchParams = new URLSearchParams({
      query: options.query,
      fields: options.fields.join(","),

      publicationTypes: options.publicationTypes.join(","),
      openAccessPdf: options.openAccessPdf.toString(),
      minCitationCount: options.minCitationCount.toString(),
      fieldsOfStudy: options.fieldsOfStudy.join(","),

      offset: options.offset.toString(),
      limit: options.limit.toString(),
    }).toString();

    return fetchSemanticScholarAPI<GetRelevantPapersReturnType>(
      `${GRAPH_API_URL}/paper/search?${searchParams}`
    );
  }

  /**
   * Fetches details about a specific paper. Typically used on `/paper` page.
   * @param paperId - The ID of the paper to fetch details for.
   */
  getPaperDetails(options: { paperId: string; fields: string[] }) {
    const searchParams = new URLSearchParams({
      fields: options.fields.join(","),
    }).toString();

    return fetchSemanticScholarAPI<Paper>(
      `${GRAPH_API_URL}/paper/${options.paperId}?${searchParams}`
    );
  }

  /**
   * Fetches details about multiple papers in a single request. Typically used when bulk paper data is needed.
   * @param paperIds - Array of paper IDs to fetch details for.
   */
  getMultiplePapersDetails(options: { paperIds: string[]; fields: string[] }) {
    const searchParams = new URLSearchParams({
      fields: options.fields.join(","),
    }).toString();

    return fetchSemanticScholarAPI<Paper[]>(
      `${GRAPH_API_URL}/paper/batch?${searchParams}`,
      {
        method: "POST",
        body: JSON.stringify({ ids: options.paperIds }),
      }
    );
  }

  /**
   * Fetches recommended papers for a specific paper. Typically used on `/paper` page.
   * @param paperId - The ID of the paper to fetch recommended papers for.
   */
  getRecommendedPapers(options: { paperId: string; fields: string[] }) {
    const searchParams = new URLSearchParams({
      fields: options.fields.join(","),
    }).toString();

    return fetchSemanticScholarAPI<{
      recommendedPapers: Paper[];
    }>(
      `${RECOMMENDATIONS_API_URL}/papers/forpaper/${options.paperId}?${searchParams}`
    );
  }

  getPaperReferences(options: { paperId: string; fields: string[] }) {
    const searchParams = new URLSearchParams({
      fields: options.fields.join(","),
    }).toString();

    return fetchSemanticScholarAPI<{
      data: {
        citedPaper: Paper;
      }[];
    }>(`${GRAPH_API_URL}/paper/${options.paperId}/references?${searchParams}`);
  }

  getPaperCitations(options: { paperId: string; fields: string[] }) {
    const searchParams = new URLSearchParams({
      fields: options.fields.join(","),
    }).toString();

    return fetchSemanticScholarAPI<{
      data: {
        citingPaper: Paper;
      }[];
    }>(`${GRAPH_API_URL}/paper/${options.paperId}/citations?${searchParams}`);
  }
}
