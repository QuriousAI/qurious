import { Paper } from "@workspace/semantic-scholar/src";

const sortPapersByCitationCount = (papers: Paper[]) =>
  [...papers].sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));

const addNodesAndCreateLinks = (
  nodes: Node[],
  links: Link[],
  papers: Paper[],
  sourcePaperId: string,
  category: string,
) => {
  for (const paper of papers) {
    nodes.push({
      id: paper.paperId,
      label: paper.title,
      type: category,
    });
    links.push({
      source: sourcePaperId,
      target: paper.paperId,
    });
  }

  return {
    nodes,
    links,
  };
};

type Node = {
  id: string;
  label: string;
  type: string;
};
type Link = {
  source: string;
  target: string;
};

export const constructGraphFromPaper = (
  paper: Paper,
  referenceCount: number,
  citationCount: number,
) => {
  const references = sortPapersByCitationCount(paper.references || []).slice(
    0,
    referenceCount,
  );
  const citations = sortPapersByCitationCount(paper.citations || []).slice(
    0,
    citationCount,
  );

  const nodes: Node[] = [];
  const links: Link[] = [];

  nodes.push({
    id: paper.paperId,
    label: paper.title,
    type: "Main",
  });

  addNodesAndCreateLinks(nodes, links, references, paper.paperId, "References");

  addNodesAndCreateLinks(nodes, links, citations, paper.paperId, "Citations");

  const graph = { nodes, links };

  return graph;
};
