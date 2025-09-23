import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import DashboardContent from "./components/Dashboard/DashboardContent";
import UsersContent from "./components/Users/UsersContent";
import ProductsContent from "./components/Products/ProductsContent";
import AnalyticsContent from "./components/Analytics/AnalyticsContent";
import SettingsContent from "./components/Settings/SettingsContent";
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle functions
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    // Loading Animation
    const loading = document.getElementById('loading');
    const onLoad = () => {
      setTimeout(() => {
        if (loading) {
          loading.style.opacity = '0';
          setTimeout(() => {
            if (loading) loading.style.display = 'none';
          }, 300);
        }
      }, 1500);
    };
    
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchHandler = (e) => {
      const query = e.target.value.toLowerCase();
      console.log('Searching for:', query);
    };
    if (searchInput) searchInput.addEventListener('input', searchHandler);

    // Revenue select
    const revenuePeriod = document.getElementById('revenuePeriod');
    const revenueHandler = (e) => {
      const period = e.target.value;
      console.log('Revenue period changed to:', period);
    };
    if (revenuePeriod) revenuePeriod.addEventListener('change', revenueHandler);

    // IntersectionObserver animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .chart-card, .activity-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });

    // Badge pulse
    const badgeInterval = setInterval(() => {
      const badge = document.querySelector('.notification-badge');
      if (badge) {
        badge.style.transform = 'scale(1.1)';
        setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
      }
    }, 10000);

    // Activity time updater
    const timeInterval = setInterval(() => {
      const timeElements = document.querySelectorAll('.activity-time');
      timeElements.forEach((el, index) => {
        if (index === 0) {
          const times = ['Just now', '1 min ago', '2 min ago', '3 min ago'];
          el.textContent = times[Math.floor(Math.random() * times.length)];
        }
      });
    }, 30000);

    // cleanup
    return () => {
      window.removeEventListener('load', onLoad);
      if (searchInput) searchInput.removeEventListener('input', searchHandler);
      if (revenuePeriod) revenuePeriod.removeEventListener('change', revenueHandler);
      observer.disconnect();
      clearInterval(badgeInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardContent />;
      case 'users': return <UsersContent />;
      case 'products': return <ProductsContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Loading Screen */}
      <div className={styles.loading} id="loading">
        <div className={styles.loadingSpinner}></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`${styles.sidebarOverlay} ${mobileSidebarOpen ? styles.show : ''}`} 
        id="sidebarOverlay"
        onClick={closeMobileSidebar}
      ></div>

      <div className={styles.appLayout}>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage}
          isCollapsed={sidebarCollapsed}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={closeMobileSidebar}
          onToggleDesktop={toggleDesktopSidebar}
          showToggleInSidebar={!isMobile && !sidebarCollapsed} // ✅ Toggle button sidebar mein dikhayein
        />

        <div 
          className={`${styles.mainContent} ${
            sidebarCollapsed ? styles.collapsed : ''
          } ${mobileSidebarOpen ? styles.mobileOpen : ''}`}
          role="main"
        >
          <Header 
            onMenuClick={toggleSidebar}
            showToggleInHeader={!isMobile && sidebarCollapsed} // ✅ Toggle button header mein dikhayein
            onToggleDesktop={toggleDesktopSidebar}
          />
          <div className={styles.content}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}