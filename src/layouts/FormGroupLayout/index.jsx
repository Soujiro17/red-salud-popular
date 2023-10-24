import styles from "./formgrouplayout.module.css";

export function FormGroupLayout({ children, columns = "1fr", rows = "1fr" }) {
  const customStyle = {
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
  };

  return (
    <div className={styles.form_group_grid} style={customStyle}>
      {children}
    </div>
  );
}
