import React from "react";
import styles from "./BlockContent.module.css";

const BlockContent = ({ src, linkName }) => {
  return (
    <div className={styles.block_content}>
      <img className={styles.image} src={src}></img>
      <a className={styles.link_name} href="#">
        {linkName}
      </a>
      <div className={styles.shop_container}>
        <a className={styles.shop_link} href="#">
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default BlockContent;
