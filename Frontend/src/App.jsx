import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import About from './pages/about/About'
import Services from './pages/services/Services'
import Birthday from './pages/Gallery/Birthday'
// <-- Import About

function App() {
  return (
    <>
      <Header /> {/* Har page pe dikhenga */}

      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/about" element={<About/>} /> 
        <Route path="/services" element={<Services/>} /> 
        <Route path="/gallery/birthday" element={<Birthday/>} /> 
      </Routes>

      <Footer /> {/* Har page pe dikhenga */}
    </>
  )
}

export default App
