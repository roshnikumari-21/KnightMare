import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'

function App() {
  return (
     <>
     <Navbar/>
     <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
     </>
  )
}
export default App
