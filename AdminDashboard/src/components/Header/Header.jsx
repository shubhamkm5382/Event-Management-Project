import React from "react";
import styles from './Header.module.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function Header({ onMenuClick, showToggleInHeader, onToggleDesktop }) {
  return (
    <div className={styles.header} role="banner">
      <button 
        className={styles.mobileToggle} 
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Desktop toggle button - collapsed state mein dikhega */}
      {showToggleInHeader && (
        <button 
          className={styles.desktopToggle}
          onClick={onToggleDesktop}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}

      <div className={styles.searchBar} role="search">
        <i className="fas fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search anything..." id="searchInput" aria-label="Search" />
      </div>

      <div className={styles.userActions} role="group" aria-label="User actions">
        <a href="#" className={styles.notificationBtn} aria-label="Notifications">
          <i className="fas fa-bell" aria-hidden="true"></i>
          <span className={styles.notificationBadge} aria-hidden="true">4</span>
        </a>
        <SignedOut>
        <a href="#" className={styles.profileBtn} aria-label="Profile">
          <div className={styles.userAvatar}>AD</div>
          <span className={styles.userName}>Admin User</span>
        </a>
        </SignedOut>
        <SignedIn>
          <UserButton 
          // afterSignOutUrl="http://localhost:3000/" 
          />
        </SignedIn>
      </div> 
    </div>
  );
}

export default Header;