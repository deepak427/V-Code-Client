import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/about-me";
import Services from "./pages/Services";
import Code_visualization from "./pages/code-visualization";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/code-visualization" element={<Code_visualization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
