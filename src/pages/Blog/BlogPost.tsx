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
      <div className="p-8 mr-8 w-[90vw] h-full">
        <button
          onClick={handleBackClick}
          className="mb-4 flex items-center text-[var(--turquoise)] hover:text-[var(--dark-turquoise)] transition-colors bg-gradient-to-br from-green-200 to-purple-300 p-5 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
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
            <h1 className="text-2xl text-[var(--turquoise)] hover:text-black transition-colors font-bold">
              Back to Blog
            </h1>
          </div>
        </button>

        <PlainBox
          borderColor="var(--turquoise)"
          className="bg-white p-15 shadow-md"
        >
          <h1 className="text-4xl mb-4 font-bold">{post?.data.title}</h1>
          <div className="flex justify-between w-full mb-8">
            <p className="text-left" style={{ color: "var(--turquoise)" }}>
              {post?.data.date}
            </p>
            {post?.data.tags && (
              <div className="flex gap-4">
                {post?.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-[var(--turquoise)] px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-left leading-7 prose prose-ol:list-decimal prose-ul:list-disc prose-p:my-4 max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                p: ({ node, ...props }) => {
                  if (
                    props.children &&
                    Array.isArray(props.children) &&
                    props.children.length === 1 &&
                    props.children[0] === "<br>"
                  ) {
                    return <div className="my-6"></div>;
                  }
                  return <p className="my-4" {...props} />;
                },
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-bold mt-5 mb-2" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-lg font-bold mt-4 mb-2" {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 className="text-base font-bold mt-3 mb-1" {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 className="text-sm font-bold mt-3 mb-1" {...props} />
                ),
                ul: ({ node, ...props }) => {
                  if (
                    props.children &&
                    Array.isArray(props.children) &&
                    props.children.length === 1 &&
                    (props.children[0] === "*" || props.children[0] === "-")
                  ) {
                    return <div className="my-6"></div>;
                  }
                  return (
                    <ul className="list-disc pl-5 my-4 space-y-2" {...props} />
                  );
                },
                ol: ({ node, ...props }) => {
                  return (
                    <ol
                      className="list-decimal pl-5 my-4 space-y-2"
                      {...props}
                    />
                  );
                },
                li: ({ node, ...props }) => {
                  return <li className="ml-2 pl-1" {...props} />;
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
