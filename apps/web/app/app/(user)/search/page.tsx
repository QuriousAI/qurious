import { SearchBar } from "@/components/search-bar";
import { SearchResult } from "./client";
import {
  fieldsOfStudy,
  publicationTypes,
} from "@workspace/semantic-scholar/src/index";
import { z } from "zod";

const ParamsSchema = z.object({
  q: z.string(),
  minimumCitations: z.coerce.number().optional(),
  publishedSince: z.coerce.number().optional(),
  openAccess: z.coerce.boolean().optional(),
  publicationTypes: z
    // We receive a string of comma separated values
    .string()
    // We transform it into an array of any strings
    .transform((str) => str.split(","))
    // We validate that the array of strings is a array of publication types
    .pipe(z.array(z.enum(publicationTypes)))
    .optional(),
  fieldsOfStudy: z
    // We receive a string of comma separated values
    .string()
    // We transform it into an array of any strings
    .transform((str) => str.split(","))
    // We validate that the array of strings is a array of publication types
    .pipe(z.array(z.enum(fieldsOfStudy)))
    .optional(),
});

type Props = {
  searchParams?: Promise<{
    q?: string;
    minimumCitations?: number;
    publishedSince?: string;
    openAccess?: string;
    publicationTypes?: string;
    fieldsOfStudy?: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const searchParams = await props.searchParams;
  const { q } = ParamsSchema.parse(searchParams);

  return {
    title: q ? `${q} | Search | Qurious` : "Search | Qurious",
  };
}

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;

  const {
    q,
    minimumCitations,
    publishedSince,
    openAccess,
    publicationTypes,
    fieldsOfStudy,
  } = ParamsSchema.parse(searchParams);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar q={q} />
      <SearchResult
        q={q}
        minimumCitations={minimumCitations}
        // publishedSince={publishedSince}
        openAccess={openAccess}
        publicationTypes={publicationTypes}
        fieldsOfStudy={fieldsOfStudy}
      />
    </div>
  );
}
