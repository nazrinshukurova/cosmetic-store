import styles from "./IconButtonStack.module.css";

const IconButtonStack = () => {
  return (
    <div className={styles.stack}>
      <button className={styles.button}>
        <Heart />
        <span className={styles.tooltip}>Like</span>
      </button>
      <button className={`${styles.button} ${styles.active}`}>
        <Repeat />
        <span className={styles.tooltip}>Repeat</span>
      </button>
      <button className={styles.button}>
        <Maximize2 />
        <span className={styles.tooltip}>Expand</span>
      </button>
      <button className={styles.button}>
        <ExternalLink />
        <span className={styles.tooltip}>Open</span>
      </button>
    </div>
  );
};

export default IconButtonStack;
