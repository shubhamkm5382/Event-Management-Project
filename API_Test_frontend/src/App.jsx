import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Events from "./components/Events";
import Albums from "./components/Albums";
import Media from "./components/Media";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/events">Events</Link> | <Link to="/albums">Albums</Link> | <Link to="/media">Media</Link>
      </nav>
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Router>
  );
}

export default App;
