import { nanoid } from "nanoid";
import { performance } from "node:perf_hooks";

/**
 * Fetches and validates responses from the Semantic Scholar API.
 * @param url - The URL to fetch.
 * @param init - Optional fetch init options.
 * @param apiKey - Optional API key for authenticated requests.
 */
export const fetchSemanticScholarAPI = async <T>(
  url: string,
  init?: RequestInit,
  apiKey?: string,
) => {
  const id = nanoid();
  console.log(
    `[${id}] Making request to ${url} ${apiKey ? "with API key" : "without API key"}`,
  );

  const headers: HeadersInit = {
    ...init?.headers,
    ...(apiKey ? { "x-api-key": apiKey } : {}),
  };

  const start = performance.now();
  const response = await fetch(url, { ...init, headers });
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
      `[${id}] error: ${response.status} - ${errorCode} - ${errorMessage}`,
    );
    console.log(`[${id}] error data: ${JSON.stringify(data)}`);

    // To understand this, go to https://github.com/supermacro/neverthrow
    throw new Error(`${response.status} - ${errorCode} - ${errorMessage}`);
  }

  // To understand this, go to https://github.com/supermacro/neverthrow
  console.log(`[${id}] success`);
  return data as T;
};
