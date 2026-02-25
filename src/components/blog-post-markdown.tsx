import { Children, isValidElement, type ReactNode } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Collapsible } from "@/components/collapsible";

interface BlogPostMarkdownProps {
  markdown: string;
}

const reactNodeToText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (isValidElement(node)) return reactNodeToText(node.props.children);
  return "";
};

const applyCollapseMarkers = (markdown: string): string => {
  const lines = markdown.split("\n");
  const out: string[] = [];
  let inCollapse = false;

  const startMarker = "[!collapse-start]";
  const endMarker = "[!collapse-end]";

  for (const line of lines) {
    const trimmed = line.trim();
    const lower = trimmed.toLowerCase();

    if (!inCollapse && lower.startsWith(startMarker)) {
      const title = trimmed.slice(startMarker.length).trim();
      out.push(`> ${startMarker} ${title}`.trimEnd());
      inCollapse = true;
      continue;
    }

    if (inCollapse && lower === endMarker) {
      inCollapse = false;
      out.push("");
      continue;
    }

    out.push(inCollapse ? `> ${line}` : line);
  }

  return out.join("\n");
};

export const BlogPostMarkdown = ({ markdown }: BlogPostMarkdownProps) => {
  return (
    <div className="overflow-hidden wrap-break-word">
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            className="text-purple hover:text-blue-800 underline wrap-break-word"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
          </a>
        ),
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
          <h1 className="text-2xl md:text-3xl font-bold mt-6 md:mt-8 mb-3 md:mb-4" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="text-xl md:text-2xl font-bold mt-5 md:mt-6 mb-2 md:mb-3" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-5 mb-2" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 className="text-base md:text-lg font-bold mt-3 md:mt-4 mb-1 md:mb-2" {...props}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 className="text-sm md:text-base font-bold mt-2 md:mt-3 mb-1" {...props}>
            {children}
          </h5>
        ),
        h6: ({ children, ...props }) => (
          <h6 className="text-xs md:text-sm font-bold mt-2 md:mt-3 mb-1" {...props}>
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
            <ul className="list-disc pl-4 md:pl-5 my-3 md:my-4 space-y-1 md:space-y-2" {...props}>
              {children}
            </ul>
          );
        },
        ol: ({ children, ...props }) => (
          <ol className="list-decimal pl-4 md:pl-5 my-3 md:my-4 space-y-1 md:space-y-2" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="ml-1 md:ml-2 pl-1" {...props}>
            {children}
          </li>
        ),
        blockquote: ({ children, ...props }) => {
          const marker = "[!collapse-start]";
          const rendered = Children.toArray(children);
          const meaningful = rendered.filter((child) => reactNodeToText(child).trim().length > 0);

          if (meaningful.length === 0) {
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700" {...props}>
                {children}
              </blockquote>
            );
          }

          const firstText = reactNodeToText(meaningful[0]).trim();
          const isCollapsible = firstText.toLowerCase().startsWith(marker);

          if (!isCollapsible) {
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-700" {...props}>
                {children}
              </blockquote>
            );
          }

          const summaryText = firstText.slice(marker.length).trim();
          const summary = summaryText || "Details";
          const content = meaningful.slice(1);

          return (
            <Collapsible summary={summary} variant="markdown">
              {content}
            </Collapsible>
          );
        },
      }}
    >
      {applyCollapseMarkers(markdown)}
    </Markdown>
    </div>
  );
};