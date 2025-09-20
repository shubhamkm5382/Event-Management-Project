import React, { useState, useEffect } from "react";
import styles from "./RecentWork/Gallery.module.css";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.spinner}></div>
    </div>
  );
}
