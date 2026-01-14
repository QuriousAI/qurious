"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/design-system/components/button";
import { Textarea } from "@workspace/design-system/components/textarea";
import { ChevronRight, Search, Bot } from "@workspace/design-system/icons";
import { useState } from "react";
import { SearchBarOptionsSheet } from "./options-sheet";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/design-system/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/design-system/components/tooltip";
import { useCreateSearchMutation } from "@/queries";
import {
  Card,
  CardContent,
  CardFooter,
} from "@workspace/design-system/components/card";
import Link from "next/link";
import { Separator } from "@workspace/design-system/components/separator";
import {ButtonGroup} from "@workspace/design-system/components/button-group"

export const FILTERS = {
  minimumCitations: 0,
  publishedSince: "",
  openAccess: false,
  publicationTypes: [] as string[],
  fieldsOfStudy: [] as string[],
};
export const SORTING = [
  "relevance",
  "citationCount",
  "date",
  "influencialCitationCount",
] as const;

const SearchToggleGroup = () => {
  return <ButtonGroup>
<Button variant="outline"><Search/><span className="hidden">Normal</span></Button>
<Button variant="outline" disabled><Bot/><span className="hidden">Agentic</span></Button>
</ButtonGroup>
};

const changedOptions = (options: typeof FILTERS) => {
  let count = 0;

  if (options.minimumCitations !== 0) {
    count++;
  }

  if (options.publishedSince !== "") {
    count++;
  }

  if (options.openAccess !== false) {
    count++;
  }

  if (options.publicationTypes.length > 0) {
    count++;
  }

  if (options.fieldsOfStudy.length > 0) {
    count++;
  }

  return count;
};

const createUrl = (search: string, options: typeof FILTERS) => {
  const base = `/search?q=${encodeURIComponent(search)}`;
  const queryParams = [];

  if (options.minimumCitations !== 0) {
    queryParams.push(`minimumCitations=${options.minimumCitations}`);
  }

  if (options.publishedSince !== "") {
    queryParams.push(`publishedSince=${options.publishedSince}`);
  }

  if (options.openAccess !== false) {
    queryParams.push(`openAccess=${options.openAccess}`);
  }

  if (options.publicationTypes.length > 0) {
    queryParams.push(`publicationTypes=${options.publicationTypes.join(",")}`);
  }

  if (options.fieldsOfStudy.length > 0) {
    queryParams.push(`fieldsOfStudy=${options.fieldsOfStudy.join(",")}`);
  }

  return `${base}&${queryParams.join("&")}`;
};

export const SearchBar = (props: { q?: string; options?: typeof FILTERS }) => {
  const [search, setSearch] = useState(props.q || "");
  const [options, setOptions] = useState(props.options || FILTERS);
  const router = useRouter();
  const { mutateAsync: createSearch } = useCreateSearchMutation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        createSearch({ query: trimmedSearch });
        router.push(createUrl(trimmedSearch, options));
      }
    }
  };

  const handleButtonClick = () => {
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      createSearch({ query: trimmedSearch });
      router.push(createUrl(trimmedSearch, options));
    }
  };

  return (
    <Card
      className="w-full focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow] py-2"
      id="tour-search-bar"
    >
      <CardContent className="flex flex-col gap-2 px-2">
        <Textarea
          placeholder="Search papers..."
          className="min-h-fit resize-none placeholder:text-base md:text-base text-base border-none shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
      <CardFooter className="flex justify-between px-2">
        {/* Left Side */}
        <div className="flex gap-2">
          <SearchBarOptionsSheet
            options={options}
            setOptions={setOptions}
            buttonLabel={
              changedOptions(options) > 0
                ? `Options (${changedOptions(options)})`
                : "Options"
            }
          />
          <SearchToggleGroup />
        </div>

        {/* Right Side */}
        <Button
          className="hover:cursor-pointer"
          onClick={handleButtonClick}
        disabled={search.trim().length === 0}
        >
          <Link href={`/search?q=${search}`}>
            <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// ----
