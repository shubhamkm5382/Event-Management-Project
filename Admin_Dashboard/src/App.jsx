// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Events from "./pages/Events";
import Media from "./pages/Media";
import EventInfo from "./pages/EventInfo";
import Booking from "./pages/Booking";
import { Bell, Search } from "lucide-react"; // for icons
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function Layout({ children }) {
  const location = useLocation();

  // Page Title Mapping
  const titles = {
    "/events": "Events",
    "/media": "Media",
    "/event-info": "Event Info",
    "/booking": "Booking",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link to="/events" className="block px-3 py-2 rounded hover:bg-gray-700">
            Events
          </Link>
          <Link to="/media" className="block px-3 py-2 rounded hover:bg-gray-700">
            Media
          </Link>
          <Link to="/event-info" className="block px-3 py-2 rounded hover:bg-gray-700">
            Event Info
          </Link>
          <Link to="/booking" className="block px-3 py-2 rounded hover:bg-gray-700">
            Booking
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-3">
          {/* Page Title */}
          <h1 className="text-xl font-semibold">
            {titles[location.pathname] || "Dashboard"}
          </h1>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <SignedIn>
              {/* <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              /> */}
                            
                <UserButton />
              
              <span className="text-sm font-medium text-gray-700">Shubham</span>
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/events" element={<Events />} />
                <Route path="/media" element={<Media />} />
                <Route path="/event-info" element={<EventInfo />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="*" element={<Events />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
