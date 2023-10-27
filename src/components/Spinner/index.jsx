import { useEffect, useState } from "react";
import styles from "./spinner.module.css";

export function Spinner({ loadingMessage = "" }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    let interval;
    if (loadingMessage) {
      interval = setInterval(() => {
        if (dots.length === 3) {
          setDots("");
        } else {
          setDots((prev) => prev.concat("."));
        }
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loadingMessage, dots]);

  return (
    <div className={styles.loader_container}>
      <div className={styles.loader_wrapper}>
        <span className={styles.loader} />
      </div>
      <p>{loadingMessage ? `${loadingMessage}${dots}` : null}</p>
    </div>
  );
}
