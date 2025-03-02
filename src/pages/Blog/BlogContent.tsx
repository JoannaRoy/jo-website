import matter from "gray-matter";
import { Buffer } from "buffer";
import Papa from "papaparse";

import blogMetadataCsv from "../../blog_data/blog_metadata.csv?raw";
const parseMetadata = (csvString: string) => {
  return;
};

interface BlogMetadataRow {
  chapter_number: string;
  chapter_title: string;
  chapter_description: string;
}
export const blogMetadata = parseMetadata(blogMetadataCsv);

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
    const slug = filePath.replace("../../blog_data/", "").replace(".md", "");

    if (!acc[header]) {
      acc[header] = [];
    }
    const result = Papa.parse<BlogMetadataRow>(blogMetadataCsv, {
      header: true,
    });
    const chapterDescription = result.data.find(
      (row) => row.chapter_title === header
    )?.chapter_description;

    if (data.draft !== "true") {
      acc[header].push({
        data: {
          title: data.title,
          date: data.date,
          tags: data.tags,
          draft: data.draft,
        },
        content: markdownContent,
        slug: slug,
        formattedHeader: formattedHeader,
        chapterDescription: chapterDescription,
      });
    } else if (data.draft == "true" && acc[header].length < 1) {
      acc[header].push({
        data: {
          title: data.title,
          date: data.date,
          tags: data.tags,
          draft: data.draft,
        },
        content: "COMING SOON",
        slug: slug,
        formattedHeader: formattedHeader,
        chapterDescription: chapterDescription,
      });
    }
    if (acc[header].length > 1 && acc[header][0].content == "COMING SOON") {
      acc[header].splice(0, 1);
    }
    return acc;
  },
  {} as Record<
    string,
    Array<{
      data: {
        title: string;
        date: string;
        tags: string[];
        draft: boolean;
      };
      content: string;
      slug: string;
      formattedHeader: string;
      chapterDescription: string | undefined;
    }>
  >
);
