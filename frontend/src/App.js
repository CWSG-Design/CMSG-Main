import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuotePage from "./pages/QuotePage";
import ShippingPage from "./pages/ShippingPage";
import InstallationPage from "./pages/InstallationPage";
import InstallerSignUpPage from "./pages/InstallerSignUpPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/installer-sign-up" element={<InstallerSignUpPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
