import { CSSProperties } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { progressData } from "./BINJOContent";

export default function ProgressChart({ style }: { style?: CSSProperties }) {
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
        height={progressData.length * 40}
        minHeight={500}
      >
        <BarChart
          data={progressData}
          layout="vertical"
          margin={{ left: 20, right: 20 }}
        >
          <YAxis
            dataKey="item"
            type="category"
            width={100}
            tick={{ fontWeight: "bold", fontSize: "0.7rem" }}
            strokeWidth={1}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(tick: number) => `${tick}%`}
            tick={{ fontWeight: "bold" }}
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
