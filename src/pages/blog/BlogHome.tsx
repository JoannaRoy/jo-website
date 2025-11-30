import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BlogContent } from "@/pages/blog/BlogContent";
import { PageGrid } from "@/components/item-grids";
import BlogTitle from "@/pages/blog/BlogTitle";
import { TabScroll } from "@/components/tab-scroll";

const Blog: React.FC = () => {
  const [hoveredChapter, setHoveredChapter] = useState<string>(Object.keys(BlogContent)[0]);

  const tabs = Object.entries(BlogContent).map(([header, posts]) => ({
    id: header,
    label: posts[0].formattedHeader,
    description: posts[0].chapterDescription,
    content: (position: string) => (
      <>
        {posts.map((post) => (
          <Link
            key={`${post.slug}-${position}`}
            to={`/blog/${post.slug}`}
            className="flex-shrink-0 w-[280px] md:w-[350px]"
          >
            <BlogPostPreview
              title={post.data.title}
              date={post.data.date}
              chapterName={post.formattedHeader}
              isHighlighted={hoveredChapter === header}
              previewImage={post.data.previewImage}
            />
          </Link>
        ))}
      </>
    )
  }));

  return (
    <PageGrid columns={1} style={{ alignItems: "left" }}>
      <TabScroll 
        tabs={tabs}
        headerComponent={<BlogTitle />}
        onTabHover={setHoveredChapter}
      />
    </PageGrid>
  );
};

const BlogPostPreview = ({
  title,
  date,
  chapterName,
  isHighlighted,
  previewImage,
}: {
  title: string;
  date: string;
  chapterName: string;
  isHighlighted: boolean;
  previewImage?: string;
}) => {
  const getImageUrl = (imageName: string) => {
    return new URL(`../../blog_data/preview_images/${imageName}`, import.meta.url).href;
  };

  return (
    <div className={`group flex flex-col bg-white/70 backdrop-blur-md rounded-xl hover:bg-white/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border h-full overflow-hidden ${
      isHighlighted ? "border-gray-300/70" : "border-white/50"
    }`}>
      <div className="relative w-full h-40 md:h-48 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
        {previewImage ? (
          <img 
            src={getImageUrl(previewImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow p-5 md:p-6">
        <div>
          <div className="mb-3">
            <span className={`text-[0.65rem] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-200 ${
              isHighlighted 
                ? "bg-gray-300 text-gray-900" 
                : "text-gray-500 bg-gray-100"
            }`}>
              {chapterName}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors line-clamp-2">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/60">
          <p className="text-xs md:text-sm text-gray-500 font-medium">{date}</p>
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Blog;
