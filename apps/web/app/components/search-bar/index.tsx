"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/src/components/button";
import { Textarea } from "@workspace/ui/src/components/textarea";
import { ChevronRight, Search } from "@workspace/ui/src/iconography";
import { useState } from "react";
import { SearchBarOptionsSheet } from "./options-sheet";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/src/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/src/components/tooltip";
import { useCreateSearchMutation } from "@/queries";
import {
  Card,
  CardContent,
  CardFooter,
} from "@workspace/ui/src/components/card";
import Link from "next/link";
import { Separator } from "@workspace/ui/src/components/separator";

export const FILTERS = {
  minimumCitations: 0,
  publishedSince: "",
  openAccess: false,
  publicationTypes: [],
  fieldsOfStudy: [],
};
export const SORTING = [
  "relevance",
  "citationCount",
  "date",
  "influencialCitationCount",
] as const;

const SearchToggleGroup = () => {
  return (
    // <ToggleGroup type="single" value="normal" variant="outline">
    //   <ToggleGroupItem value="normal">Normal Search</ToggleGroupItem>

    //   {/* ToggleGroupItem w/ ToolTip */}
    //   <Tooltip>
    //     <TooltipTrigger asChild>
    //       <div className="">
    //         <ToggleGroupItem
    //           value="agentic"
    //           disabled
    //           className="first:rounded-none"
    //         >
    //           Agentic Search
    //         </ToggleGroupItem>
    //       </div>
    //     </TooltipTrigger>
    //     <TooltipContent>Coming soon; AI-Agent powered research!</TooltipContent>
    //   </Tooltip>
    // </ToggleGroup>
    <div className="select-none rounded-lg flex border overflow-hidden items-center justify-center shadow-xs">
      <div className="text-sm bg-accent h-full px-2 flex items-center">
        Normal Search
      </div>
      <Separator orientation="vertical" />
      <Tooltip>
        <TooltipTrigger className="text-sm px-2">Agentic Search</TooltipTrigger>
        <TooltipContent>Coming soon; AI-Agent powered research!</TooltipContent>
      </Tooltip>
    </div>
  );
};

const changedOptions = (options: any) => {
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

const createUrl = (search: string, options: any) => {
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

export const SearchBar = (props: { q?: string; options?: any }) => {
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
      className="w-full focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow]"
      id="tour-search-bar"
    >
      <CardContent className="flex flex-col gap-2">
        <Textarea
          placeholder="Search papers..."
          className="min-h-fit resize-none placeholder:text-base md:text-base text-base border-none shadow-none focus-visible:ring-0 dark:bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
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
          variant="ghost"
          className="hover:cursor-pointer"
          onClick={handleButtonClick}
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
