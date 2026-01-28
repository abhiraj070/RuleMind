import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reportTypes = [
  {
    id: "daily",
    name: "Daily Summary",
    icon: BarChart3,
    description: "Daily transaction and compliance overview",
  },
  {
    id: "weekly",
    name: "Weekly Analysis",
    icon: TrendingUp,
    description: "Weekly trends and pattern analysis",
  },
  {
    id: "monthly",
    name: "Monthly Report",
    icon: PieChart,
    description: "Comprehensive monthly compliance report",
  },
];

const Reports = () => {
  const [selectedType, setSelectedType] = useState("daily");
  const [dateRange, setDateRange] = useState({
    start: "2026-01-01",
    end: "2026-01-28",
  });

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Generate and download compliance reports"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Report Type Selection */}
          <div className="dashboard-card p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Report Type
            </h3>
            <div className="space-y-2">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all",
                    selectedType === type.id
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-secondary hover:bg-secondary/80 border-2 border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <type.icon
                      className={cn(
                        "w-5 h-5",
                        selectedType === type.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <div>
                      <p
                        className={cn(
                          "font-medium",
                          selectedType === type.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {type.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="dashboard-card p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Date Range
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <FileText size={18} />
            Generate Report
          </button>
        </motion.div>

        {/* Report Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 dashboard-card"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Report Preview
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {dateRange.start} to {dateRange.end}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary flex items-center gap-2">
                  <Download size={16} />
                  PDF
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Download size={16} />
                  CSV
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Report Header */}
            <div className="bg-sidebar text-sidebar-foreground p-6 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold">RuleMind Compliance Report</h4>
                  <p className="text-xs text-sidebar-muted">
                    Generated on January 28, 2026
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-2xl font-bold text-primary">12,847</p>
                  <p className="text-xs text-sidebar-muted">
                    Total Transactions
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">87%</p>
                  <p className="text-xs text-sidebar-muted">Compliance Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">423</p>
                  <p className="text-xs text-sidebar-muted">
                    Flagged Transactions
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Sections */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Executive Summary
                </h4>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    During the reporting period, the compliance system processed
                    12,847 transactions with an overall compliance rate of
                    87.0%. There were 423 flagged transactions requiring review,
                    with 23 blocked due to critical rule violations. The most
                    frequently triggered rules were related to high-value cash
                    transactions and missing PAN documentation.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Rule Performance
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "Large Cash Transaction Alert",
                      triggers: 145,
                      percentage: 34,
                    },
                    {
                      name: "Missing PAN Verification",
                      triggers: 98,
                      percentage: 23,
                    },
                    {
                      name: "High-Risk Country Transfer",
                      triggers: 67,
                      percentage: 16,
                    },
                    {
                      name: "KYC Incomplete Alert",
                      triggers: 56,
                      percentage: 13,
                    },
                    {
                      name: "Unusual Trading Pattern",
                      triggers: 57,
                      percentage: 14,
                    },
                  ].map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {rule.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${rule.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-16 text-right">
                          {rule.triggers} hits
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
