import { Paper } from "@/types/semantic-scholar-types";

const getSymbolSizeFromCitationCount = (citationCount: number | undefined, min = 10, max = 60) => {
    const count = citationCount || 0;
    const scaled = Math.sqrt(count); // Or use Math.log10(count + 1)
    return Math.min(max, Math.max(min, scaled));
};


const sortPapersByCitationCount = (papers: Paper[]) =>
    papers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))


const getRandomNumber = () => Math.floor(Math.random() * (50 - (-50) + 1)) + (-50);

const addNodesAndCreateLinks = (
    nodes: Node[],
    links: Link[],
    papers: Paper[],
    sourcePaperId: string,
    category: string,
    startX: number,
    startY: number,
    xOffset: number,
    yGap: number,
    minCitations: number,
    maxCitations: number
) => {
    for (const paper of papers) {
        const i = papers.indexOf(paper);
        const x = startX + xOffset;
        const y = startY + i * yGap;

        nodes.push({
            id: paper.paperId,
            name: paper.title,
            category: category,
            value: paper.citationCount,
            symbolSize: normalizeValue(paper.citationCount || 0, minCitations, maxCitations, 10, 60),
            x,
            y
        })

        links.push({
            source: sourcePaperId,
            target: paper.paperId,
        })
    }

    return {
        nodes,
        links
    }
}


type Node = {
    id: string,
    name: string,
    category: string,
    value: string,
    symbolSize: number,
    x: number,
    y: number,
}
type Link = {
    source: string,
    target: string,
}

const normalizeValue = (
    value: number,
    minValue: number,
    maxValue: number,
    minScale = 10,
    maxScale = 60
) => {
    if (maxValue === minValue) return (minScale + maxScale) / 2; // Prevent divide-by-zero
    return minScale + ((value - minValue) / (maxValue - minValue)) * (maxScale - minScale);
};

export const constructGraphFromPaper = (paper: Paper, referenceCount: number, citationCount: number) => {
    const references = sortPapersByCitationCount(paper.references || []).slice(0, referenceCount);
    const citations = sortPapersByCitationCount(paper.citations || []).slice(0, citationCount);

    const getMinMax = (arr: Paper[]) => {
        const counts = arr.map(p => p.citationCount || 0);
        return {
            min: Math.min(...counts),
            max: Math.max(...counts),
        };
    };

    const { min: minRefCitations, max: maxRefCitations } = getMinMax(references);
    const { min: minCitCitations, max: maxCitCitations } = getMinMax(citations);

    const categories = [
        {
            name: "Main"
        },
        {
            name: "Recommended"
        },
        {
            name: "Citations"
        },
        {
            name: "References"
        }
    ];
    const nodes: Node[] = [];
    const links: Link[] = [];

    const centerX = 0;
    const centerY = 0;

    nodes.push({
        id: paper.paperId,
        name: paper.title,
        category: "Main",
        value: 1,
        symbolSize: 50,
        x: centerX,
        y: 250,
    });
    addNodesAndCreateLinks(nodes, links, references, paper.paperId, "References",
        centerX, centerY, -200, 60, minRefCitations, maxRefCitations
    );

    addNodesAndCreateLinks(nodes, links, citations, paper.paperId, "Citations",
        centerX, centerY, 200, 60, minCitCitations, maxCitCitations
    );

    return {
        categories,
        nodes,
        links
    }
};