/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as credits from "../credits.js";
import type * as crons from "../crons.js";
import type * as externalActions_ai_paperSummary from "../externalActions/ai/paperSummary.js";
import type * as externalActions_ai_studySnapshot from "../externalActions/ai/studySnapshot.js";
import type * as externalActions_ai_suggestedQuery from "../externalActions/ai/suggestedQuery.js";
import type * as externalActions_ai_transformQuery from "../externalActions/ai/transformQuery.js";
import type * as externalActions_semanticScholar_multiplePaperDetails from "../externalActions/semanticScholar/multiplePaperDetails.js";
import type * as externalActions_semanticScholar_paperCitations from "../externalActions/semanticScholar/paperCitations.js";
import type * as externalActions_semanticScholar_paperDetails from "../externalActions/semanticScholar/paperDetails.js";
import type * as externalActions_semanticScholar_paperRecommendations from "../externalActions/semanticScholar/paperRecommendations.js";
import type * as externalActions_semanticScholar_paperReferences from "../externalActions/semanticScholar/paperReferences.js";
import type * as externalActions_semanticScholar_relevantPapers from "../externalActions/semanticScholar/relevantPapers.js";
import type * as folders_mutations from "../folders/mutations.js";
import type * as folders_queries from "../folders/queries.js";
import type * as http from "../http.js";
import type * as httpActions_clerk from "../httpActions/clerk.js";
import type * as httpActions_dodoPayments from "../httpActions/dodoPayments.js";
import type * as searches_mutations from "../searches/mutations.js";
import type * as searches_queries from "../searches/queries.js";
import type * as subscriptions_mutations from "../subscriptions/mutations.js";
import type * as subscriptions_queries from "../subscriptions/queries.js";
import type * as types_dodopayments from "../types/dodopayments.js";
import type * as users_helpers from "../users/helpers.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  credits: typeof credits;
  crons: typeof crons;
  "externalActions/ai/paperSummary": typeof externalActions_ai_paperSummary;
  "externalActions/ai/studySnapshot": typeof externalActions_ai_studySnapshot;
  "externalActions/ai/suggestedQuery": typeof externalActions_ai_suggestedQuery;
  "externalActions/ai/transformQuery": typeof externalActions_ai_transformQuery;
  "externalActions/semanticScholar/multiplePaperDetails": typeof externalActions_semanticScholar_multiplePaperDetails;
  "externalActions/semanticScholar/paperCitations": typeof externalActions_semanticScholar_paperCitations;
  "externalActions/semanticScholar/paperDetails": typeof externalActions_semanticScholar_paperDetails;
  "externalActions/semanticScholar/paperRecommendations": typeof externalActions_semanticScholar_paperRecommendations;
  "externalActions/semanticScholar/paperReferences": typeof externalActions_semanticScholar_paperReferences;
  "externalActions/semanticScholar/relevantPapers": typeof externalActions_semanticScholar_relevantPapers;
  "folders/mutations": typeof folders_mutations;
  "folders/queries": typeof folders_queries;
  http: typeof http;
  "httpActions/clerk": typeof httpActions_clerk;
  "httpActions/dodoPayments": typeof httpActions_dodoPayments;
  "searches/mutations": typeof searches_mutations;
  "searches/queries": typeof searches_queries;
  "subscriptions/mutations": typeof subscriptions_mutations;
  "subscriptions/queries": typeof subscriptions_queries;
  "types/dodopayments": typeof types_dodopayments;
  "users/helpers": typeof users_helpers;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  actionCache: {
    crons: {
      purge: FunctionReference<
        "mutation",
        "internal",
        { expiresAt?: number },
        null
      >;
    };
    lib: {
      get: FunctionReference<
        "query",
        "internal",
        { args: any; name: string; ttl: number | null },
        { kind: "hit"; value: any } | { expiredEntry?: string; kind: "miss" }
      >;
      put: FunctionReference<
        "mutation",
        "internal",
        {
          args: any;
          expiredEntry?: string;
          name: string;
          ttl: number | null;
          value: any;
        },
        null
      >;
      remove: FunctionReference<
        "mutation",
        "internal",
        { args: any; name: string },
        null
      >;
      removeAll: FunctionReference<
        "mutation",
        "internal",
        { batchSize?: number; before?: number; name?: string },
        null
      >;
    };
  };
};
