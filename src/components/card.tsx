import type { ReactNode } from "react";

export type CardProps = {
  title?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Card({ title, className = "", children }: CardProps) {
  return (
    <section
      className={[
        "rounded-3xl p-5 md:p-6 shadow-lg border border-white/60 flex flex-col",
        "bg-white/90 backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {title ? (
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 m-0">{title}</h2>
      ) : null}
      <div className={`${title ? "mt-3 " : ""}text-gray-800 flex-1 min-h-0`}>{children}</div>
    </section>
  );
}


