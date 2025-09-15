import React from "react";
import styles from "./CategoryTabs.module.css";

export default function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className={styles["filter-bar"]}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles["filter-btn"]} ${
            activeCategory === cat ? styles.active : ""
          }`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
