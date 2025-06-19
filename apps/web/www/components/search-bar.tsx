"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// import { Textarea } from "@workspace/ui/components/ui/textarea";
// import { Button } from "@workspace/ui/components/button";
// import { Search } from "@workspace/ui/iconography";
import { Textarea } from "@workspace/ui/src/components/textarea";
import { Button } from "@workspace/ui/src/components/button";
import { BorderTrail } from "@workspace/ui/src/components/motion-primitives/border-trail";
import { Search } from "@workspace/ui/src/iconography";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (search.trim()) {
        router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      }
    }
  };

  const handleButtonClick = () => {
    alert("Button clicked");
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="relative rounded-full border-none border-neutral-600/80 shadow-2xl transition-all duration-300 hover:border-neutral-500 w-4xl">
      <Textarea
        placeholder="Search a question"
        className="flex resize-none truncate overflow-hidden rounded-full border-0 bg-white px-7 py-6 font-medium focus-visible:ring-0 md:text-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {/* <BorderTrail
        style={{
          boxShadow:
            '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
        }}
        size={100}
      /> */}
      <BorderTrail
        className="bg-linear-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-amber-400 dark:via-amber-500 dark:to-amber-700"
        size={120}
      />
      <Button
        asChild
        variant={"secondary"}
        className="bg-secondary/60 absolute top-1/2 right-5 size-10 -translate-y-1/2 rounded-full p-2.5 hover:cursor-pointer"
        // bg-neutral-200 hover:bg-neutral-200
        onClick={handleButtonClick}
      >
        <Search />
      </Button>
    </div>
  );
}
