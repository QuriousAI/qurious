"use client";

import ReactECharts from "echarts-for-react";
import {
  useGetPaperCitationsQuery,
  useGetPaperDetailsQuery,
  useGetPaperReferencesQuery,
} from "@/queries";
import { constructGraphFromPaper } from "@/utils/paper-graph-view";
import { AlertCircleIcon, Dot } from "@workspace/ui/src/iconography";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/src/components/alert";

type Node = {
  id: string;
  label: string;
  type: string;
};

type Link = {
  source: string;
  target: string;
};

export default function GraphView({
  graph,
}: {
  graph: {
    nodes: Node[];
    links: Link[];
  };
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Get width and height from the SVG element via the ref, fallback to defaults if not available
  const getDimensions = () => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBoundingClientRect();
      return {
        width: bbox.width || 800,
        height: bbox.height || 500,
      };
    }
    return { width: 800, height: 500 };
  };

  const { width, height } = getDimensions();

  const links = graph.links.map((d) => ({ ...d }));
  const nodes = graph.nodes.map((d) => ({ ...d }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous graph

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 25)
      .attr("fill", (d) => {
        if (d.type === "References") return "#3b82f6"; // blue
        if (d.type === "Citations") return "#22c55e"; // green
        return "#f59e0b"; // yellow
      })
      .call(drag(simulation));

    const MAX_LABEL_LENGTH = 20;
    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) =>
        d.label.length > MAX_LABEL_LENGTH
          ? d.label.slice(0, MAX_LABEL_LENGTH) + "…"
          : d.label
      )
      .attr("font-size", 10)
      .attr("dx", 0)
      .attr("dy", "0.35em")
      .attr("fill", "white");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });
  }, [nodes, links]);

  return (
    <svg
      ref={svgRef}
      height={height}
      width={width}
      className="border rounded-xl mx-auto w-full "
    />
  );
}

function drag(simulation: any) {
  return d3
    .drag<SVGCircleElement, any>()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

export const GraphViewTabContent = (props: { paperId: string }) => {
  const {
    data: paperDetails,
    isLoading: isPaperLoading,
    error: paperError,
  } = useGetPaperDetailsQuery({
    paperId: props.paperId,
    fields: ["title", "paperId", "citationCount", "referenceCount"],
  });

  const {
    data: references,
    isLoading: isRefsLoading,
    error: refsError,
  } = useGetPaperReferencesQuery({
    paperId: props.paperId,
    fields: ["title", "paperId", "citationCount"],
  });

  const {
    data: citations,
    isLoading: isCitsLoading,
    error: citsError,
  } = useGetPaperCitationsQuery({
    paperId: props.paperId,
    fields: ["title", "paperId", "citationCount"],
  });

  if (isPaperLoading || isRefsLoading || isCitsLoading) {
    return <div>Loading graph...</div>;
  }

  const error = paperError || refsError || citsError;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!paperDetails) {
    return <div>Paper not found.</div>;
  }

  const paper = {
    ...paperDetails,
    references: references.data.map((e) => e.citedPaper),
    citations: citations.data.map((e) => e.citingPaper),
  };

  console.log(paper);

  const referenceCount = 10;
  const citationCount = 10;

  // Combine the paper with its references and citations
  const graph = constructGraphFromPaper(paper, referenceCount, citationCount);

  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Beta Notice</AlertTitle>
        <AlertDescription>
          The graph view is in a very early stage. We're actively exploring what
          types of graphs and visuals would be most useful. Please let us know
          what you'd like to see here at the discord!
        </AlertDescription>
      </Alert>

      <GraphView graph={graph} />
    </div>
  );
};
