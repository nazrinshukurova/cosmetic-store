import React from "react";
import styles from "./Eyeliner.module.css";
import Navbar from "../../shared/Navbar/Navbar";
import stylesGlobal from "../../styles/Global.module.css";

const EyelinerComponent = () => {
  return (
    <div>
      <div className={styles.navbar_container}>
        <Navbar />
        <div className={styles.container_header_links}>
          <h1 className={stylesGlobal.main_title}>Eyeliner</h1>
          <ol className={styles.sub_navbar}>
            <li className={stylesGlobal.sub_navbar_link}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/">
                <span>Home</span>
              </a>
            </li>

            <li className={stylesGlobal.sub_navbar_link}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/3-clothes">
                <span>Makeup</span>
              </a>
            </li>

            <li className={stylesGlobal.sub_navbar_link}>
              <a href="https://demos.codezeel.com/prestashop/PRS21/PRS210503/en/10-footwear">
                <span>Eye Makeup</span>
              </a>
            </li>

            <li className={stylesGlobal.sub_navbar_link_last}>
              <span>Eyeliner</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EyelinerComponent;
