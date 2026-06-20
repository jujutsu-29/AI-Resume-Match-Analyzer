"use client";

import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface RadarChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
}

export function RadarChart({ data, dataKey, nameKey }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis dataKey={nameKey} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="Skills"
          dataKey={dataKey}
          stroke="var(--electric-blue)"
          fill="var(--electric-blue)"
          fillOpacity={0.5}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "var(--dark-bg)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
          itemStyle={{ color: "var(--emerald-green)" }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
