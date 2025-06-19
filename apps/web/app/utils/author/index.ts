import { Author } from "@/semantic-scholar-types";

export function getAuthorString(authors: Author[]): string {
  if (!authors || authors.length === 0) {
    return "";
  }

  if (authors.length === 1) {
    if (!authors[0].name) {
      throw new Error("No author name found");
    }

    return authors[0].name;
  }

  if (authors.length === 2) {
    if (!authors[0].name || !authors[1].name) {
      throw new Error("No author name found");
    }

    return `${authors[0].name} and ${authors[1].name}`;
  }

  if (authors.length <= 3) {
    return `${authors
      .slice(0, -1)
      .map((author) => author.name)
      .join(", ")}, and ${authors[authors.length - 1].name}`;
  }

  return `${authors
    .slice(0, 3)
    .map((author) => author.name)
    .join(", ")}, et al.`;
}
