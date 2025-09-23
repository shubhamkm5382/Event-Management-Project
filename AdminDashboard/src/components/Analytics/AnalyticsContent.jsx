import React from "react";
import styles from './AnalyticsContent.module.css';

function AnalyticsContent() {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Analytics</h1>
        <p className={styles.subtitle}>Charts and KPIs.</p>
      </div>
      <div className={styles.contentCard}>
        <p>(Place your Analytics UI here — this is a placeholder.)</p>
      </div>
    </div>
  );
}

export default AnalyticsContent;