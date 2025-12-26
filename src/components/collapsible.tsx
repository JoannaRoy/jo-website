import type { ReactNode } from "react";

type CollapsibleVariant = "soft" | "markdown";

type CollapsibleProps = {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: CollapsibleVariant;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
};

const detailsClassByVariant: Record<CollapsibleVariant, string> = {
  soft: "rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3",
  markdown: "my-4 rounded-xl border border-gray-200 bg-white/70 px-4 py-3",
};

const contentClassByVariant: Record<CollapsibleVariant, string> = {
  soft: "mt-3 text-gray-800",
  markdown: "mt-3",
};

export function Collapsible({
  summary,
  children,
  defaultOpen = false,
  variant = "soft",
  className = "",
  summaryClassName = "",
  contentClassName = "",
}: CollapsibleProps) {
  const detailsClassName = [detailsClassByVariant[variant], className].filter(Boolean).join(" ");
  const summaryClasses = [
    "flex cursor-pointer select-none items-center gap-3 font-semibold text-gray-900",
    summaryClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const contentClasses = [contentClassByVariant[variant], contentClassName].filter(Boolean).join(" ");

  return (
    <details className={["group", detailsClassName].filter(Boolean).join(" ")} open={defaultOpen}>
      <summary className={summaryClasses}>
        <span className="min-w-0 flex-1 inline-flex items-center gap-2">
          <span aria-hidden className="mr-2 inline-block text-gray-700 group-open:hidden">
            ▶︎
          </span>
          <span aria-hidden className="mr-2 hidden text-gray-700 group-open:inline-block">
            ▼
          </span>
          <span className="min-w-0">{summary}</span>
          <span className="expand-hint hidden text-xs font-normal text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 group-open:hidden sm:inline">
            click to expand!
          </span>
        </span>
      </summary>
      <div className={contentClasses}>{children}</div>
    </details>
  );
}

