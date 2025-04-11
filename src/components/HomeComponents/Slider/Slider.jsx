import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import sample1 from "../../../assets/sample-1.jpg";
import sample2 from "../../../assets/sample-2.jpg";
import Button from "../../../shared/Button/Button";

const images = [
  {
    src: sample1,
    heading: "Natural cosmetics face Cream",
    subHeading: "Be Your Own Kind\nOf Beautiful",
  },
  {
    src: sample2,
    heading: "Make-up Accessories",
    subHeading: "Natural Cosmetic\nFace Cream",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
        >
          <img
            src={img.src}
            alt={`Slide ${index + 1}`}
            className={styles.image}
          />
          <div className={styles.caption}>
            <h2 className={styles.heading}>{img.heading}</h2>
            <p className={styles.subheading}>{img.subHeading}</p>
            <Button text="Shop Now" />
          </div>
        </div>
      ))}
      <div className={styles.controls}>
        <button
          onClick={() =>
            setCurrent((current - 1 + images.length) % images.length)
          }
        >
          &lt;
        </button>
        <button onClick={() => setCurrent((current + 1) % images.length)}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
