import { api } from "@workspace/backend/convex/_generated/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { convexAction, useConvex } from "@convex-dev/react-query";
import { FieldOfStudy, PublicationType } from "@workspace/semantic-scholar/src";

// Semantic Scholar API Actions
export const useGetRelevantPapersInfiniteQuery = (options: {
  q: string;
  limit: number;
  publicationTypes: PublicationType[];
  openAccessPdf: boolean;
  minCitationCount: number;
  fieldsOfStudy: FieldOfStudy[];
  fields: string[];
  enabled: boolean;
}) => {
  const convex = useConvex();

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["relevantPapers"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const result = await convex.action(
        api.externalActions.semanticScholar.relevantPapers.getRelevantPapers,
        {
          query: options.q,
          limit: options.limit,
          publicationTypes: options.publicationTypes,
          openAccessPdf: options.openAccessPdf,
          minCitationCount: options.minCitationCount,
          fieldsOfStudy: options.fieldsOfStudy,
          offset: pageParam,
          fields: options.fields,
        }
      );

      return result;
    },
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: options.enabled,
  });

  return {
    ...infiniteQuery,
    papersFlatMapped: infiniteQuery.data?.pages.flatMap((page) => page.data),
    totalPapers: infiniteQuery.data?.pages[0].total,
  };
};

export const useGetPaperDetailsQuery = (options: {
  paperId: string;
  fields: string[];
}) =>
  useQuery({
    ...convexAction(
      api.externalActions.semanticScholar.paperDetails.getPaperDetails,
      { paperId: options.paperId, fields: options.fields }
    ),
  });

export const useGetMultiplePapersDetailsQuery = (options: {
  paperIds: string[];
  fields: string[];
}) =>
  useQuery({
    ...convexAction(
      api.externalActions.semanticScholar.multiplePaperDetails
        .getMultiplePaperDetails,
      { paperIds: options.paperIds, fields: options.fields }
    ),
  });

export const useGetPaperSnapshotQuery = (options: {
  abstract: string;
  fields: string[];
  enabled: boolean;
}) =>
  useQuery({
    ...convexAction(api.externalActions.ai.studySnapshot.extractStudySnapshot, {
      abstract: options.abstract,
      fields: options.fields,
    }),
    enabled: options.enabled,
  });

export const useGetPaperReferencesQuery = (options: {
  paperId: string;
  fields: string[];
}) =>
  useQuery({
    ...convexAction(
      api.externalActions.semanticScholar.paperReferences.getPaperReferences,
      { paperId: options.paperId, fields: options.fields }
    ),
  });

export const useGetPaperCitationsQuery = (options: {
  paperId: string;
  fields: string[];
}) =>
  useQuery({
    ...convexAction(
      api.externalActions.semanticScholar.paperCitations.getPaperCitations,
      { paperId: options.paperId, fields: options.fields }
    ),
  });

export const useGetPaperRecommendationsQuery = (options: {
  paperId: string;
  fields: string[];
}) =>
  useQuery({
    ...convexAction(
      api.externalActions.semanticScholar.paperRecommendations
        .getPaperRecommendations,
      { paperId: options.paperId, fields: options.fields }
    ),
  });
