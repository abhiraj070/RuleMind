import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  transactionId: string;
  ruleId: string;
  ruleName: string;
  timestamp: string;
  result: "pass" | "warning" | "fail";
  explanation: string;
  rawData: {
    amount: string;
    pan: string;
    kycStatus: string;
    accountType: string;
    country: string;
  };
}

const mockAuditData: AuditEntry[] = [
  {
    id: "AUD-001",
    transactionId: "TXN-001847",
    ruleId: "RULE-001",
    ruleName: "Large Cash Transaction Alert",
    timestamp: "2026-01-28 14:32:15",
    result: "fail",
    explanation:
      "Transaction blocked: Cash deposit of ₹2,50,00,000 exceeds threshold of ₹10,00,000",
    rawData: {
      amount: "₹2,50,00,000",
      pan: "ABCDE1234F",
      kycStatus: "Complete",
      accountType: "Current",
      country: "IN",
    },
  },
  {
    id: "AUD-002",
    transactionId: "TXN-001846",
    ruleId: "RULE-002",
    ruleName: "Missing PAN Verification",
    timestamp: "2026-01-28 14:28:42",
    result: "fail",
    explanation: "Transaction blocked: PAN not provided for high-value transaction",
    rawData: {
      amount: "₹1,85,00,000",
      pan: "",
      kycStatus: "Complete",
      accountType: "Savings",
      country: "IN",
    },
  },
  {
    id: "AUD-003",
    transactionId: "TXN-001845",
    ruleId: "RULE-004",
    ruleName: "KYC Incomplete Alert",
    timestamp: "2026-01-28 14:15:33",
    result: "warning",
    explanation: "Transaction flagged: Customer KYC documents are incomplete",
    rawData: {
      amount: "₹75,00,000",
      pan: "FGHIJ5678K",
      kycStatus: "Incomplete",
      accountType: "Savings",
      country: "IN",
    },
  },
  {
    id: "AUD-004",
    transactionId: "TXN-001844",
    ruleId: "RULE-006",
    ruleName: "Non-Resident Account Alert",
    timestamp: "2026-01-28 14:02:18",
    result: "warning",
    explanation: "Transaction flagged: NRI account with amount exceeding ₹25,00,000",
    rawData: {
      amount: "₹45,00,000",
      pan: "KLMNO9012P",
      kycStatus: "Complete",
      accountType: "NRI",
      country: "AE",
    },
  },
  {
    id: "AUD-005",
    transactionId: "TXN-001843",
    ruleId: "RULE-003",
    ruleName: "High-Risk Country Transfer",
    timestamp: "2026-01-28 13:48:55",
    result: "fail",
    explanation: "Transaction blocked: Transfer to sanctioned country (IR)",
    rawData: {
      amount: "₹1,20,00,000",
      pan: "PQRST3456U",
      kycStatus: "Complete",
      accountType: "Corporate",
      country: "IR",
    },
  },
  {
    id: "AUD-006",
    transactionId: "TXN-001842",
    ruleId: "RULE-001",
    ruleName: "Large Cash Transaction Alert",
    timestamp: "2026-01-28 13:35:22",
    result: "pass",
    explanation: "Transaction approved: All compliance checks passed",
    rawData: {
      amount: "₹5,00,000",
      pan: "UVWXY7890Z",
      kycStatus: "Complete",
      accountType: "Savings",
      country: "IN",
    },
  },
];

const AuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [resultFilter, setResultFilter] = useState<string>("all");
  const [ruleFilter, setRuleFilter] = useState<string>("all");

  const filteredData = mockAuditData.filter((entry) => {
    const matchesSearch =
      entry.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.ruleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.ruleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesResult =
      resultFilter === "all" || entry.result === resultFilter;

    const matchesRule =
      ruleFilter === "all" || entry.ruleId === ruleFilter;

    return matchesSearch && matchesResult && matchesRule;
  });

  const uniqueRules = [...new Set(mockAuditData.map((e) => e.ruleId))];

  return (
    <DashboardLayout
      title="Audit Trail"
      subtitle="View complete compliance check history"
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by transaction ID, rule ID, or rule name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Results</option>
            <option value="pass">Passed</option>
            <option value="warning">Warnings</option>
            <option value="fail">Failed</option>
          </select>
          <select
            value={ruleFilter}
            onChange={(e) => setRuleFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Rules</option>
            {uniqueRules.map((rule) => (
              <option key={rule} value={rule}>
                {rule}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="w-10"></th>
                <th className="table-header text-left px-6 py-4">
                  Transaction ID
                </th>
                <th className="table-header text-left px-6 py-4">Rule</th>
                <th className="table-header text-left px-6 py-4">Timestamp</th>
                <th className="table-header text-left px-6 py-4">Result</th>
                <th className="table-header text-left px-6 py-4">
                  Explanation
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <>
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer",
                      expandedRow === entry.id && "bg-secondary/30"
                    )}
                    onClick={() =>
                      setExpandedRow(expandedRow === entry.id ? null : entry.id)
                    }
                  >
                    <td className="px-4 py-4">
                      <button className="p-1 rounded hover:bg-secondary transition-colors">
                        {expandedRow === entry.id ? (
                          <ChevronUp size={16} className="text-muted-foreground" />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="text-muted-foreground"
                          />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {entry.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {entry.ruleName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.ruleId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {entry.timestamp}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                          entry.result === "pass" && "bg-success/10 text-success",
                          entry.result === "warning" &&
                            "bg-warning/10 text-warning",
                          entry.result === "fail" && "bg-error/10 text-error"
                        )}
                      >
                        {entry.result}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground max-w-xs truncate">
                        {entry.explanation}
                      </p>
                    </td>
                  </motion.tr>
                  <AnimatePresence>
                    {expandedRow === entry.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-secondary/20"
                      >
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                Amount
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                {entry.rawData.amount}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                PAN
                              </p>
                              <p className="text-sm font-mono text-foreground">
                                {entry.rawData.pan || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                KYC Status
                              </p>
                              <p className="text-sm text-foreground">
                                {entry.rawData.kycStatus}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                Account Type
                              </p>
                              <p className="text-sm text-foreground">
                                {entry.rawData.accountType}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                Country
                              </p>
                              <p className="text-sm text-foreground">
                                {entry.rawData.country}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-sidebar rounded-lg">
                            <p className="text-xs font-semibold text-sidebar-muted mb-1">
                              Full Explanation
                            </p>
                            <p className="text-sm text-sidebar-foreground">
                              {entry.explanation}
                            </p>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {mockAuditData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-2">Previous</button>
            <button className="btn-primary py-2">Next</button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AuditTrail;
