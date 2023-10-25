"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export function NavItem({ label = "", href = "/" }) {
  const pathname = usePathname();

  const className = clsx({
    [styles.navitem_link]: true,
    [styles.active]: pathname === href,
  });

  return (
    <li>
      <Link className={className} href={href}>
        {label}
      </Link>
    </li>
  );
}

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        <NavItem label="Inicio" href="/dashboard" />
        <NavItem label="Registrar venta" href="/dashboard/registrar-venta" />
        <NavItem label="Ventas" href="/test" />
      </ul>
    </nav>
  );
}
