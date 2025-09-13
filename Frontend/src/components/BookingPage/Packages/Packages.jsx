import React from "react";
import styles from "./Packages.module.css";

const Packages = ({ packages }) => {
  return (
    <div>
      <h2>Available Packages</h2>
      <div className={styles.packages}>
        {packages.map((pkg, i) => (
          <div key={i} className={styles.package}>
            <h3>{pkg.package_name}</h3>
            <p>{pkg.package_description}</p>
            <span>{pkg.package_price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
