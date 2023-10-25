"use client";

import { useRouter } from "next/navigation";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

export default function Inicio() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className={styles.main}>
      <div className={styles.login_container}>
        <Logo height={80} width={200} />
        <form onSubmit={onSubmit} className={styles.login_form}>
          <FormGroup label="RUT" placeholder="RUT" />
          <FormGroup
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
          />
          <Button type="submit" schema="info">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </main>
  );
}
