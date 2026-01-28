import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  amount: string;
  type: string;
  risk: "high" | "medium" | "low";
  triggeredRules: number;
  timestamp: string;
}

const transactions: Transaction[] = [
  {
    id: "TXN-001847",
    amount: "₹2,50,00,000",
    type: "Wire Transfer",
    risk: "high",
    triggeredRules: 3,
    timestamp: "2 min ago",
  },
  {
    id: "TXN-001846",
    amount: "₹1,85,00,000",
    type: "Cash Deposit",
    risk: "high",
    triggeredRules: 2,
    timestamp: "5 min ago",
  },
  {
    id: "TXN-001845",
    amount: "₹75,00,000",
    type: "International Transfer",
    risk: "medium",
    triggeredRules: 1,
    timestamp: "12 min ago",
  },
  {
    id: "TXN-001844",
    amount: "₹45,00,000",
    type: "Internal Transfer",
    risk: "medium",
    triggeredRules: 1,
    timestamp: "18 min ago",
  },
  {
    id: "TXN-001843",
    amount: "₹1,20,00,000",
    type: "Securities Trade",
    risk: "high",
    triggeredRules: 4,
    timestamp: "25 min ago",
  },
];

export function HighRiskTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="dashboard-card"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-error/10">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                High Risk Transactions
              </h3>
              <p className="text-xs text-muted-foreground">
                Requiring immediate review
              </p>
            </div>
          </div>
          <button className="btn-ghost text-sm flex items-center gap-1">
            View All
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="table-header text-left px-6 py-4">
                Transaction ID
              </th>
              <th className="table-header text-left px-6 py-4">Amount</th>
              <th className="table-header text-left px-6 py-4">Type</th>
              <th className="table-header text-left px-6 py-4">Risk Level</th>
              <th className="table-header text-left px-6 py-4">Rules</th>
              <th className="table-header text-left px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {txn.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">
                    {txn.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{txn.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold",
                      txn.risk === "high" && "bg-error/10 text-error",
                      txn.risk === "medium" && "bg-warning/10 text-warning",
                      txn.risk === "low" && "bg-success/10 text-success"
                    )}
                  >
                    {txn.risk.charAt(0).toUpperCase() + txn.risk.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {txn.triggeredRules} triggered
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    {txn.timestamp}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
