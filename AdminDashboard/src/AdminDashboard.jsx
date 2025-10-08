import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import DashboardContent from "./components/Dashboard/DashboardContent";
import UsersContent from "./components/Users/UsersContent";
import ProductsContent from "./components/Products/ProductsContent";
import AnalyticsContent from "./components/Analytics/AnalyticsContent";
import SettingsContent from "./components/Settings/SettingsContent";
import styles from './AdminDashboard.module.css';
import Add from "./components/AddMedia/AddMedia"
import GetMedia from "./components/GetMedia/GetMedia"

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const location = useLocation();
  const navigate = useNavigate();

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setMobileSidebarOpen(!mobileSidebarOpen);
    else setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);
  const toggleDesktopSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className={`${styles.sidebarOverlay} ${mobileSidebarOpen ? styles.show : ''}`} onClick={closeMobileSidebar}></div>

      <div className={styles.appLayout}>
        <Sidebar 
          activePage={location.pathname} // current route
          setActivePage={(path) => navigate(path)} // click will navigate
          isCollapsed={sidebarCollapsed}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={closeMobileSidebar}
          onToggleDesktop={toggleDesktopSidebar}
          showToggleInSidebar={!sidebarCollapsed}
        />

        <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.collapsed : ''} ${mobileSidebarOpen ? styles.mobileOpen : ''}`} role="main">
          <Header 
            onMenuClick={toggleSidebar}
            showToggleInHeader={!isMobile && sidebarCollapsed}
            onToggleDesktop={toggleDesktopSidebar}
          />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/users" element={<UsersContent />} />
              <Route path="/products" element={<ProductsContent />} />
              <Route path="/analytics" element={<AnalyticsContent />} />
              <Route path="/settings" element={<SettingsContent />} />
              <Route path="/addMedia" element={<Add />} />
              <Route path="/getMedia" element={<GetMedia />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
