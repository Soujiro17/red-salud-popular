/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./userloged.module.css";
import { Button } from "../Button";

export function UserLoged() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className={styles.user_container}>
      <div className={styles.user_info_wrapper} onClick={handleOpen}>
        <span
          className={styles.user}
          style={open ? { borderBottomLeftRadius: 0 } : {}}
        >
          Vicente Reyes Cáceres
        </span>
        <Image
          height={50}
          width={50}
          className={styles.user_img}
          style={open ? { top: "-20px" } : {}}
          src="/user.png"
          alt="user"
        />
      </div>
      <ul style={{ maxHeight: open ? "350px" : 0 }}>
        <li>
          <Button width="100%" href="/">
            Cerrar sesión
          </Button>
        </li>
      </ul>
    </div>
  );
}
