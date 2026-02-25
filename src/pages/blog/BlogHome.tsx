import { Link } from "react-router-dom";
import { ContentCard } from "@/components/content-card";
import { PageGrid } from "@/components/item-grids";
import { useSortToggle } from "@/hooks/useSortToggle";
import { BlogContent } from "@/pages/blog/BlogContent";

const getPreviewImageUrl = (imageName: string) =>
  new URL(`../../blog_data/preview_images/${imageName}`, import.meta.url).href;

const chapterColorMap: Record<string, string> = {};
const chapterColors = ["#f472b6", "#60a5fa", "#22c55e", "#fbbf24", "#a78bfa"];
Object.keys(BlogContent).forEach((header, index) => {
  chapterColorMap[header] = chapterColors[index % chapterColors.length];
});

type FeaturedArticle = {
  id: string;
  title: string;
  date: string;
  previewImage?: string;
  to: string;
  category: string;
  preview: string;
};

const featuredArticles: FeaturedArticle[] = [
  {
    id: "tips-for-moving",
    title: "Tips for Moving Abroad",
    date: "2026-01-04",
    previewImage: "movin.png",
    to: "/tips-for-moving",
    category: "Featured",
    preview: "Some lessons I learned from moving to Germany.",
  },
];

const getPreviewText = (content: string, maxLength = 100): string => {
  const text = content.replace(/\s+/g, " ").trim().replace(/^#+\s+.*/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}...`;
};

const allPosts = [
  ...featuredArticles.map((a) => ({
    slug: a.id,
    to: a.to,
    title: a.title,
    date: a.date,
    previewImage: a.previewImage,
    chapter: a.category,
    chapterColor: "#fbbf24",
    isFeatured: true,
    chapterOrder: -1,
    preview: a.preview,
  })),
  ...Object.entries(BlogContent).flatMap(([header, posts], chapterIndex) =>
    posts.map((post, postIndex) => ({
      slug: post.slug,
      to: `/blog/${post.slug}`,
      title: post.data.title,
      date: post.data.date,
      previewImage: post.data.previewImage,
      chapter: post.formattedHeader,
      chapterColor: chapterColorMap[header],
      isFeatured: false,
      chapterOrder: chapterIndex * 100 + postIndex,
      preview: getPreviewText(post.content),
    }))
  ),
];

const Blog = () => {
  const { sortBy, SortToggle } = useSortToggle({
    options: [
      { id: "chapter", label: "chapter" },
      { id: "date", label: "date" },
    ],
    defaultOption: "date",
  });

  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.chapterOrder - b.chapterOrder;
  });

  return (
    <PageGrid columns={1}>
      <div className="w-full px-3 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Blog
          </h1>
          <SortToggle />
        </div>

        <div className="flex flex-col gap-3">
          {sortedPosts.map((post) => (
            <Link key={post.slug} to={post.to}>
              <ContentCard
                title={post.title}
                subtitle={post.date}
                image={post.previewImage ? getPreviewImageUrl(post.previewImage) : undefined}
                category={post.chapter}
                categoryColor={post.chapterColor}
                isFeatured={post.isFeatured}
                description={post.preview}
              />
            </Link>
          ))}
        </div>
      </div>
    </PageGrid>
  );
};

export default Blog;
