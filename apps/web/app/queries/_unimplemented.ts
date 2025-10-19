import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexAction, convexQuery } from "@convex-dev/react-query";

// Queries not yet implemented properly on the backend.

// Payment Stuff

export const useGetSubscriptionQuery = () =>
  useQuery({
    ...convexQuery(api.subscriptions.queries.getSubscription, {}),
  });

// Parse PDF
// export const useParsePDFQuery = (pdfUrl: string) =>
//   useQuery({
//     ...convexAction(api.myActions.downloadPDF.parsePDF, { pdfUrl }),
//   });
