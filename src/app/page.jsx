"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { clientes, clientesSelect } from "@/data/clientes";
import { Spinner } from "@/components/Spinner";
import { parseRUT } from "@/utils/parseRut";
import { FormGroupLayout } from "@/layouts/FormGroupLayout";

export default function Home() {
  const [rut, setRut] = useState("");
  const [selected, setSelected] = useState(null);
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

  useEffect(() => {
    if (rut) {
      setSelected(clientes.find((cliente) => cliente.rut === rut));
    } else {
      setSelected(null);
    }
  }, [rut]);

  return (
    <div className={styles.content}>
      <h1>Registrar compra</h1>
      <form className={styles.formulario}>
        <FormGroup
          label="RUT"
          type="select"
          value={rut}
          onChange={handleRut}
          placeholder="RUT"
          options={clientesSelect}
          maxLength={9}
          disableDefault
          write
        />
        <span className={styles.registrar_rut}>
          No encuentras el RUT?{" "}
          <Link className={styles.redirect} href="/">
            Registrar cliente!
          </Link>
        </span>
        {loading && <Spinner />}
        {!loading && selected && (
          <>
            <h2>Datos cliente</h2>
            <FormGroup
              value={parseRUT(selected?.rut)}
              label="RUT"
              placeholder="RUT"
              disabled
            />
            <FormGroupLayout columns="1fr 1fr">
              <FormGroup
                value={selected?.nombres}
                label="Nombres"
                placeholder="Nombres"
                disabled
              />
              <FormGroup
                value={selected?.apellidos}
                label="Apellidos"
                placeholder="Apellidos"
                disabled
              />
            </FormGroupLayout>
            <FormGroup
              value={selected?.direccion}
              label="Dirección"
              placeholder="Dirección"
            />
            <h2>Información de compra</h2>
            <FormGroup
              label="Monto total"
              type="number"
              placeholder="Monto total"
            />
          </>
        )}
      </form>
    </div>
  );
}
