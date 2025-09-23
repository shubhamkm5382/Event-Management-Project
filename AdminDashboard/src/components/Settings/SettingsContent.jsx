import React from "react";
import styles from './SettingsContent.module.css';

function SettingsContent() {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Settings</h1>
        <p className={styles.subtitle}>App and account settings.</p>
      </div>
      <div className={styles.contentCard}>
        <p>(Place your Settings UI here — this is a placeholder.)</p>
      </div>
    </div>
  );
}

export default SettingsContent;