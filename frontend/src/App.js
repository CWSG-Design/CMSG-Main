import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuotePage from "./pages/QuotePage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
