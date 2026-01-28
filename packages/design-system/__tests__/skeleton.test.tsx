import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Skeleton } from "../src/components/skeleton";

describe("Skeleton Component", () => {
  test("renders skeleton element", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).not.toBeNull();
  });

  test("applies custom className", () => {
    const { container } = render(<Skeleton className="custom-skeleton" />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton?.className).toContain("custom-skeleton");
  });

  test("has animation class", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton?.className).toContain("animate-pulse");
  });

  test("has background color", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton?.className).toContain("bg-accent");
  });

  test("renders with custom dimensions", () => {
    const { container } = render(<Skeleton className="h-20 w-40" />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton?.className).toContain("h-20");
    expect(skeleton?.className).toContain("w-40");
  });

  test("renders circular skeleton", () => {
    const { container } = render(
      <Skeleton className="rounded-full h-12 w-12" />,
    );
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton?.className).toContain("rounded-full");
  });

  test("renders multiple skeletons for loading state", () => {
    const { container } = render(
      <div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>,
    );

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBe(3);
  });

  test("renders skeleton card pattern", () => {
    const { container } = render(
      <div className="space-y-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>,
    );

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBe(4);
  });
});
