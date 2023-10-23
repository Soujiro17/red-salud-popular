import styles from "./textarea.module.css";

export function TextArea({ id, minHeight }) {
  const style = {
    minHeight,
  };

  return <textarea id={id} className={styles.textarea} style={style} />;
}
