"use client";

import { useState } from "react";

import { Badge } from "@workspace/design-system/components/badge";
import { Button } from "@workspace/design-system/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/design-system/components/sheet";
import {
  ExternalLink,
  FileText,
  Loader2,
  MessageCircleQuestion,
} from "@workspace/design-system/icons";
import type { Paper } from "@workspace/semantic-scholar/src";

// ============================================================================
// Types
// ============================================================================

type AskPaperDrawerProps = {
  paper: Paper;
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the PDF URL for a paper, using proxy to avoid CORS issues
 */
const getProxiedPdfUrl = (pdfUrl: string): string => {
  return `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`;
};

/**
 * Check if paper has an available PDF
 */
const getPdfUrl = (paper: Paper): string | null => {
  return paper.openAccessPdf?.url ?? null;
};

// ============================================================================
// Components
// ============================================================================

type PdfViewerProps = {
  pdfUrl: string;
  title: string;
};

const PdfViewer = ({ pdfUrl, title }: PdfViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const proxiedUrl = getProxiedPdfUrl(pdfUrl);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
        <FileText className="size-12 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Unable to load PDF preview.
          </p>
          <Button variant="outline" asChild>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 size-4" />
              Open PDF in new tab
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 w-full h-full min-h-0">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Loading PDF...
            </span>
          </div>
        </div>
      )}
      <iframe
        src={proxiedUrl}
        title={`PDF: ${title}`}
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

const NoPdfAvailable = ({ paper }: { paper: Paper }) => (
  <div className="flex flex-col items-center justify-center flex-1 gap-4 p-6 text-center">
    <FileText className="size-12 text-muted-foreground" />
    <div className="space-y-2">
      <p className="font-medium">No PDF available</p>
      <p className="text-sm text-muted-foreground max-w-sm">
        This paper doesn't have an open access PDF. You may be able to find it
        through your institution or the publisher.
      </p>
      {paper.url && (
        <Button variant="outline" className="mt-4" asChild>
          <a href={paper.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 size-4" />
            View on Semantic Scholar
          </a>
        </Button>
      )}
    </div>
  </div>
);

// ============================================================================
// Main Component
// ============================================================================

export const AskPaperDrawer = ({ paper }: AskPaperDrawerProps) => {
  const pdfUrl = getPdfUrl(paper);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MessageCircleQuestion />
          <span className="sr-only">View Paper PDF</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full sm:max-w-2xl lg:max-w-4xl flex flex-col"
      >
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center gap-2 text-lg pr-8">
            <span className="line-clamp-2">{paper.title}</span>
            {paper.isOpenAccess && (
              <Badge className="flex-shrink-0">Open Access</Badge>
            )}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {paper.authors
              ?.slice(0, 3)
              .map((a) => a.name)
              .join(", ")}
            {paper.authors &&
              paper.authors.length > 3 &&
              ` +${paper.authors.length - 3} more`}
            {paper.year && ` · ${paper.year}`}
          </SheetDescription>
        </SheetHeader>

        {pdfUrl ? (
          <PdfViewer pdfUrl={pdfUrl} title={paper.title ?? "Paper"} />
        ) : (
          <NoPdfAvailable paper={paper} />
        )}
      </SheetContent>
    </Sheet>
  );
};
