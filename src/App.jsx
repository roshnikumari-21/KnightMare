import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Play from "./components/Play";
function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden my-0 bg-slate-900">
        <Sidebar />
        <div className="flex-1 overflow-auto p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
          <div className="App">
            <header className="App-header">
                <Play />
            </header>
        </div>

        </div>
       
      </div>
    </div>
  );
}
export default App;
