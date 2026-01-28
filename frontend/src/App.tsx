import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RuleManagement from "./pages/RuleManagement";
import TransactionComplianceCheck from "./pages/TransactionComplianceCheck";
import Reports from "./pages/Reports";
import AuditTrail from "./pages/AuditTrail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rules" element={<RuleManagement />} />
          <Route path="/compliance-check" element={<TransactionComplianceCheck />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
