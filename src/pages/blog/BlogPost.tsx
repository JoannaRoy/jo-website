import { useNavigate, useParams } from "react-router-dom";
import { BlogPostMarkdown } from "@/components/blog-post-markdown";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { PageGrid } from "@/components/item-grids";
import { ReactionBar } from "@/components/reaction-bar";
import { TagPills } from "@/components/tag-pills";
import { ViewCount } from "@/components/view-count";
import { useViewCount } from "@/hooks/useViewCount";
import { BlogContent } from "@/pages/blog/BlogContent";

const BlogPost = () => {
  const { header, title } = useParams();
  const navigate = useNavigate();
  const slug = `${header}/${title}`;
  const post = BlogContent[header as string].find((post) => post.slug === slug);
  const { views, loading: viewsLoading } = useViewCount(slug, true);

  const handleBackClick = () => {
    navigate("/blog");
  };

  const getImageUrl = (imageName: string) => {
    return new URL(`../../blog_data/preview_images/${imageName}`, import.meta.url).href;
  };

  return (
    <PageGrid columns={1}>
      <div className="p-4 md:p-8 mx-auto w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] h-full">
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:translate-x-[-4px] duration-200 group"
          type="button"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" title="Back to Blog Home" />
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
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/10"></div>
            </div>
          )}
          
          
          <div className="p-6 md:p-10 lg:p-12">
            <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-3">
              <span className="text-xs md:text-xs font-bold px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 uppercase tracking-wider">
                {post?.formattedHeader}
              </span>
              <ReactionBar slug={slug} />
            </div>
            
            <div className="flex flex-row items-center justify-between w-full mb-8 md:mb-10 gap-3 py-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 m-0">
                {post?.data.title}
              </h1>
              <ViewCount views={views} loading={viewsLoading} className="ml-4" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-8 md:mb-10 gap-3 md:gap-0 pb-6 border-b border-gray-200">
              <p className="text-sm md:text-base text-gray-600 font-medium">
                {post?.data.date}
              </p>
              {post?.data.tags && (
                <TagPills tags={post.data.tags} />
              )}
            </div>
            <BlogPostMarkdown markdown={post?.content ?? ""} />
          </div>
        </div>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
