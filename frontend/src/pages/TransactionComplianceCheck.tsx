import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceResult {
  status: "pass" | "warning" | "fail";
  message: string;
  triggeredRules: {
    id: string;
    name: string;
    severity: string;
    action: string;
  }[];
}

const TransactionComplianceCheck = () => {
  const [formData, setFormData] = useState({
    amount: "",
    pan: "",
    kycStatus: "complete",
    accountType: "savings",
    country: "IN",
  });

  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(formData.amount.replace(/,/g, ""));
      
      let complianceResult: ComplianceResult;
      
      if (amount > 1000000 && formData.pan === "") {
        complianceResult = {
          status: "fail",
          message:
            "Transaction blocked: Missing PAN for high-value transaction exceeding ₹10,00,000",
          triggeredRules: [
            {
              id: "RULE-001",
              name: "Large Cash Transaction Alert",
              severity: "critical",
              action: "Block",
            },
            {
              id: "RULE-002",
              name: "Missing PAN Verification",
              severity: "high",
              action: "Block",
            },
          ],
        };
      } else if (formData.kycStatus === "incomplete") {
        complianceResult = {
          status: "warning",
          message:
            "Transaction flagged: KYC verification incomplete. Additional verification required before processing.",
          triggeredRules: [
            {
              id: "RULE-004",
              name: "KYC Incomplete Alert",
              severity: "medium",
              action: "Review",
            },
          ],
        };
      } else if (["NK", "IR", "SY"].includes(formData.country)) {
        complianceResult = {
          status: "fail",
          message:
            "Transaction blocked: Transfer to high-risk sanctioned country.",
          triggeredRules: [
            {
              id: "RULE-003",
              name: "High-Risk Country Transfer",
              severity: "critical",
              action: "Block",
            },
          ],
        };
      } else {
        complianceResult = {
          status: "pass",
          message:
            "Transaction approved: All compliance checks passed successfully.",
          triggeredRules: [],
        };
      }
      
      setResult(complianceResult);
      setIsChecking(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      pan: "",
      kycStatus: "complete",
      accountType: "savings",
      country: "IN",
    });
    setResult(null);
  };

  return (
    <DashboardLayout
      title="Transaction Compliance Check"
      subtitle="Simulate and validate transaction compliance"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="dashboard-card p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Transaction Details
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Transaction Amount (₹)
              </label>
              <input
                type="text"
                placeholder="e.g., 15,00,000"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="e.g., ABCDE1234F"
                value={formData.pan}
                onChange={(e) =>
                  setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                }
                className="input-field"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to test missing PAN scenario
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                KYC Status
              </label>
              <select
                value={formData.kycStatus}
                onChange={(e) =>
                  setFormData({ ...formData, kycStatus: e.target.value })
                }
                className="input-field"
              >
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
                <option value="pending">Pending Verification</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Account Type
              </label>
              <select
                value={formData.accountType}
                onChange={(e) =>
                  setFormData({ ...formData, accountType: e.target.value })
                }
                className="input-field"
              >
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
                <option value="nri">NRI Account</option>
                <option value="corporate">Corporate Account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Destination Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="input-field"
              >
                <option value="IN">India (IN)</option>
                <option value="US">United States (US)</option>
                <option value="GB">United Kingdom (GB)</option>
                <option value="AE">UAE (AE)</option>
                <option value="SG">Singapore (SG)</option>
                <option value="NK">North Korea (NK) - Sanctioned</option>
                <option value="IR">Iran (IR) - Sanctioned</option>
                <option value="SY">Syria (SY) - Sanctioned</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleCheck}
                disabled={isChecking || !formData.amount}
                className="btn-primary flex items-center gap-2 flex-1"
              >
                {isChecking ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Check Compliance
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              <button onClick={resetForm} className="btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="dashboard-card p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Compliance Result
          </h3>

          <AnimatePresence mode="wait">
            {!result && !isChecking && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-80 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Enter transaction details and click "Check Compliance" to see
                  results
                </p>
              </motion.div>
            )}

            {isChecking && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-80"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground">
                  Running compliance checks...
                </p>
              </motion.div>
            )}

            {result && !isChecking && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Status Badge */}
                <div
                  className={cn(
                    "p-6 rounded-xl",
                    result.status === "pass" && "bg-success/10",
                    result.status === "warning" && "bg-warning/10",
                    result.status === "fail" && "bg-error/10"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-3 rounded-full",
                        result.status === "pass" && "bg-success/20",
                        result.status === "warning" && "bg-warning/20",
                        result.status === "fail" && "bg-error/20"
                      )}
                    >
                      {result.status === "pass" && (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      )}
                      {result.status === "warning" && (
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      )}
                      {result.status === "fail" && (
                        <XCircle className="w-6 h-6 text-error" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "text-lg font-semibold capitalize",
                          result.status === "pass" && "text-success",
                          result.status === "warning" && "text-warning",
                          result.status === "fail" && "text-error"
                        )}
                      >
                        {result.status === "pass" && "Approved"}
                        {result.status === "warning" && "Warning"}
                        {result.status === "fail" && "Blocked"}
                      </h4>
                      <p className="text-sm text-foreground mt-1">
                        {result.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Triggered Rules */}
                {result.triggeredRules.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Triggered Rules ({result.triggeredRules.length})
                    </h4>
                    <div className="space-y-2">
                      {result.triggeredRules.map((rule) => (
                        <div
                          key={rule.id}
                          className="p-4 bg-secondary rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {rule.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {rule.id}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "px-2 py-1 rounded text-xs font-semibold",
                                rule.severity === "critical" &&
                                  "bg-error/10 text-error",
                                rule.severity === "high" &&
                                  "bg-warning/10 text-warning",
                                rule.severity === "medium" &&
                                  "bg-primary/10 text-primary"
                              )}
                            >
                              {rule.severity}
                            </span>
                            <span className="px-2 py-1 rounded bg-foreground/5 text-xs font-medium text-foreground">
                              {rule.action}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionComplianceCheck;
