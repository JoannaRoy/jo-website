import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CategoryTag } from "@/components/content-card";
import { BlogPostMarkdown } from "@/components/blog-post-markdown";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { PageGrid } from "@/components/item-grids";
import { ReactionBar } from "@/components/reaction-bar";
import { ViewCount } from "@/components/view-count";
import { useViewCount } from "@/hooks/useViewCount";
import { BlogContent, blogFolderByLegacy } from "@/pages/blog/BlogContent";

const chapterColorMap: Record<string, string> = {};
const chapterColors = ["#f472b6", "#60a5fa", "#22c55e", "#fbbf24", "#a78bfa"];
Object.keys(BlogContent).forEach((h, index) => {
  chapterColorMap[h] = chapterColors[index % chapterColors.length];
});

const BlogPost = () => {
  const { header, title } = useParams();
  const navigate = useNavigate();
  const canonicalHeader = header ? (blogFolderByLegacy[header] ?? header) : header;
  const legacyFolder = header ? blogFolderByLegacy[header] : undefined;
  const slug = `${canonicalHeader}/${title}`;
  const post = canonicalHeader
    ? BlogContent[canonicalHeader]?.find((post) => post.slug === slug)
    : undefined;
  const statsSlug = post?.statsSlug ?? slug;
  const { views, loading: viewsLoading } = useViewCount(statsSlug, !legacyFolder);
  const chapterColor = canonicalHeader ? chapterColorMap[canonicalHeader] : undefined;

  if (legacyFolder && title) {
    return <Navigate to={`/blog/${legacyFolder}/${title}`} replace />;
  }

  const handleBackClick = () => {
    navigate("/blog");
  };

  return (
    <PageGrid columns={1}>
      <div className="w-full max-w-full min-w-0 overflow-x-hidden px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-8">
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:translate-x-[-4px] duration-200 group"
          type="button"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" title="Back to Blog Home" />
          <span className="text-base md:text-lg font-semibold">Back to Blog</span>
        </button>
        <div>
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-3">
            {post?.formattedHeader && (
              <CategoryTag
                label={post.formattedHeader}
                color={chapterColor}
                tooltip={post.chapterDescription}
              />
            )}
            <ReactionBar slug={statsSlug} />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-8 md:mb-10 gap-3 py-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 m-0 min-w-0 break-words">
              {post?.data.title}
            </h1>
            <ViewCount views={views} loading={viewsLoading} className="sm:ml-4 shrink-0" />
          </div>
          
          <div className="w-full mb-8 md:mb-10 pb-6 border-b border-gray-200">
            <p className="text-sm md:text-base text-gray-600 font-medium">
              {post?.data.date}
            </p>
          </div>
          <BlogPostMarkdown markdown={post?.content ?? ""} postSlug={slug} />
        </div>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
