import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Birthday from "./pages/Gallery/Birthday";
import Login from "./pages/login/Login";

function App() {
  const location = useLocation();

  // Pages jahan header/footer nahi dikhana
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery/birthday" element={<Birthday />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
