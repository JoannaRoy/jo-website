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
  const summaryClasses = ["cursor-pointer select-none font-semibold text-gray-900", summaryClassName]
    .filter(Boolean)
    .join(" ");
  const contentClasses = [contentClassByVariant[variant], contentClassName].filter(Boolean).join(" ");

  return (
    <details className={detailsClassName} open={defaultOpen}>
      <summary className={summaryClasses}>{summary}</summary>
      <div className={contentClasses}>{children}</div>
    </details>
  );
}

