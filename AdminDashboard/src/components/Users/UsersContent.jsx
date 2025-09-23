import React from "react";
import styles from './UsersContent.module.css';

function UsersContent() {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Users</h1>
        <p className={styles.subtitle}>Manage your users here.</p>
      </div>
      <div className={styles.contentCard}>
        <p>(Place your Users UI here — this is a placeholder.)</p>
      </div>
    </div>
  );
}

export default UsersContent;