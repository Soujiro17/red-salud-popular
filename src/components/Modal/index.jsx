/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal, flushSync } from "react-dom";
import styles from "./modal.module.css";

export function Modal({
  height = "",
  minHeight = "",
  minWidth = "",
  width = "",
  padding = "0",
  children,
  onCloseRedirectTo = "",
}) {
  const [mounted, setMounted] = useState(false);

  const contentRef = useRef();

  const router = useRouter();

  const dynamicStyle = {
    height,
    width,
    padding,
    minHeight,
    minWidth,
  };

  const closeModal = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        setMounted(false);
        if (onCloseRedirectTo) {
          router.push(onCloseRedirectTo);
        }
      });
    });
  };

  const handleClickOutside = (event) => {
    if (
      event.target.role === "option" ||
      event.target.title === "tooltip-text" ||
      event.target.role === "listbox"
    )
      return;

    if (contentRef.current && !contentRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    setMounted(true);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      setMounted(false);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseRedirectTo, router, contentRef]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content} style={dynamicStyle} ref={contentRef}>
        {children({ closeModal })}
      </div>
    </div>,
    document.getElementById("modal"),
  );
}
