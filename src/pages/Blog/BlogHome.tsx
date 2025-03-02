import React from "react";
import { Link } from "react-router-dom";
import { BlogContent } from "./BlogContent";
import { PageGrid } from "../../components/ItemGrids";
import { BlogTag } from "./BlogTags";
import BlogTitle from "./BlogTitle";

const Blog: React.FC = () => {
  const [selectedHeader, setSelectedHeader] = React.useState<string | null>(
    null
  );
  const [scrolledHeader, setScrolledHeader] = React.useState<string | null>(
    null
  );
  const [blogScroll, setBlogScroll] = React.useState<boolean>(false);

  const headerRefs = React.useRef<{
    [key: string]: React.RefObject<HTMLDivElement>;
  }>({});

  if (Object.keys(headerRefs.current).length === 0) {
    Object.keys(BlogContent).forEach((header) => {
      headerRefs.current[header] = React.createRef<HTMLDivElement>();
    });
  }

  if (scrolledHeader && headerRefs.current[scrolledHeader]?.current) {
    requestAnimationFrame(() => {
      headerRefs.current[scrolledHeader]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  }

  return (
    <PageGrid columns={1} style={{ alignItems: "left" }}>
      <BlogTitle
        onMouseEnter={() => setBlogScroll(false)}
        className="my-[5vh]"
      />

      <div className="flex flex-row w-full bg-gradient-to-br from-green-100 to-purple-200">
        <div className="flex flex-col justify-center w-1/2 pl-20 my-5">
          {Object.entries(BlogContent).map(([header, posts]) => (
            <div
              key={header}
              onMouseEnter={() => {
                setSelectedHeader(header);
                setScrolledHeader(header);
                setBlogScroll(true);
              }}
              onClick={() => {
                setSelectedHeader(header);
                setScrolledHeader(header);
              }}
            >
              <BlogPostSectionHeader
                title={posts[0].formattedHeader}
                chapterDescription={posts[0].chapterDescription}
                index={Object.keys(BlogContent).indexOf(header)}
                isSelected={header === selectedHeader}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-row w-1/2 h-[60vh] relative">
          {blogScroll ? (
            <div
              className="absolute inset-0 overflow-y-auto pr-4 pb-4"
              id="blog-scroll-container"
            >
              <div className="flex flex-col">
                {Object.entries(BlogContent).map(([header, posts]) => {
                  return (
                    <div
                      key={header}
                      ref={headerRefs.current[header]}
                      className="pt-5 px-10"
                    >
                      <div
                        className={`transition-all duration-300 p-10 rounded-lg w-full ${
                          selectedHeader === header
                            ? "bg-gray-100 shadow-md"
                            : ""
                        }`}
                        onMouseEnter={() => {
                          setSelectedHeader(header);
                        }}
                        onMouseLeave={() => {
                          setSelectedHeader(null);
                          setScrolledHeader(null);
                        }}
                      >
                        <div className="flex items-baseline gap-4">
                          <h1 className="text-2xl font-bold w-2/5">
                            {posts[0].formattedHeader}
                          </h1>
                        </div>
                        {posts.map((post) =>
                          post.content !== "COMING SOON" ? (
                            <Link key={post.slug} to={`/blog/${post.slug}`}>
                              <BlogPostPreview
                                title={post.data.title}
                                date={post.data.date}
                                tags={post.data.tags}
                                tagIndex={
                                  Object.keys(BlogContent).indexOf(header) +
                                  posts.indexOf(post)
                                }
                                description={post.content}
                                className="my-4"
                              />
                            </Link>
                          ) : (
                            <ComingSoonCard className="my-4" />
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-5/6 h-full p-8">
              <h2 className="font-semibold mb-4">Welcome to my blog!</h2>
              <p className="text-gray-700 mb-4 text-center">
                Each section is a collection of posts (I will be posting roughly
                1-2 per month) that follow a particular theme. Click or hover on
                the chapters to browse.
              </p>
              <p className="text-lg text-gray-700 text-center italic">
                Enjoy! :D
              </p>
            </div>
          )}
        </div>
      </div>
    </PageGrid>
  );
};

const BlogPostSectionHeader = ({
  title,
  chapterDescription,
  index,
  className,
  isSelected,
}: {
  title: string | undefined;
  chapterDescription: string | undefined;
  index: number;
  className?: string;
  isSelected?: boolean;
}) => {
  const borderColors = [
    "border-[#82ca9d]",
    "border-[#8884d8]",
    "border-blue-300",
  ];
  const fillColors = ["bg-emerald-100", "bg-purple-100", "bg-blue-100"];
  const widths = ["w-3/5", "w-2/3", "w-3/4", "w-4/5", "w-5/6", "w-9/10"];

  return (
    <div
      className={`rounded-l-sm border-t-7 border-l-7 border-b-7 justify-center text-center h-20 m-1 p-1 ${
        borderColors[index % borderColors.length]
      } ${widths[index % widths.length]} drop-shadow-sm
      transition-all duration-200 hover:transform hover:translate-x-2 hover:drop-shadow-md ${
        isSelected ? "translate-x-2 drop-shadow-md scale-105" : ""
      } ${className}`}
    >
      <div
        className={`w-full h-full flex items-center justify-center ${
          fillColors[index % fillColors.length]
        }`}
      >
        {!isSelected && (
          <h2
            className={`text-xl font-bold text-xxl drop-shadow-sm text-center`}
          >
            {title}
          </h2>
        )}
        {isSelected && (
          <p className="italic w-full p-2 leading-tight text-xxs">
            {chapterDescription}
          </p>
        )}
      </div>
    </div>
  );
};

const BlogPostPreview = ({
  title,
  description,
  date,
  tags,
  className,
}: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  tagIndex: number;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col p-6 items-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 w-full`}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-700">{date}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag: string) => (
          <BlogTag key={tag} name={tag} />
        ))}
      </div>
      <p className="text-sm text-gray-700">{description.slice(0, 100)}...</p>
    </div>
  );
};

const ComingSoonCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex flex-col p-6 items-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 w-full`}
    >
      <p className="text-sm text-gray-700">
        This section is coming soon. Check back later :)
      </p>
    </div>
  );
};

export default Blog;
