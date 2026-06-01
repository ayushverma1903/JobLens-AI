"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CHART_COLORS } from "@/lib/utils";

interface ChartWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

function ChartWrapper({ title, description, children, className = "", action }: ChartWrapperProps) {
  return (
    <Card className={`border-border/50 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold font-[family-name:var(--font-heading)]">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
            )}
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

// ---- Custom Tooltip ----
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-lg text-sm">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ---- Area Chart ----
interface AreaChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
  title: string;
  description?: string;
  className?: string;
  height?: number;
}

export function AreaChartComponent({
  data, dataKeys, xAxisKey, title, description, className, height = 300,
}: AreaChartProps) {
  return (
    <ChartWrapper title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {dataKeys.map((dk) => (
              <linearGradient key={dk.key} id={`gradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dk.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
          {dataKeys.map((dk) => (
            <Area
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              name={dk.name}
              stroke={dk.color}
              fill={`url(#gradient-${dk.key})`}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ---- Bar Chart ----
interface BarChartComponentProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  title: string;
  description?: string;
  className?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  color?: string;
  action?: React.ReactNode;
}

export function BarChartComponent({
  data, dataKey, nameKey, title, description, className, height = 300,
  layout = "vertical", color = CHART_COLORS[0], action,
}: BarChartComponentProps) {
  if (layout === "horizontal") {
    return (
      <ChartWrapper title={title} description={description} className={className} action={action}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
            <YAxis
              dataKey={nameKey}
              type="category"
              tick={{ fontSize: 11 }}
              stroke="var(--muted-foreground)"
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} barSize={20} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper title={title} description={description} className={className} action={action}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis dataKey={nameKey} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} barSize={32} name="Value">
            {data.map((_, index) => (
              <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ---- Pie / Donut Chart ----
interface PieChartComponentProps {
  data: { name: string; value: number; color: string }[];
  title: string;
  description?: string;
  className?: string;
  height?: number;
  innerRadius?: number;
}

export function PieChartComponent({
  data, title, description, className, height = 300, innerRadius = 60,
}: PieChartComponentProps) {
  return (
    <ChartWrapper title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={innerRadius + 40}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={40} wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ---- Line Chart ----
interface LineChartComponentProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
  title: string;
  description?: string;
  className?: string;
  height?: number;
}

export function LineChartComponent({
  data, dataKeys, xAxisKey, title, description, className, height = 300,
}: LineChartComponentProps) {
  return (
    <ChartWrapper title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
          {dataKeys.map((dk) => (
            <Line
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              name={dk.name}
              stroke={dk.color}
              strokeWidth={2}
              dot={{ r: 3, fill: dk.color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

// ---- Multi Bar Chart (Grouped) ----
interface MultiBarChartProps {
  data: any[];
  dataKeys: { key: string; color: string; name: string }[];
  xAxisKey: string;
  title: string;
  description?: string;
  className?: string;
  height?: number;
}

export function MultiBarChart({
  data, dataKeys, xAxisKey, title, description, className, height = 300,
}: MultiBarChartProps) {
  return (
    <ChartWrapper title={title} description={description} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
          {dataKeys.map((dk) => (
            <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} barSize={16} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
