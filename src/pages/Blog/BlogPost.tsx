import React from "react";
import Markdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
import { BlogContent } from "./BlogContent";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import BlogTitle from "./BlogTitle";

interface BlogPostProps {
  title?: string;
  date?: string;
  content?: string;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = () => {
  const { header, title } = useParams();
  const navigate = useNavigate();
  const slug = `${header}/${title}`;
  const post = BlogContent[header as string].find((post) => post.slug === slug);

  const handleBackClick = () => {
    navigate("/blog");
  };

  return (
    <PageGrid columns={1}>
      <BlogTitle className="mb-0" />
      <div className="p-4 md:p-8 mx-auto w-[95vw] md:w-[90vw] h-full">
        <button
          onClick={handleBackClick}
          className="mb-4 flex items-center text-[var(--turquoise)] hover:text-[var(--dark-turquoise)] transition-colors bg-gradient-to-br from-green-200 to-purple-300 p-3 md:p-5 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex flex-row items-center">
            <h1 className="text-lg md:text-2xl text-[var(--turquoise)] hover:text-black transition-colors font-bold">
              Back to Blog
            </h1>
          </div>
        </button>

        <PlainBox
          borderColor="var(--turquoise)"
          className="bg-white p-4 md:p-15 shadow-md"
        >
          <h1 className="text-2xl md:text-4xl mb-4 font-bold">
            {post?.data.title}
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between w-full mb-4 md:mb-8 gap-2 md:gap-0">
            <p className="text-left" style={{ color: "var(--turquoise)" }}>
              {post?.data.date}
            </p>
            {post?.data.tags && (
              <div className="flex flex-wrap gap-2 md:gap-4">
                {post?.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-[var(--turquoise)] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-left leading-6 md:leading-7 prose prose-ol:list-decimal prose-ul:list-disc prose-p:my-3 md:prose-p:my-4 max-w-none text-sm md:text-base">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                p: ({ children, ...props }) => {
                  if (
                    children &&
                    Array.isArray(children) &&
                    children.length === 1 &&
                    children[0] === "<br>"
                  ) {
                    return <div className="my-4 md:my-6"></div>;
                  }
                  return (
                    <p className="my-3 md:my-4" {...props}>
                      {children}
                    </p>
                  );
                },
                h1: ({ children, ...props }) => (
                  <h1
                    className="text-2xl md:text-3xl font-bold mt-6 md:mt-8 mb-3 md:mb-4"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2
                    className="text-xl md:text-2xl font-bold mt-5 md:mt-6 mb-2 md:mb-3"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3
                    className="text-lg md:text-xl font-bold mt-4 md:mt-5 mb-2"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4
                    className="text-base md:text-lg font-bold mt-3 md:mt-4 mb-1 md:mb-2"
                    {...props}
                  >
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5
                    className="text-sm md:text-base font-bold mt-2 md:mt-3 mb-1"
                    {...props}
                  >
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6
                    className="text-xs md:text-sm font-bold mt-2 md:mt-3 mb-1"
                    {...props}
                  >
                    {children}
                  </h6>
                ),
                ul: ({ children, ...props }) => {
                  if (
                    children &&
                    Array.isArray(children) &&
                    children.length === 1 &&
                    (children[0] === "*" || children[0] === "-")
                  ) {
                    return <div className="my-4 md:my-6"></div>;
                  }
                  return (
                    <ul
                      className="list-disc pl-4 md:pl-5 my-3 md:my-4 space-y-1 md:space-y-2"
                      {...props}
                    >
                      {children}
                    </ul>
                  );
                },
                ol: ({ children, ...props }) => {
                  return (
                    <ol
                      className="list-decimal pl-4 md:pl-5 my-3 md:my-4 space-y-1 md:space-y-2"
                      {...props}
                    >
                      {children}
                    </ol>
                  );
                },
                li: ({ children, ...props }) => {
                  return (
                    <li className="ml-1 md:ml-2 pl-1" {...props}>
                      {children}
                    </li>
                  );
                },
              }}
            >
              {post?.content}
            </Markdown>
          </div>
        </PlainBox>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
