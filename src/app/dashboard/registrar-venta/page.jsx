import styles from "./page.module.css";
import { RegistrarVentaForm } from "@/components/RegistrarVentaForm";

export default function Home() {
  return (
    <div className={styles.content}>
      <h1>Registrar Venta</h1>
      <RegistrarVentaForm />
    </div>
  );
}
