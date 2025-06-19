import Link from "next/link";

export default function CreditsPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-3xl font-bold">
        Powered by the{" "}
        <Link
          href="https://www.semanticscholar.org/"
          className="underline underline-offset-2"
        >
          Semantic Scholar API
        </Link>
        .
      </div>
      <div className="text-3xl font-bold">
        Inspired by{" "}
        <Link
          href="https://consensus.app/"
          className="underline underline-offset-2"
        >
          Consensus
        </Link>
        .
      </div>
    </div>
  );
}
