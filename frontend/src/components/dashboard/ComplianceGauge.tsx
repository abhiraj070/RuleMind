import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ComplianceGaugeProps {
  score: number;
  maxScore?: number;
}

export function ComplianceGauge({ score, maxScore = 100 }: ComplianceGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreLabel = () => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Fair";
    return "Needs Attention";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="dashboard-card p-6"
    >
      <h3 className="text-sm font-semibold text-muted-foreground mb-6">
        Compliance Score
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              strokeWidth="12"
              className="stroke-secondary"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              className={cn(
                "transition-colors duration-500",
                percentage >= 80 && "stroke-success",
                percentage >= 60 && percentage < 80 && "stroke-warning",
                percentage < 60 && "stroke-error"
              )}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={cn("text-4xl font-bold", getScoreColor())}
            >
              {score}%
            </motion.span>
            <span className="text-sm text-muted-foreground mt-1">
              {getScoreLabel()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-success">847</p>
          <p className="text-xs text-muted-foreground">Passed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-warning">52</p>
          <p className="text-xs text-muted-foreground">Warnings</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-error">23</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
      </div>
    </motion.div>
  );
}
