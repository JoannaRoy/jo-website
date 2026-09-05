import { defaultSchema } from "hast-util-sanitize";
import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
  type VideoHTMLAttributes,
} from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

import { Collapsible } from "@/components/collapsible";
import { resolveBlogImageSrc } from "@/hooks/blogImages";

const blogSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema?.tagNames ?? []), "video"],
  attributes: {
    ...defaultSchema.attributes,
    img: [...(defaultSchema?.attributes?.img ?? []), "title", "loading", "decoding"],
    video: ["src", "title", "controls", "loop", "muted", "playsinline", "preload", "poster"],
    source: [...(defaultSchema?.attributes?.source ?? []), "src", "type"],
  },
};

const imageTitleWidthSuffix = /\s*\|\s*w=(\d+)\s*$/;

function parseBlogImageTitle(title: string | undefined): {
  caption: string | undefined;
  maxWidthPx: number | undefined;
} {
  if (!title?.trim()) return { caption: undefined, maxWidthPx: undefined };
  const trimmed = title.trim();
  const match = trimmed.match(imageTitleWidthSuffix);
  if (!match) return { caption: trimmed, maxWidthPx: undefined };
  const maxWidthPx = Number(match[1]);
  const caption = trimmed.slice(0, match.index).trim();
  return { caption: caption || undefined, maxWidthPx };
}

interface BlogPostMarkdownProps {
  markdown: string;
  postSlug?: string;
}

const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

const BlogVideo = ({
  src,
  title,
  children,
  postSlug,
  ...props
}: VideoHTMLAttributes<HTMLVideoElement> & { title?: string; postSlug?: string }) => {
  const resolved = src ? resolveBlogImageSrc(src, postSlug) : undefined;
  const { caption, maxWidthPx } = parseBlogImageTitle(title);
  // min(...) keeps the declared max-width on desktop without forcing overflow on narrow mobile screens.
  const videoStyle = maxWidthPx ? { maxWidth: `min(${maxWidthPx}px, 100%)` } : undefined;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (typeof (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen === "function") {
      (video as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
    }
  };

  return (
    <figure className="my-4 md:my-6">
      <div className="relative mx-auto" style={videoStyle}>
        <video
          {...props}
          ref={videoRef}
          src={resolved}
          controls
          playsInline
          preload="metadata"
          className="max-w-full h-auto rounded-lg border border-gray-200 block"
        >
          {children}
        </video>
        <button
          type="button"
          onClick={handleFullscreen}
          aria-label="View fullscreen"
          className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
        >
          <ExpandIcon />
        </button>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-gray-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
};

const BlogImage = ({
  src,
  alt,
  title,
  postSlug,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { title?: string; postSlug?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolved = src ? resolveBlogImageSrc(src, postSlug) : undefined;
  const { caption, maxWidthPx } = parseBlogImageTitle(title);
  // min(...) keeps the declared max-width on desktop without forcing overflow on narrow mobile screens.
  const wrapperStyle = maxWidthPx ? { maxWidth: `min(${maxWidthPx}px, 100%)` } : undefined;

  const imageButton = (
    <div
      className={"relative mx-auto block" + (caption ? "" : " my-4 md:my-6")}
      style={wrapperStyle}
    >
      <img
        {...props}
        src={resolved}
        alt={alt ?? ""}
        className="block h-auto w-full cursor-zoom-in rounded-lg border border-gray-200"
        loading="lazy"
        decoding="async"
        onClick={() => setIsOpen(true)}
      />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="View fullscreen"
        className="absolute top-2 right-2 rounded-md bg-black/60 p-1.5 text-white opacity-80 transition-opacity hover:bg-black/80 hover:opacity-100"
      >
        <ExpandIcon />
      </button>
    </div>
  );

  const content = caption ? (
    <figure className="my-4 md:my-6">
      {imageButton}
      <figcaption className="mt-2 text-center text-sm text-gray-600">{caption}</figcaption>
    </figure>
  ) : (
    imageButton
  );

  return (
    <>
      {content}
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={(node) => node?.focus()}
          onClick={() => setIsOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOpen(false);
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon />
          </button>
          <img
            src={resolved}
            alt={alt ?? ""}
            className="max-h-full max-w-full cursor-zoom-out object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
};

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

export const BlogPostMarkdown = ({ markdown, postSlug }: BlogPostMarkdownProps) => {
  return (
    <div className="overflow-hidden wrap-break-word">
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, blogSanitizeSchema], rehypeKatex]}
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
        p: ({ children, node, ...props }) => {
          if (
            children &&
            Array.isArray(children) &&
            children.length === 1 &&
            children[0] === "<br>"
          ) {
            return <div className="my-4 md:my-6"></div>;
          }
          const hasImage = node?.children?.some(
            (c: { type?: string; tagName?: string }) =>
              c.type === "element" && (c.tagName === "img" || c.tagName === "video"),
          );
          if (hasImage) {
            return <div className="my-3 md:my-4" {...props}>{children}</div>;
          }
          return (
            <p className="my-3 md:my-4" {...props}>
              {children}
            </p>
          );
        },
        h1: ({ children, ...props }) => (
          <h1 {...props} className="text-4xl md:text-5xl font-bold mt-6 md:mt-8 mb-3 md:mb-4">
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 {...props} className="text-2xl md:text-3xl font-bold mt-5 md:mt-6 mb-2 md:mb-3">
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 {...props} className="text-lg md:text-xl font-semibold mt-4 md:mt-5 mb-2">
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 {...props} className="text-base md:text-lg font-semibold mt-3 md:mt-4 mb-1 md:mb-2">
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 {...props} className="text-sm md:text-base font-semibold mt-2 md:mt-3 mb-1">
            {children}
          </h5>
        ),
        h6: ({ children, ...props }) => (
          <h6 {...props} className="text-xs md:text-sm font-semibold mt-2 md:mt-3 mb-1">
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
        img: ({ src, alt, title, ...props }) => (
          <BlogImage src={src} alt={alt} title={title} postSlug={postSlug} {...props} />
        ),
        video: ({ src, title, children, ...props }) => (
          <BlogVideo src={src} title={title} postSlug={postSlug} {...props}>
            {children}
          </BlogVideo>
        ),
        table: ({ children, ...props }) => (
          <div className="my-4 md:my-6 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-gray-100 text-gray-900" {...props}>
            {children}
          </thead>
        ),
        tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
        tr: ({ children, ...props }) => <tr className="border-b border-gray-200 last:border-0" {...props}>{children}</tr>,
        th: ({ children, ...props }) => (
          <th className="border border-gray-200 px-3 py-2 font-semibold align-top" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border border-gray-200 px-3 py-2 align-top text-gray-800" {...props}>
            {children}
          </td>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="my-4 md:my-6 overflow-x-auto rounded-lg border border-sky-200/80 bg-sky-50 px-4 py-3 text-sm text-slate-800"
            {...props}
          >
            {children}
          </pre>
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = Boolean(className?.startsWith("language-"));
          if (isBlock) {
            return (
              <code
                className={`${className} bg-transparent font-mono text-[0.875em] leading-relaxed text-slate-800`}
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
              {...props}
            >
              {children}
            </code>
          );
        },
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