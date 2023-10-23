"use client";

import { useState, useEffect } from "react";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { clientesSelect } from "@/data/clientes";
import { Spinner } from "@/components/Spinner";

export default function Home() {
  const [rut, setRut] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRut = (value) => setRut(value);

  useEffect(() => {
    let timeout;
    if (rut) {
      setLoading(true);
      timeout = setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [rut]);

  return (
    <div className={styles.content}>
      <h1>Información de la venta</h1>
      <form className={styles.formulario}>
        <FormGroup
          type="select"
          value={rut}
          onChange={handleRut}
          placeholder="RUT"
          options={clientesSelect}
          maxLength={9}
          disableDefault
          write
        />
        {loading ? <Spinner /> : rut}
      </form>
    </div>
  );
}
