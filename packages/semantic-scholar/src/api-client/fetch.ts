import { ok, err } from "neverthrow";
import { nanoid } from "nanoid";
import { performance } from "node:perf_hooks";

/**
 * Fetches and validates responses from the Semantic Scholar API.
 * @param url - The URL to fetch.
 */
export const fetchSemanticScholarAPI = async <T>(
  url: string,
  init?: RequestInit
) => {
  const id = nanoid();
  console.log(`[${id}] Making request to ${url}`);

  const start = performance.now();
  const response = await fetch(url, init);
  const end = performance.now();

  const duration = (end - start).toFixed(2);
  console.log(`[${id}] Time taken: ${duration} ms`);

  const data = await response.json();

  // If the response is not ok, return an error.
  if (!response.ok) {
    let errorCode: string;
    let errorMessage: string;

    switch (response.status) {
      case 429:
        errorCode = "SEMANTIC_SCHOLAR_API_LIMIT_REACHED";
        errorMessage = "The Semantic Scholar API limit has been reached.";
        break;
      case 404:
        errorCode = "SEMANTIC_SCHOLAR_API_NOT_FOUND";
        errorMessage = "The requested resource was not found.";
        break;
      default:
        errorCode = "UNKNOWN_ERROR";
        errorMessage = "An unknown error occurred.";
    }

    console.log(
      `[${id}] error: ${response.status} - ${errorCode} - ${errorMessage}`
    );
    console.log(`[${id}] error data: ${JSON.stringify(data)}`);

    // To understand this, go to https://github.com/supermacro/neverthrow
    return err({
      responseStatus: response.status,
      errorCode,
      errorMessage,
    });
  }

  // To understand this, go to https://github.com/supermacro/neverthrow
  console.log(`[${id}] success`);
  return ok(data as T);
};
