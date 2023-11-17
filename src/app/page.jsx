"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";

export default function Inicio() {
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      toast.success("Sesión iniciada con éxito");
      setUser({
        nombres: "Vicente Thomas Mauricio",
        apellidos: "Reyes Cáceres",
      });
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.login_container}>
        <Logo height={80} width={200} />
        <form onSubmit={onSubmit} className={styles.login_form}>
          {isLoading ? (
            <Spinner loadingMessage="Iniciando sesión" />
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
