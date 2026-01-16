import Link from "next/link";
import { Button } from "@workspace/design-system/components/button";
import { Home } from "@workspace/design-system/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 px-4 py-12">
      <div className="flex flex-col items-center gap-8 text-center max-w-md">
        {/* Simple 404 Display */}
        <h1 className="text-8xl md:text-9xl font-bold text-foreground">
          404
        </h1>

        {/* Error Message */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Button */}
        <Button asChild size="lg" variant="default" className="gap-2">
          <Link href="/">
            <Home className="size-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
