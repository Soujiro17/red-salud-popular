import Link from "next/link";
import Image from "next/image";

import { Logo } from "../Logo";
import { Navbar } from "../Navbar";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>
      <Navbar />
      <div className={styles.user_container}>
        <span className={styles.user}>Vicente Reyes Cáceres</span>
        <Image
          height={50}
          width={50}
          className={styles.user_img}
          src="/user.png"
          alt="user"
        />
      </div>
    </header>
  );
}
