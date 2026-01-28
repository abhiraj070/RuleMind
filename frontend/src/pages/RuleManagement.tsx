import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronDown,
  X,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Rule {
  id: string;
  name: string;
  condition: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  status: boolean;
  lastModified: string;
}

const mockRules: Rule[] = [
  {
    id: "RULE-001",
    name: "Large Cash Transaction Alert",
    condition: "amount > 10,00,000 AND type = 'cash'",
    severity: "critical",
    source: "RBI",
    status: true,
    lastModified: "2 days ago",
  },
  {
    id: "RULE-002",
    name: "Missing PAN Verification",
    condition: "amount > 50,000 AND pan = 'missing'",
    severity: "high",
    source: "Income Tax Act",
    status: true,
    lastModified: "1 week ago",
  },
  {
    id: "RULE-003",
    name: "High-Risk Country Transfer",
    condition: "country IN ['NK', 'IR', 'SY']",
    severity: "critical",
    source: "FATF",
    status: true,
    lastModified: "3 days ago",
  },
  {
    id: "RULE-004",
    name: "KYC Incomplete Alert",
    condition: "kyc_status = 'incomplete'",
    severity: "medium",
    source: "RBI KYC Guidelines",
    status: true,
    lastModified: "5 days ago",
  },
  {
    id: "RULE-005",
    name: "Unusual Trading Pattern",
    condition: "trade_volume > avg_volume * 3",
    severity: "high",
    source: "SEBI",
    status: false,
    lastModified: "1 day ago",
  },
  {
    id: "RULE-006",
    name: "Non-Resident Account Alert",
    condition: "account_type = 'NRI' AND amount > 25,00,000",
    severity: "medium",
    source: "FEMA",
    status: true,
    lastModified: "4 days ago",
  },
];

const RuleManagement = () => {
  const [rules, setRules] = useState(mockRules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStatus = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, status: !rule.status } : rule
      )
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-error/10 text-error";
      case "high":
        return "bg-warning/10 text-warning";
      case "medium":
        return "bg-primary/10 text-primary";
      case "low":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Rule Management"
      subtitle="Create and manage compliance rules"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={16} />
            Filters
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Create Rule
        </button>
      </div>

      {/* Rules Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="table-header text-left px-6 py-4">Rule Name</th>
                <th className="table-header text-left px-6 py-4">Condition</th>
                <th className="table-header text-left px-6 py-4">Severity</th>
                <th className="table-header text-left px-6 py-4">Source</th>
                <th className="table-header text-left px-6 py-4">Status</th>
                <th className="table-header text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule, index) => (
                <motion.tr
                  key={rule.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{rule.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rule.id} • Modified {rule.lastModified}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-mono text-muted-foreground">
                      {rule.condition}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                        getSeverityColor(rule.severity)
                      )}
                    >
                      {rule.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {rule.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(rule.id)}
                      className={cn(
                        "relative w-12 h-6 rounded-full transition-colors",
                        rule.status ? "bg-success" : "bg-muted"
                      )}
                    >
                      <motion.div
                        layout
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                        animate={{ left: rule.status ? "calc(100% - 20px)" : "4px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-error/10 transition-colors text-muted-foreground hover:text-error">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create Rule Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <RuleModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

function RuleModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    field: "amount",
    operator: ">",
    value: "",
    action: "warn",
    severity: "medium",
    source: "",
  });

  const buildRulePreview = () => {
    if (!formData.value) return "Define your rule conditions above";
    return `IF ${formData.field} ${formData.operator} ${formData.value} THEN ${formData.action.toUpperCase()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Create New Rule
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Define compliance rule logic
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Rule Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rule Name
            </label>
            <input
              type="text"
              placeholder="e.g., Large Cash Transaction Alert"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Condition Builder */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Condition
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={formData.field}
                onChange={(e) =>
                  setFormData({ ...formData, field: e.target.value })
                }
                className="input-field"
              >
                <option value="amount">Amount</option>
                <option value="pan">PAN Status</option>
                <option value="country">Country</option>
                <option value="kyc_status">KYC Status</option>
                <option value="account_type">Account Type</option>
              </select>
              <select
                value={formData.operator}
                onChange={(e) =>
                  setFormData({ ...formData, operator: e.target.value })
                }
                className="input-field"
              >
                <option value=">">&gt; Greater than</option>
                <option value="<">&lt; Less than</option>
                <option value="=">=  Equals</option>
                <option value="!=">!= Not equals</option>
                <option value="exists">Exists</option>
                <option value="missing">Missing</option>
              </select>
              <input
                type="text"
                placeholder="Value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>

          {/* Action & Severity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Action
              </label>
              <select
                value={formData.action}
                onChange={(e) =>
                  setFormData({ ...formData, action: e.target.value })
                }
                className="input-field"
              >
                <option value="block">Block Transaction</option>
                <option value="warn">Issue Warning</option>
                <option value="require_field">Require Additional Field</option>
                <option value="review">Flag for Review</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Severity
              </label>
              <select
                value={formData.severity}
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value })
                }
                className="input-field"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Regulatory Source
            </label>
            <input
              type="text"
              placeholder="e.g., RBI Master Direction 2023"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Live Preview */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rule Preview
            </label>
            <div className="bg-sidebar p-4 rounded-lg">
              <code className="text-sm text-sidebar-foreground font-mono">
                {buildRulePreview()}
              </code>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button className="btn-primary">Create Rule</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RuleManagement;
