import { Buffer } from "buffer";
import matter from "gray-matter";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  overview: string;
  content: string;
  links: ProjectLink[];
  category: string;
  categoryColor: string;
  date: string;
}

export interface ProjectCategory {
  name: string;
  color: string;
  projects: Project[];
}

globalThis.Buffer = Buffer;

const categoryMeta: Record<string, { displayName: string; color: string }> = {
  coding_projects: { displayName: "Coding Projects", color: "bg-pink-400/60" },
  research: { displayName: "Research", color: "bg-blue-400/60" },
  other: { displayName: "Other", color: "bg-green-400/60" },
};

const markdownFiles = import.meta.glob("../../project_data/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const AllProjects: Project[] = Object.entries(markdownFiles).map(
  ([filePath, raw]) => {
    const { data, content } = matter(raw as string);
    const category = filePath.replace("../../project_data/", "").split("/")[0];

    const meta = categoryMeta[category] ?? {
      displayName: category,
      color: "bg-gray-400/60",
    };

    return {
      title: data.title,
      overview: data.overview,
      links: (data.links ?? []) as ProjectLink[],
      content: content.trim(),
      category: meta.displayName,
      categoryColor: meta.color,
      date: data.date ?? "",
    };
  }
);
