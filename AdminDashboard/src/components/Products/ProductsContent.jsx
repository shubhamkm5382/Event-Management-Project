import React from "react";
import styles from './ProductsContent.module.css';

function ProductsContent() {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Products</h1>
        <p className={styles.subtitle}>Your product catalog and settings.</p>
      </div>
      <div className={styles.contentCard}>
        <p>(Place your Products UI here — this is a placeholder.)</p>
      </div>
    </div>
  );
}

export default ProductsContent;