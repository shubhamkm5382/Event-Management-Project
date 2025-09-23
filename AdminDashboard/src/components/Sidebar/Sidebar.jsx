import React from "react";
import styles from './Sidebar.module.css';

function Sidebar({ 
  activePage, 
  setActivePage, 
  isCollapsed, 
  isMobileOpen, 
  onCloseMobile,
  onToggleDesktop,
  showToggleInSidebar // ✅ Naya prop
}) {
  const menu = [
    { key: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { key: 'users', icon: 'fas fa-users', label: 'Users' },
    { key: 'products', icon: 'fas fa-box', label: 'Products' },
    { key: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
    { key: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  const handleClick = (key) => {
    setActivePage(key);
    onCloseMobile();
  };

  const handleToggleClick = () => {
    if (window.innerWidth <= 768) {
      onCloseMobile();
    } else {
      onToggleDesktop();
    }
  };

  return (
    <div 
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.show : ''}`}
      id="sidebar" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-crown"></i>
          </div>
          <span className={styles.logoText}>LuxeEvents</span>
        </div>
        
        {/* Toggle button sirf tab dikhega jab sidebar expanded ho aur mobile na ho */}
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

      <div className={styles.sidebarMenu}>
        {menu.map(item => (
          <div
            key={item.key}
            className={`${styles.menuItem} ${activePage === item.key ? styles.active : ''}`}
            onClick={() => handleClick(item.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(item.key); }}
            aria-current={activePage === item.key ? 'page' : undefined}
          >
            <i className={item.icon} aria-hidden="true"></i>
            <span className={styles.menuText}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;