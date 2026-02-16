import { z } from "zod";

import { SearchBar } from "@/components/search-bar";
import {
  fieldsOfStudy,
  publicationTypes,
} from "@workspace/semantic-scholar/src/index";
import { createMetadata } from "@workspace/seo/metadata";

import { SearchResults } from "./client";

// Helper to parse comma-separated strings into validated enum arrays
const csvToEnumArray = <T extends readonly [string, ...string[]]>(
  enumValues: T,
) =>
  z
    .string()
    .transform((str) => str.split(","))
    .pipe(z.array(z.enum(enumValues)));

const searchParamsSchema = z.object({
  q: z.string(),
  minimumCitations: z.coerce.number().optional(),
  openAccess: z.coerce.boolean().optional(),
  publicationTypes: csvToEnumArray(publicationTypes).optional(),
  fieldsOfStudy: csvToEnumArray(fieldsOfStudy).optional(),
});

type Props = {
  searchParams?: Promise<Record<string, string | undefined>>;
};

export async function generateMetadata(props: Props) {
  const searchParams = await props.searchParams;
  const { q } = searchParamsSchema.parse(searchParams);

  return createMetadata({
    title: q ? `${q} | Search` : "Search",
    description: q
      ? `Search results for "${q}" on Qurious`
      : "Search for research papers and academic content",
  });
}

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  const { q, ...filters } = searchParamsSchema.parse(searchParams);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar q={q} />
      <SearchResults q={q} {...filters} />
    </div>
  );
}
