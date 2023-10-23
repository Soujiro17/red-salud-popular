import styles from "./input.module.css";

export function Input({ title, width, inputRef, ...props }) {
  const inputStyles = { width, ...props.style };

  return (
    <input
      title={title}
      className={styles.input}
      style={inputStyles}
      ref={inputRef}
      {...props}
    />
  );
}
