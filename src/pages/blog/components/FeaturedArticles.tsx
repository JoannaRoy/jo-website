import { Link } from "react-router-dom";

export type FeaturedArticleProps = {
  id: string;
  title: string;
  date: string;
  description: string;
  to: string;
  previewImage?: string;
};

export type FeaturedArticlesProps = {
  articles: ReadonlyArray<FeaturedArticleProps>;
  viewsData: Record<string, number> | undefined;
  viewsLoading: boolean;
};

const getPreviewImageUrl = (imageName: string) =>
  new URL(`../../../blog_data/preview_images/${imageName}`, import.meta.url).href;

export const FeaturedArticles = ({
  articles,
  viewsData,
  viewsLoading,
}: FeaturedArticlesProps) => {
  return (
    <section className="w-full px-4 md:px-8 mt-2 mb-2">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-adventure mb-4">
        Featured <span className="text-pink-400/90 drop-shadow-sm">★</span>
      </h2>

      <div className="flex gap-4 md:gap-4 overflow-x-auto pt-2 scrollbar-hide">
        {articles.map((a) => (
          <Link key={a.id} to={a.to} className="shrink-0 w-[280px] md:w-[350px]">
            <div
              className="group flex flex-col bg-white/70 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/90 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full overflow-hidden"
            >
              <div className="relative w-full h-20 md:h-24 bg-linear-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
                {a.previewImage ? (
                  <img
                    src={getPreviewImageUrl(a.previewImage)}
                    alt={a.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                )}
              </div>
              <div className="flex flex-col justify-between grow p-5 md:p-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colours line-clamp-2">
                    {a.title}
                  </h2>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/60">
                  <p className="text-xs md:text-sm text-gray-500 font-medium">{a.date}</p>
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">
                  {viewsLoading ? "Loading..." : `${viewsData?.[a.id] || 0} views`}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};


