import React from "react";
import styles from "./BlockCategories.module.css";
import stylesGlobal from "../../styles/Global.module.css";

const BlockCategories = () => {
  return (
    <div>
      <div className={styles.home_filters}>
        <h4 className={styles.home_filters_title}>
          <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/2-home">
            Home
          </a>
        </h4>

        <div className={styles.sub_home_filters}>
          <ul className={styles.sub_home_filters_ul}>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/3-clothes">
                Makeup
              </a>
            </li>

            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/7-jewellery">
                Lipstic
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/8-watches">
                Lotion
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/6-cosmetics">
                Cosmetics
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/9-accessories">
                Primer
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/23-handbags">
                Facewash
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/24-perfumes">
                Mascara
              </a>
            </li>
            <li className={stylesGlobal.sub_navbar_link_last}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/25-sunglasses">
                Featured
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockCategories;
