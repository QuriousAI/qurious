import ReactECharts from "echarts-for-react";

import {
  useGetPaperCitationsQuery,
  useGetPaperDetailsQuery,
  useGetPaperReferencesQuery,
} from "@/queries";
import { constructGraphFromPaper } from "@/utils/paper-graph-view";

export const GraphViewTabContent = (props: { paperId: string }) => {
  const { data: paper, isLoading: isPaperLoading } = useGetPaperDetailsQuery({
    paperId: props.paperId,
    fields: ["title", "paperId", "citationCount", "referenceCount"],
  });

  const { data: references, isLoading: isRefsLoading } =
    useGetPaperReferencesQuery({
      paperId: props.paperId,
      fields: ["title", "paperId", "citationCount"],
    });

  const { data: citations, isLoading: isCitsLoading } =
    useGetPaperCitationsQuery({
      paperId: props.paperId,
      fields: ["title", "paperId", "citationCount"],
    });

  if (isPaperLoading || isRefsLoading || isCitsLoading) {
    return <div>Loading graph data...</div>;
  }

  if (!paper || !references || !citations) {
    return <div>Data graph unable to be constructed.</div>;
  }

  const referenceCount = 10;
  const citationCount = 10;

  // Combine the paper with its references and citations
  const paperWithConnections = {
    ...paper,
    references: references.data.map((r) => r.citedPaper),
    citations: citations.data.map((c) => c.citedPaper),
  };

  const graph = constructGraphFromPaper(paper, referenceCount, citationCount);

  const options = {
    title: {
      text: paper.title,
      top: "bottom",
      left: "right",
    },
    legend: [
      {
        data: graph.categories.map((c) => c.name),
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: paper.title,
        type: "graph",
        legendHoverLink: false,
        layout: "none",
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="">
        Showing top {referenceCount} references, sorted by citation count.
      </div>
      <div className="">
        Showing top {citationCount} citations, sorted by citation count.
      </div>
      <ReactECharts
        option={options}
        style={{ height: "80vh", border: "1px solid grey" }}
      />
    </div>
  );
};
