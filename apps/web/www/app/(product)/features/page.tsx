const features = [
  {
    title: "AI-Powered Search Engine",
    description:
      "A traditional search engine supercharged with AI capabilities",
    items: [
      "Search for any research paper or topic",
      "Advanced filtering by date, relevance and field",
      "Get intelligent search suggestions",
    ],
  },
  {
    title: "Personalized Experience",
    description: "Results tailored to your preferences",
    items: [
      "Customized search results based on your field",
      "Personalized paper recommendations",
      "Adaptive to your research style",
    ],
  },
  {
    title: "In-Depth Paper Analysis",
    description: "Comprehensive paper exploration tools",
    items: [
      "Detailed paper breakdowns and summaries",
      "Citation and reference tracking",
      "Interactive chat interface for paper discussions",
    ],
  },
  {
    title: "Research Organization",
    description: "Keep your research organized and shareable",
    items: [
      "Create custom folders to organize papers",
      "Add notes and annotations",
      "Share collections with the research community",
    ],
  },
];

const FeatureCard = ({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) => (
  <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 p-6 transition-all hover:border-neutral-300">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-neutral-600">{description}</p>
    <ul className="list-inside list-disc space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-neutral-600">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const FeatureShowcase = () => (
  <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
    {features.map((feature, i) => (
      <FeatureCard key={i} {...feature} />
    ))}
  </div>
);


export default function FeaturesPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
    {/* <div className="font-bold">Feature Comparison b/w us & competitors</div> */}
    <div className="text-5xl font-bold">Features.</div>
    <div className="text-xl font-bold text-neutral-500">Coming Soon™️</div>
    <FeatureShowcase />
  </div>
  );
}
