import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
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
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quote" component={QuotePage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/installation" component={InstallationPage} />
      <Route path="/installer-sign-up" component={InstallerSignUpPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/installation-directory" component={InstallationDirectoryPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route component={NotFound} />
    </Switch>
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
