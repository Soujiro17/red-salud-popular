"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { clientes, clientesSelect } from "@/data/clientes";
import { Spinner } from "@/components/Spinner";
import { parseRUT } from "@/utils/parseRut";
import { FormGroupLayout } from "@/layouts/FormGroupLayout";
import { productosSelect, productos as listaProductos } from "@/data/productos";
import { Button } from "@/components/Button";

const productoInitialState = {
  nombre: "",
  precio: 0,
  cantidad: 1,
};

export default function Home() {
  const [rut, setRut] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productoState, setProductoState] = useState(productoInitialState);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRut = (value) => setRut(value);

  const handleProductoState = (e) => {
    const productoEncontrado = listaProductos.find(
      (producto) =>
        producto.nombre.toLocaleLowerCase() ===
          productoState.nombre.toLocaleLowerCase() ||
        producto.nombre.toLocaleLowerCase() ===
          e.target.value?.toLocaleLowerCase(),
    );

    if (productoEncontrado.cantidad <= 0) {
      alert("Producto fuera de stock");
      return;
    }

    const precioFinal = productoState.cantidad * productoEncontrado.precio;

    if (e?.target?.name === "cantidad") {
      setProductoState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        precio: e.target.value * productoEncontrado.precio,
      }));
    } else {
      setProductoState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        precio: precioFinal,
      }));
    }
  };

  const addProduct = () => {
    setProductos((prev) => [...prev, productoState]);
    setProductoState(productoInitialState);
  };

  // const deleteProduct = (nombre) => {
  //   setProductos((prev) => prev.filter((producto) => producto.name !== nombre));
  // };

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
      setClienteSeleccionado(clientes.find((cliente) => cliente.rut === rut));
    } else {
      setClienteSeleccionado(null);
    }
  }, [rut]);

  const precioTotal = productos.reduce((a, b) => a + b.precio, 0);

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
        {!loading && clienteSeleccionado && (
          <>
            <h2>Datos cliente</h2>
            <FormGroup
              value={parseRUT(clienteSeleccionado?.rut)}
              label="RUT"
              placeholder="RUT"
              readOnly
            />
            <FormGroupLayout columns="1fr 1fr">
              <FormGroup
                value={clienteSeleccionado?.nombres}
                label="Nombres"
                placeholder="Nombres"
                readOnly
              />
              <FormGroup
                value={clienteSeleccionado?.apellidos}
                label="Apellidos"
                placeholder="Apellidos"
                readOnly
              />
            </FormGroupLayout>
            <FormGroup
              value={clienteSeleccionado?.direccion}
              label="Dirección"
              placeholder="Dirección"
            />
            <h2>Información de compra</h2>
            <div className={styles.add_product_wrapper}>
              <FormGroupLayout columns="1fr 1fr">
                <FormGroup
                  label="Fármaco"
                  type="select"
                  value={productoState.nombre}
                  name="nombre"
                  onChange={(e) => {
                    handleProductoState({
                      target: { name: "nombre", value: e },
                    });
                  }}
                  placeholder="Nombre fármaco"
                  options={productosSelect}
                  maxLength={9}
                  disableDefault
                  write
                />
                <FormGroup
                  label="Cantidad"
                  name="cantidad"
                  value={productoState.cantidad}
                  disabled={!productoState.nombre}
                  onChange={handleProductoState}
                  type="number"
                  placeholder="Cantidad"
                  min={1}
                />
              </FormGroupLayout>
              <Button
                disabled={!(productoState.nombre && productoState.cantidad)}
                onClick={addProduct}
                schema="success"
              >
                +
              </Button>
            </div>
            <table className={styles.tabla_productos}>
              <thead>
                <tr>
                  <th className={styles.table_producto_nombre}>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <tr key={producto.nombre}>
                      <td>{producto.nombre}</td>
                      <td>{producto.cantidad}</td>
                      <td>${producto.precio.toLocaleString("es-CL")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No hay productos añadidos</td>
                  </tr>
                )}
                <tr>
                  <td>Total</td>
                  <td> </td>
                  <td>${precioTotal.toLocaleString("es-CL")}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </form>
    </div>
  );
}
