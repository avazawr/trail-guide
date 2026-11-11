export function formattedData(data: number): string {
  return new Date(data * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// sanitize description
import sanitizeHtml from "sanitize-html";

export function sanitizeDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["p", "strong", "em", "ul", "ol", "li", "a", "b", "i", "u"],
    allowedAttributes: {
      a: ["href"],
    },
    allowedSchemes: ["http", "https"],
  });
}

// slugify
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
