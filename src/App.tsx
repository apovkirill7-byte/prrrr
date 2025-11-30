import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Offer from "./pages/Offer";
import Terms from "./pages/Terms";
import Achievements from "./pages/Achievements";
import Partner from "./pages/Partner";
import Auth from "./pages/Auth";
import Marketing from "./pages/products/Marketing";
import Sales from "./pages/products/Sales";
import Business from "./pages/products/Business";
import Languages from "./pages/products/Languages";
import NotFound from "./pages/NotFound";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import { ChatSupport } from "@/components/ChatSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/marketing" element={<Marketing />} />
          <Route path="/products/sales" element={<Sales />} />
          <Route path="/products/business" element={<Business />} />
          <Route path="/products/languages" element={<Languages />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/subscription" element={<SubscriptionManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatSupport />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
