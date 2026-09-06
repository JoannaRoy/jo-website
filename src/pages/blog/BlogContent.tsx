import matter from "gray-matter";
import { Buffer } from "buffer";
import Papa from "papaparse";

import blogMetadataCsv from "../../blog_data/blog_metadata.csv?raw";


const TRUE = "true";

interface BlogMetadataRow {
  folder: string;
  legacy_folder: string;
  chapter_description: string;
}

interface BlogPost {
  data: {
    title: string;
    date: string;
    draft: string;
    previewImage?: string;
    externalUrl?: string;
  };
  content: string;
  slug: string;
  statsSlug: string;
  formattedHeader: string;
  seriesOrder: number;
  chapterDescription?: string;
}

interface BlogContentStructure {
  [key: string]: BlogPost[];
}

globalThis.Buffer = Buffer;

const metadataRows = Papa.parse<BlogMetadataRow>(blogMetadataCsv, {
  header: true,
}).data.filter((row) => row.folder);

const metadataByFolder = Object.fromEntries(
  metadataRows.map((row, index) => [row.folder, { ...row, order: index }])
);

export const blogFolderByLegacy: Record<string, string> = Object.fromEntries(
  metadataRows
    .filter((row) => row.legacy_folder)
    .map((row) => [row.legacy_folder, row.folder])
);

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
    const metadata = header ? metadataByFolder[header] : undefined;
    const formattedHeader = header ? header.replace(/_/g, " ") : "";
    const slug = filePath.replace("../../blog_data/", "").replace(".md", "");
    const filename = slug.split("/").slice(1).join("/");
    const statsSlug = metadata?.legacy_folder
      ? `${metadata.legacy_folder}/${filename}`
      : slug;

    if (!acc[header]) {
      acc[header] = [];
    }

    if (data.draft !== TRUE) {
      acc[header].push({
        data: {
          title: data.title,
          date: data.date,
          draft: data.draft,
          previewImage: data["preview image"],
          externalUrl: data["external url"],
        },
        content: markdownContent,
        slug: slug,
        statsSlug,
        formattedHeader,
        seriesOrder: metadata?.order ?? Number.MAX_SAFE_INTEGER,
        chapterDescription: metadata?.chapter_description,
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
