import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, TrendingUp, FileText } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">RuleMind</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/compliance-check")}
              >
                Try Simulator
              </Button>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          RuleMind
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Regulation as Code
        </motion.p>
        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Automated, explainable compliance for modern banking systems
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto"
          >
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/compliance-check")}
            className="w-full sm:w-auto"
          >
            Try Transaction Simulator
          </Button>
        </motion.div>
      </motion.section>

      {/* Problem Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-card"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
            The Problem We Are Solving
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
            <p>
              Today, banks and fintech companies still manage compliance manually.
            </p>
            <p>
              Regulations are read from PDFs, explained to developers, coded into systems, tested, and redeployed.
            </p>
            <p>
              When laws change, this process becomes slow, costly, and risky.
            </p>
            <p>
              This is why compliance mistakes and regulatory fines happen.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Why RuleMind Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
            Why We Built RuleMind
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
            <p>
              We built RuleMind to remove developers from compliance updates and make compliance instant.
            </p>
            <p>
              Instead of hardcoding rules, regulations are stored as structured data that admins can edit directly.
            </p>
            <p>
              RuleMind automatically checks every transaction against active rules.
            </p>
            <p>
              It works like a compliance brain between banking systems and transactions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Key Capabilities Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-card"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
            Key Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Regulation as Code",
                description: "Rules stored as data",
              },
              {
                title: "Automatic Checks",
                description: "Automatic transaction compliance checks",
              },
              {
                title: "Explainable Decisions",
                description: "Explainable pass / warning / fail decisions",
              },
              {
                title: "Full Audit Trail",
                description: "Full audit trail and reporting",
              },
              {
                title: "Middleware Ready",
                description:
                  "Designed to run as middleware between UPI apps and banks",
              },
              {
                title: "Real-time Compliance",
                description: "Instant compliance verification",
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors bg-background"
              >
                <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Closing CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Ready to Transform Your Compliance?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Explore RuleMind and experience automated, explainable compliance for your banking system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/compliance-check")}
              className="w-full sm:w-auto"
            >
              Try Transaction Simulator
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 RuleMind. Regulation as Code for Modern Banking.</p>
        </div>
      </footer>
    </div>
  );
}
