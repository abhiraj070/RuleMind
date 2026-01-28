import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ComplianceGauge } from "@/components/dashboard/ComplianceGauge";
import { ViolationsChart } from "@/components/dashboard/ViolationsChart";
import { HighRiskTable } from "@/components/dashboard/HighRiskTable";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, John. Here's your compliance overview."
    >
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Transactions"
            value="12,847"
            change="+12.5% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-primary"
          />
          <StatCard
            title="Passed"
            value="11,594"
            change="90.2% pass rate"
            changeType="positive"
            icon={CheckCircle2}
            iconColor="text-success"
          />
          <StatCard
            title="Failed"
            value="423"
            change="-8.3% from last month"
            changeType="positive"
            icon={XCircle}
            iconColor="text-error"
          />
          <StatCard
            title="Warnings"
            value="830"
            change="+2.1% from last month"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="text-warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ViolationsChart />
          </div>
          <ComplianceGauge score={87} />
        </div>

        {/* High Risk Table */}
        <HighRiskTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
