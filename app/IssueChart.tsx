"use client";

import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open, color: "rgba(243,0,13, 0.25" },
    {
      label: "In Progress",
      value: inProgress,
      color: "rgba(68, 0, 238, 0.25)",
    },
    { label: "Closed", value: closed, color: "rgba(0, 164, 51, 0.25)" },
  ];
  return (
    <Card style={{ height: "100%" }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="ml-[-24px] mt-[4px]"
      >
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
