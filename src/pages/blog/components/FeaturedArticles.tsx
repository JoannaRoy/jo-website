import { Link } from "react-router-dom";

export type FeaturedArticleProps = {
  id: string;
  title: string;
  description: string;
  to: string;
};

export type FeaturedArticlesProps = {
  articles: ReadonlyArray<FeaturedArticleProps>;
  viewsData: Record<string, number> | undefined;
  viewsLoading: boolean;
};

export const FeaturedArticles = ({
  articles,
  viewsData,
  viewsLoading,
}: FeaturedArticlesProps) => {
  return (
    <section className="w-full px-4 md:px-8 mt-2 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 m-0 font-adventure mb-3">
        Featured <span className="text-pink-400/90 drop-shadow-sm">★</span>
      </h2>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {articles.map((a) => (
          <Link key={a.id} to={a.to} className="shrink-0 w-[280px] md:w-[350px]">
            <article className="group rounded-xl border border-blue-200/60 bg-white backdrop-blur-md hover:bg-white/80 transition-colours duration-200 p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 m-0 line-clamp-2 font-adventure">
                  {a.title}
                </h3>
                <span
                  className="shrink-0 text-blue-400/90 drop-shadow-sm"
                  aria-hidden="true"
                >
                  ★
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-700 m-0 line-clamp-2">
                {a.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">
                  {viewsLoading
                    ? "Loading..."
                    : `${viewsData?.[a.id] ?? 0} views`}
                </span>
                <span className="font-bold tracking-wide text-gray-800 group-hover:text-gray-900 transition-colours">
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};


