import matter from "gray-matter";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

// Import all Markdown files from the "posts" folder
const markdownFiles = import.meta.glob("../../blog_data/*/*.md", {
  as: "raw",
  eager: true,
});

export const BlogContent = Object.entries(markdownFiles).reduce(
  (acc, [filePath, content]) => {
    const { data, content: markdownContent } = matter(content as string);
    const header = filePath.replace("../../blog_data/", "").split("/")[0];
    const formattedHeader = header
      .replace(/^0/, "")
      .replace(/^[0-9]{2}(?=\D)/, "chapter $&:")
      .replace(/^[0-9]{1}(?=\D)/, "chapter $&:")
      .replace(/_/g, " ");

    if (!acc[header]) {
      acc[header] = [];
    }

    acc[header].push({
      data: {
        header: formattedHeader,
        title: data.title,
        date: data.date,
        tags: data.tags,
      },
      content: markdownContent,
      slug: filePath.replace("../../blog_data/", "").replace(".md", ""),
    });

    return acc;
  },
  {} as Record<
    string,
    Array<{
      data: {
        header: string;
        title: string;
        date: string;
        tags: string[];
      };
      content: string;
      slug: string;
    }>
  >
);
