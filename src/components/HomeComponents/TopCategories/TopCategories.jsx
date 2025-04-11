import React from "react";
import styles from "./TopCategories.module.css";
import BlockContent from "../../../shared/BlockContent/BlockContent";
import category1 from "../../../assets/blockcontent/11-cz_categoryimagelist.jpg";
import category2 from "../../../assets/blockcontent/12-cz_categoryimagelist.jpg";
import category3 from "../../../assets/blockcontent/13-cz_categoryimagelist.jpg";
import category4 from "../../../assets/blockcontent/14-cz_categoryimagelist.jpg";
import category5 from "../../../assets/blockcontent/15-cz_categoryimagelist.jpg";

const TopCategories = () => {
  return (
    <>
      <div className={styles.top_categories}>
        <h2 className={styles.title}>Top Categories</h2>
        <div className={styles.block_content_box}>
          <BlockContent src={category1} linkName="Hair Styling" />
          <BlockContent src={category2} linkName="Growth Serum" />
          <BlockContent src={category3} linkName="Cream Mask" />
          <BlockContent src={category4} linkName="Stain Lip" />
          <BlockContent src={category5} linkName="Gentle Cleanser" />
        </div>
      </div>
    </>
  );
};

export default TopCategories;
