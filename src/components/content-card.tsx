import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

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
  isFeatured?: boolean;
};

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
  isFeatured,
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
      <div className="flex items-start gap-3 sm:gap-4 overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md shrink-0"
          />
        )}

        <div className="flex flex-col grow min-w-0 overflow-hidden">
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
            {subtitle && <span className="text-xs text-gray-500 shrink-0">{subtitle}</span>}
          </div>

          {category && (
            <span
              className="text-xs px-2 py-0.5 rounded w-fit mb-2 inline-flex items-center gap-1"
              style={{ color: categoryColor || "#6b7280", backgroundColor: categoryColor ? `${categoryColor}25` : "#e5e7eb" }}
            >
              {isFeatured && <span>★</span>}
              {category}
            </span>
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
