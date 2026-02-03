"use client";

import { SearchBar } from "@/components/search-bar";
import { motion } from "motion/react";
import { RandomGreeting } from "@/components/greeting";
import { GenericTopics } from "@/components/topics";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center justify-center gap-6 h-[75vh]">
        <RandomGreeting />
        <SearchBar />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <motion.div
          className="text-muted-foreground font-medium underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          (╹ o╹) Try searching about...
        </motion.div>
        {/* The generic topics */}
        <GenericTopics />
      </div>
    </div>
  );
}
