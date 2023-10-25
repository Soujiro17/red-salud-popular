"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";

export default function Inicio() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
      toast.success("Sesión iniciada con éxito");
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.login_container}>
        <Logo height={80} width={200} />
        <form onSubmit={onSubmit} className={styles.login_form}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <FormGroup label="RUT" placeholder="RUT" />
              <FormGroup
                type="password"
                label="Contraseña"
                placeholder="Contraseña"
              />
              <Button type="submit" schema="info">
                Iniciar sesión
              </Button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
