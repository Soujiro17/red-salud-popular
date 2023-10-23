import styles from "./spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.loader_container}>
      <span className={styles.loader} />
    </div>
  );
}
