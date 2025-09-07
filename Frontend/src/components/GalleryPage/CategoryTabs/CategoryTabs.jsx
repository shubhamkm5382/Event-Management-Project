import React from "react";
import "./CategoryTabs.css";

export default function CategoryTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
