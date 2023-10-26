import Link from "next/link";
import { ClipboardIcon } from "@/components/Icons/Clipboard";
import styles from "./dashboard.module.css";
import { FilesIcon } from "@/components/Icons/Files";

function Box({ text = "", icon: Icon, href = "/" }) {
  return (
    <Link href={href} className={styles.caja}>
      <p>{text}</p>
      {Icon ? <Icon /> : null}
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <h1>Bienvenidos a la plataforma de administración de ventas</h1>
      <div className={styles.cajas}>
        <Box
          text="Registrar venta para generar guía de despacho o descarga CSV"
          icon={ClipboardIcon}
          href="/dashboard/registrar-venta"
        />
        <Box
          text="Revisar, analizar y descargar ventas registradas en la plataforma"
          icon={FilesIcon}
          href="/dashboard/ventas"
        />
      </div>
    </div>
  );
}
