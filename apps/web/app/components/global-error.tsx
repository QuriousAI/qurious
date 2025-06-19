import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@workspace/ui/src/components/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/src/components/card";
import { AlertCircle } from "@workspace/ui/src/iconography";
import { ConvexError } from "convex/values";

export const GlobalErrorHandler = (props: { error: Error }) => {
  let errorTitle = "Unknown Error";
  let errorDescription = props.error.message;

  if (props.error instanceof ConvexError) {
    errorTitle = "Unknown Convex Error";

    if (props.error.data === "insufficient credits") {
      errorTitle = "Insufficient Credits";
      errorDescription =
        "You do not have enough credits to perform this action. Please purchase more credits.";
    }
    if (props.error.data.errorCode === "SEMANTIC_SCHOLAR_API_LIMIT_REACHED") {
      errorTitle = "Semantic Scholar API Limit Reached";
      errorDescription =
        "We've reached the limits of the Semantic Scholar API. Please try again later in a few minutes.";
    }
  }

  return (
    <>
      <Alert variant="destructive" className="gap-y-2">
        <AlertTitle className="flex items-center gap-2 font-semibold text-xl">
          <AlertCircle />
          {errorTitle}
        </AlertTitle>
        <AlertDescription className="opacity-90 text-sm">
          {errorDescription}
        </AlertDescription>
      </Alert>
    </>
  );
};
