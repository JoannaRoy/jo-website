import { useState } from "react";
import { Link } from "react-router-dom";
import { DashRow } from "@/components/dash-row";
import { PageGrid } from "@/components/item-grids";
import { TabScroll } from "@/components/tab-scroll";
import { useBatchViewCounts } from "@/hooks/useBatchViewCounts";
import { BlogContent } from "@/pages/blog/BlogContent";
import BlogTitle from "./BlogTitle";
import { BlogPostPreview } from "./components/BlogPostPreview";
import { type FeaturedArticleProps, FeaturedArticles } from "./components/FeaturedArticles";

const dividerComponent = (
  <DashRow
    count={50}
    className="my-4"
    thicknessClassName="h-1"
    dashWidthClassName="w-4"
    colours={["bg-pink-400", "bg-blue-400", "bg-green-400"]}
  />
);

const Blog = () => {
  const [hoveredChapter, setHoveredChapter] = useState<string>(Object.keys(BlogContent)[0]);
  const featuredArticles: ReadonlyArray<FeaturedArticleProps> = [
    {
      id: "tips-for-moving",
      title: "Tips for Moving Abroad",
      description:
        "A reflection + practical advice on the ups and downs of moving to a new country, and what helped me adjust.",
      to: "/tips-for-moving",
    },
  ];

  const allSlugs = [
    ...Object.values(BlogContent).flat().map((post) => post.slug),
    ...featuredArticles.map((a) => a.id),
  ];
  const { data: viewsData, isLoading } = useBatchViewCounts(allSlugs);

  const tabColours = ["bg-pink-400/60", "bg-blue-400/60", "bg-green-400/60"];
  const tabs = Object.entries(BlogContent).map(([header, posts], index) => ({
    id: header,
    label: posts[0].formattedHeader,
    description: posts[0].chapterDescription,
    colour: tabColours[index % tabColours.length],
    content: (position: string) =>
      posts.map((post) => (
        <Link
          key={`${post.slug}-${position}`}
          to={`/blog/${post.slug}`}
          className="shrink-0 w-[280px] md:w-[350px]"
        >
          <BlogPostPreview
            title={post.data.title}
            date={post.data.date}
            chapterColour={tabColours[index % tabColours.length]}
            chapterName={post.formattedHeader}
            isHighlighted={hoveredChapter === header}
            previewImage={post.data.previewImage}
            views={viewsData?.[post.slug] || 0}
            viewsLoading={isLoading}
          />
        </Link>
      )),
  }));

  return (
    <PageGrid columns={1} style={{ alignItems: "left" }}>
      <div className="flex flex-col items-center justify-center">
        <BlogTitle />
      </div>
      {dividerComponent}
      <div className="w-full h-full bg-green-100 p-4">
        <FeaturedArticles
          articles={featuredArticles}
          viewsData={viewsData}
          viewsLoading={isLoading}
        />
      </div>
      <TabScroll
        tabs={tabs}
        onTabHover={setHoveredChapter}
        backgroundVariant="color"
        backgroundColor="bg-pink-100"
        dividerComponent={dividerComponent}
      />
    </PageGrid>
  );
};


export default Blog;
