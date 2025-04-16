import React from "react";
import styles from "./TrendingProducts.module.css";

const TrendingProducts = () => {
  return (
    <div className={styles.trending_container}>
      <h2 className={styles.title}>Trending Products</h2>
      <ul className={styles.clearfix}>
        <li className={styles.nav_item}>
          <a
            data-toggle="tab"
            href="#featureProduct"
            className={styles.nav_link}
            data-text="Featured"
          >
            <span>Featured</span>
          </a>
        </li>
        <li className={styles.nav_item}>
          <a
            data-toggle="tab"
            href="#newProduct"
            className={styles.nav_link}
            data-text="Latest"
          >
            <span>New Arrivals</span>
          </a>
        </li>
        <li className={styles.nav_item}>
          <a
            data-toggle="tab"
            href="#bestseller"
            className={styles.nav_link}
            data-text="Best Sellers"
          >
            <span>Best Sellers</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TrendingProducts;
