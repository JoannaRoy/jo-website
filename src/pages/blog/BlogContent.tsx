import matter from "gray-matter";
import { Buffer } from "buffer";
import Papa from "papaparse";

import blogMetadataCsv from "../../blog_data/blog_metadata.csv?raw";


const TRUE = "true";

interface BlogMetadataRow {
  chapter_number: string;
  chapter_title: string;
  chapter_description: string;
}

interface BlogPost {
  data: {
    title: string;
    date: string;
    tags: string[];
    draft: string;
    previewImage?: string;
  };
  content: string;
  slug: string;
  formattedHeader: string;
  chapterDescription?: string;
}

interface BlogContentStructure {
  [key: string]: BlogPost[];
}

globalThis.Buffer = Buffer;

const markdownFiles = import.meta.glob("../../blog_data/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const unsortedContent = Object.entries(markdownFiles).reduce(
  (acc: BlogContentStructure, [filePath, content]) => {
    if (filePath.includes('/preview_images/')) {
      return acc;
    }
    const { data, content: markdownContent } = matter(content as string);
    const header = filePath.replace("../../blog_data/", "").split("/")[0];
    const formattedHeader = header ? (header
      .replace(/^0/, "")
        .replace(/^[0-9]{2}(?=\D)/, "chapter $&:")
        .replace(/^[0-9]{1}(?=\D)/, "chapter $&:")
        .replace(/_/g, " ")) : "";
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

    if (data.draft !== TRUE) {
      acc[header].push({
        data: {
          title: data.title,
          date: data.date,
          tags: data.tags,
          draft: data.draft,
          previewImage: data["preview image"],
        },
        content: markdownContent,
        slug: slug,
        formattedHeader: formattedHeader,
        chapterDescription: chapterDescription,
      });
    }
    return acc; 
  }, {});

export const BlogContent = Object.fromEntries(
  Object.entries(unsortedContent).map(([header, posts]) => [
    header,
    posts.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime())
  ])
)
