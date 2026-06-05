import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import QuotePage from "./pages/QuotePage";
import ShippingPage from "./pages/ShippingPage";
import InstallationPage from "./pages/InstallationPage";
import InstallerSignUpPage from "./pages/InstallerSignUpPage";
import ContactPage from "./pages/ContactPage";
import InstallationDirectoryPage from "./pages/InstallationDirectoryPage";
import NotFound from "./pages/NotFound";
import ResourcesPage from "./pages/ResourcesPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import GalleryPage from "./pages/GalleryPage";
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:slug" component={ProductDetailPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/quote" component={QuotePage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/installation" component={InstallationPage} />
      <Route path="/installer-sign-up" component={InstallerSignUpPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/installation-directory" component={InstallationDirectoryPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/accessibility" component={AccessibilityPage} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
