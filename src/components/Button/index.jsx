"use client";

/* eslint-disable react/button-has-type */
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import styles from "./button.module.css";

export function Button({
  type = "button",
  className,
  schema = "",
  href = "",
  children,
  ...props
}) {
  const btnClassName = clsx({
    [styles.btn]: true,
    [styles.preset]: schema,
    [styles.animation]: !schema,
    [styles.info]: schema === "info",
    [styles.success]: schema === "success",
    [className]: className,
  });

  const router = useRouter();

  return (
    <button
      className={btnClassName}
      onClick={
        href
          ? () => {
              document.startViewTransition(() => {
                flushSync(() => {
                  router.push(href);
                });
              });
            }
          : () => {}
      }
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}
