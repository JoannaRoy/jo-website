import React from "react";
import { Link } from "react-router-dom";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { BlogContent } from "./BlogContent";

const Blog: React.FC = () => {
  return (
    <div>
      <PageGrid columns={1}>
        <div className="flex flex-row justify-center items-center w-full">
          <div className="w-[90vw] flex flex-col justify-center items-center p-8">
            <h1
              className="text-7xl mb-4 font-bold text-xxl"
              style={{ fontSize: "2rem" }}
            >
              hummus purée
            </h1>
            <h2 className="text-xl">a blog</h2>
          </div>
        </div>

        {Object.entries(BlogContent).map(([header, posts]) => (
          <div key={header} className="w-screen flex flex-col items-center">
            <BlogPostSectionHeader
              title={posts[0].data.header}
              index={Object.keys(BlogContent).indexOf(header)}
              className="w-[90vw] p-4 m-2"
            />

            <div className="flex flex-col gap-4 w-[90vw]">
              {posts.map((post, index) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <BlogPostPreview title={post.data.title} index={index} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </PageGrid>
    </div>
  );
};

const BlogPostSectionHeader = ({
  title,
  index,
  className,
}: {
  title: string | undefined;
  index: number;
  className?: string;
}) => {
  const colors = [
    "bg-gradient-to-r from-pink-200 via-rose-200 to-orange-200",
    "bg-gradient-to-r from-orange-200 via-rose-200 to-pink-200",
  ];

  return (
    <div className={`${colors[index % colors.length]} rounded-sm ${className}`}>
      <h1 className="text-xl font-bold text-xxl drop-shadow-sm text-center">
        {title}
      </h1>
    </div>
  );
};

const BlogPostPreview = ({
  title,
  index,
  className,
}: {
  title: string;
  index: number;
  className?: string;
}) => {
  const fillColors = ["bg-pink-100", "bg-orange-100"];
  return (
    <div
      className={`rounded-sm justify-center text-center m-1 p-2 ${
        fillColors[index % fillColors.length]
      } drop-shadow-sm 
      transition-all duration-200 hover:transform hover:-translate-y-.5 hover:-translate-x-1 hover:drop-shadow-md ${className}`}
    >
      <h2>{title}</h2>
    </div>
  );
};

export { Blog, BlogPostSectionHeader };
