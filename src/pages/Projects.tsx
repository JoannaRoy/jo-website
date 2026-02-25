import { ContentCard } from "@/components/content-card";
import { PageGrid } from "@/components/item-grids";
import { useSortToggle } from "@/hooks/useSortToggle";
import { AllProjects } from "@/pages/projects/ProjectContent";

const categoryColorMap: Record<string, string> = {
  "Coding Projects": "#f472b6",
  "Research": "#60a5fa",
  "Other": "#22c55e",
};

const categoryOrder = ["Coding Projects", "Research", "Other"];

const Projects = () => {
  const { sortBy, SortToggle } = useSortToggle({
    options: [
      { id: "category", label: "category" },
      { id: "date", label: "date" },
      { id: "title", label: "title" },
    ],
    defaultOption: "date",
  });

  const sortedProjects = [...AllProjects].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  });

  return (
    <PageGrid columns={1}>
      <div className="w-full px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Projects
          </h1>
          <SortToggle />
        </div>

        <div className="flex flex-col gap-3 w-full">
          {sortedProjects.map((project) => (
            <ContentCard
              key={project.title}
              title={project.title}
              subtitle={project.date}
              category={project.category}
              categoryColor={categoryColorMap[project.category] || "#9ca3af"}
              description={project.content}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </PageGrid>
  );
};

export default Projects;
