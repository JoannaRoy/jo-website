import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ViewCount } from "@/components/view-count";

export type ContentCardLink = {
  label: string;
  url: string;
};

type ContentCardProps = {
  title: string;
  subtitle: string;
  image?: string;
  description?: string;
  expandableContent?: string;
  links?: ContentCardLink[];
  tags?: string[];
  category?: string;
  categoryColor?: string;
  categoryTooltip?: string;
  isFeatured?: boolean;
  viewStats?: { views: number; loading: boolean };
};

export const CategoryTag = ({
  label,
  color,
  tooltip,
  isFeatured,
  className = "",
}: {
  label: string;
  color?: string;
  tooltip?: string;
  isFeatured?: boolean;
  className?: string;
}) => (
  <span
    className={`group/tag relative inline-flex items-center gap-1 w-fit text-xs px-2 py-0.5 rounded ${tooltip ? "cursor-help" : ""} ${className}`}
    style={{ color: color || "#6b7280", backgroundColor: color ? `${color}25` : "#e5e7eb" }}
  >
    {isFeatured && <span>★</span>}
    {label}
    {tooltip && (
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-1.5 hidden w-72 max-w-[min(18rem,calc(100vw-2rem))] rounded-md bg-gray-900 px-2.5 py-2 text-left text-xs font-normal leading-relaxed text-white shadow-lg group-hover/tag:block"
      >
        {tooltip}
      </span>
    )}
  </span>
);

export const ContentCard = ({
  title,
  subtitle,
  image,
  description,
  expandableContent,
  links,
  tags,
  category,
  categoryColor,
  categoryTooltip,
  isFeatured,
  viewStats,
}: ContentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = !!expandableContent;

  const handleToggle = () => setIsExpanded((prev) => !prev);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <article
      className={`group p-4 md:p-5 rounded-lg border border-gray-300 ${isExpandable ? "cursor-pointer hover:border-gray-400" : ""} transition-colors`}
      style={categoryColor ? { backgroundColor: `${categoryColor}18` } : undefined}
      onClick={isExpandable ? handleToggle : undefined}
      onKeyDown={isExpandable ? handleKeyDown : undefined}
      tabIndex={isExpandable ? 0 : undefined}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md shrink-0"
          />
        )}

        <div className="flex flex-col grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 break-words">
                {title}
              </h3>
              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
            {(subtitle || viewStats) && (
              <div className="flex flex-col items-end gap-0.5 shrink-0 text-xs text-gray-500">
                {subtitle && <span>{subtitle}</span>}
                {viewStats && (
                  <ViewCount
                    views={viewStats.views}
                    loading={viewStats.loading}
                  />
                )}
              </div>
            )}
          </div>

          {category && (
            <CategoryTag
              label={category}
              color={categoryColor}
              tooltip={categoryTooltip}
              isFeatured={isFeatured}
              className="mb-2"
            />
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {description && (
            <div className="pt-4 mt-2 border-t border-gray-200 overflow-hidden">
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none break-words prose-a:text-[var(--purple)] prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            </div>
          )}

          <AnimatePresence>
            {isExpanded && expandableContent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none prose-a:text-[var(--purple)] prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{expandableContent}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isExpandable && (
            <span className="text-xs text-gray-500 mt-3 group-hover:text-gray-700 transition-colors">
              {isExpanded ? "↑ show less" : "↓ read more"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
