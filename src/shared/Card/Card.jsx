import React from "react";
import styles from "./Card.module.css";
import Button from "../Button/Button";

const Card = ({ src, subbanner_text_1, subbanner_text_2, subbanner_title }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} width="555px" height="284px"></img>
      <div className={styles.caption}>
        <div className={styles.heading}>{subbanner_title}</div>
        <div className={styles.subheading}>{subbanner_text_1}</div>
        <div className={styles.subtext}>{subbanner_text_2}</div>
        <Button text="Shop Now" />
      </div>
    </div>
  );
};

export default Card;
