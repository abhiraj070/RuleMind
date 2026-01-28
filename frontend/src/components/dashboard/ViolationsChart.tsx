import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { date: "Jan 1", violations: 12, warnings: 18 },
  { date: "Jan 8", violations: 8, warnings: 22 },
  { date: "Jan 15", violations: 15, warnings: 16 },
  { date: "Jan 22", violations: 10, warnings: 20 },
  { date: "Jan 29", violations: 6, warnings: 14 },
  { date: "Feb 5", violations: 9, warnings: 19 },
  { date: "Feb 12", violations: 4, warnings: 12 },
];

export function ViolationsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="dashboard-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground">
            Compliance Violations Over Time
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Last 7 weeks
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-muted-foreground">Violations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Warnings</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="violationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--error))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--error))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="warnings"
              stroke="hsl(var(--warning))"
              strokeWidth={2}
              fill="url(#warningGradient)"
            />
            <Area
              type="monotone"
              dataKey="violations"
              stroke="hsl(var(--error))"
              strokeWidth={2}
              fill="url(#violationGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
