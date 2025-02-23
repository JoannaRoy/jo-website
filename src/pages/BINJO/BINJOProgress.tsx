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
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Progress</h1>
      <ResponsiveContainer width="90%" height={1000}>
        <BarChart data={progressData} layout="vertical">
          <YAxis
            dataKey="item"
            type="category"
            width={150}
            tick={{ fontWeight: "bold" }}
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
