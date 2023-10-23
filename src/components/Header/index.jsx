import Link from "next/link";
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
    </header>
  );
}
