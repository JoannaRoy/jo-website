import React, { CSSProperties } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { parseBinjoCsv } from "react-binjo";
import rawCsv from "@/blog_data/2026_binjo_progress.csv?raw";

const progressData = parseBinjoCsv(rawCsv);

export default function ProgressChart({ style }: { style?: CSSProperties }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        ...style,
      }}
    >
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Progress</h1>
      <ResponsiveContainer
        width="100%"
        height={progressData.length * (isMobile ? 35 : 40)}
        minHeight={isMobile ? 400 : 500}
      >
        <BarChart
          data={progressData}
          layout="vertical"
          margin={{ left: isMobile ? 5 : 20, right: isMobile ? 5 : 20 }}
        >
          <YAxis
            dataKey="item"
            type="category"
            width={isMobile ? 80 : 100}
            tick={{ fontWeight: "bold", fontSize: isMobile ? "0.6rem" : "0.7rem" }}
            strokeWidth={1}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(tick: number) => `${tick}%`}
            tick={{ fontWeight: "bold", fontSize: isMobile ? "0.65rem" : "0.75rem" }}
            strokeWidth={1}
          />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar
            dataKey="completed"
            fill="var(--completed-color)"
            stackId="stack"
          />
          <Bar dataKey="planned" fill="var(--planned-color)" stackId="stack" />
          <Bar
            dataKey="remaining"
            fill="var(--remaining-color)"
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
