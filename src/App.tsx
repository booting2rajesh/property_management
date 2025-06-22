import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Units from "./pages/Units";
import Tenants from "./pages/Tenants";
import TenantHistory from "./pages/TenantHistory";
import Billing from "./pages/Billing";
import BillDetails from "./pages/BillDetails";
import Communications from "./pages/Communications";
import RentAgreements from "./pages/RentAgreements";
import ServiceRequests from "./pages/ServiceRequests";
import AdminPortal from "./pages/AdminPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/units" element={<Units />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/tenant-history" element={<TenantHistory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/:id" element={<BillDetails />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/rent-agreements" element={<RentAgreements />} />
          <Route path="/service-requests" element={<ServiceRequests />} />
          <Route path="/admin" element={<AdminPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
