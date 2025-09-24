import React, { useState } from "react";
import styles from './Sidebar.module.css';
import { Link, useLocation } from "react-router-dom";

function Sidebar({ 
  isCollapsed, 
  isMobileOpen, 
  onCloseMobile,
  onToggleDesktop,
  showToggleInSidebar
}) {
  const location = useLocation(); 
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
    if (window.innerWidth <= 768) onCloseMobile();
  };

  const handleToggleClick = () => {
    if (window.innerWidth <= 768) onCloseMobile();
    else onToggleDesktop();
  };

  return (
    <div 
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.show : ''}`}
      id="sidebar" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-crown"></i>
          </div>
          <span className={styles.logoText}>LuxeEvents</span>
        </div>

        {showToggleInSidebar && (
          <button 
            className={styles.toggleBtn} 
            onClick={handleToggleClick}
            aria-label="Toggle sidebar"
          >
            <i className={`fas fa-chevron-left ${isCollapsed ? styles.rotated : ''}`} aria-hidden="true"></i>
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className={styles.sidebarMenu}>
        <Link 
          to="/" 
          className={`${styles.menuItem} ${activeMenu === "/" ? styles.active : ''}`} 
          onClick={() => handleMenuClick("/")}
        >
          <i className='fas fa-home' aria-hidden="true"></i>
          <span className={styles.menuText}>Dashboard</span>
        </Link>

        <Link 
          to="/products" 
          className={`${styles.menuItem} ${activeMenu === "/products" ? styles.active : ''}`} 
          onClick={() => handleMenuClick("/products")}
        >
          <i className='fas fa-users' aria-hidden="true"></i>
          <span className={styles.menuText}>Products</span>
        </Link>

        <Link 
          to="/analytics" 
          className={`${styles.menuItem} ${activeMenu === "/analytics" ? styles.active : ''}`} 
          onClick={() => handleMenuClick("/analytics")}
        >
          <i className='fas fa-box' aria-hidden="true"></i>
          <span className={styles.menuText}>Analytics</span>
        </Link>

        <Link 
          to="/settings" 
          className={`${styles.menuItem} ${activeMenu === "/settings" ? styles.active : ''}`} 
          onClick={() => handleMenuClick("/settings")}
        >
          <i className='fas fa-chart-bar' aria-hidden="true"></i>
          <span className={styles.menuText}>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
