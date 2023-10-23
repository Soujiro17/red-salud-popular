import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader_wrapper}>
        <span className={styles.loader} />
      </div>
    </div>
  );
}
