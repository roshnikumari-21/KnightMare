import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import HomeUser from "./pages/HomeUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Play from "./components/Play";
import { AudioProvider } from "./Context/AudioContext.jsx";

function App() {
  return (
    <AudioProvider>
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden mt-1 bg-slate-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
        
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/homeuser" element={<HomeUser />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/playWithAI" element = {<Play/>}/>
          </Routes>
          
        </div>
      </div>
    </div>
    </AudioProvider>
  );
}
export default App;
