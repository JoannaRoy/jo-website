import React from "react";
import Markdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { PageGrid } from "@/components/item-grids";
import { BlogContent } from "@/pages/blog/BlogContent";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

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

  const getImageUrl = (imageName: string) => {
    return new URL(`@/blog_data/preview_images/${imageName}`, import.meta.url).href;
  };

  return (
    <PageGrid columns={1}>
      <div className="p-4 md:p-8 mx-auto w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] h-full">
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:translate-x-[-4px] duration-200 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base md:text-lg font-semibold">Back to Blog</span>
        </button>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
          {post?.data.previewImage && (
            <div className="relative w-full h-32 md:h-48 lg:h-56 overflow-hidden">
              <img 
                src={getImageUrl(post.data.previewImage)}
                alt={post.data.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
            </div>
          )}
          
          <div className="p-6 md:p-10 lg:p-12">
            <div className="mb-4">
              <span className="text-xs md:text-sm font-bold px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 uppercase tracking-wider">
                {post?.formattedHeader}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-bold text-gray-900">
              {post?.data.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-8 md:mb-10 gap-3 md:gap-0 pb-6 border-b border-gray-200">
              <p className="text-sm md:text-base text-gray-600 font-medium">
                {post?.data.date}
              </p>
              {post?.data.tags && (
                <div className="flex flex-wrap gap-2">
                  {post?.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-purple-200 to-pink-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="text-left leading-6 md:leading-8 prose prose-base md:prose-lg prose-ol:list-decimal prose-ul:list-disc prose-p:my-3 md:prose-p:my-5 max-w-none text-xs md:text-lg text-gray-800">
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
          </div>
        </div>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
