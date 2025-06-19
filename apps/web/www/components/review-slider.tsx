import { reviews } from "@/utils/placeholders/reviews";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/src/components/card";
import { InfiniteSlider } from "@workspace/ui/src/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@workspace/ui/src/components/motion-primitives/progressive-blur";

const ReviewCard = (props) => (
  <Card className="w-md bg-card/50 backdrop-blur-3xl">
    <CardHeader>
      <CardTitle>
        {Array.from({ length: props.rating }, (_, i) => (
          <span key={i} className="text-yellow-400">
            ★
          </span>
        ))}
        {Array.from({ length: 5 - props.rating }, (_, i) => (
          <span key={i} className="text-neutral-600">
            ★
          </span>
        ))}
      </CardTitle>
      <CardDescription className="text-sm text-neutral-400">
        {props.content}
      </CardDescription>
      <div className="mt-4 text-xs text-neutral-500">{props.reviewerName}</div>
    </CardHeader>
  </Card>
);

export const ReviewSlider = (props: {
  direction: "right-to-left" | "left-to-right";
}) => {
  return (
    <div className="relative rounded-3xl">
      <InfiniteSlider
        speedOnHover={10}
        reverse={props.direction === "right-to-left"}
      >
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            reviewerName={review.reviewerName}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 -left-2 h-full w-2xs"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 -right-2 h-full w-2xs"
        direction="right"
        blurIntensity={1}
      />
    </div>
  );
};
