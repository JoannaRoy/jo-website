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
              {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <BlogPostPreview title={post.data.title} />
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
    "bg-pink-300",
    "bg-red-300",
    "bg-orange-300",
    "bg-purple-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-gray-300",
  ];

  return (
    <div className={`${colors[index % colors.length]} rounded-sm ${className}`}>
      <h1 className="text-xl font-bold text-xxl drop-shadow-sm ">{title}</h1>
    </div>
  );
};

const BlogPostPreview = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`bg-[var(--white)] rounded-sm justify-center text-center m-1 p-2 outline-2 outline-pink-200 drop-shadow-sm 
      transition-all duration-200 hover:transform hover:-translate-y-.5 hover:-translate-x-1 hover:drop-shadow-md ${className}`}
    >
      <h2>{title}</h2>
    </div>
  );
};

export { Blog, BlogPostSectionHeader };
