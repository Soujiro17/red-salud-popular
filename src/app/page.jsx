/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import clsx from "clsx";

import { FormGroup } from "@/components/FormGroup";
import styles from "./page.module.css";
import { clientes, clientesSelect } from "@/data/clientes";
import { Spinner } from "@/components/Spinner";
import { parseRUT } from "@/utils/parseRut";
import { FormGroupLayout } from "@/layouts/FormGroupLayout";
import { productosSelect, productos as listaProductos } from "@/data/productos";
import { Button } from "@/components/Button";
import { metodosPago } from "@/data/metodos_pago";

const productoInitialState = {
  nombre: "",
  precio: 0,
  cantidad: 1,
};

const headers = [
  { label: "Nombres", key: "nombres" },
  { label: "Apellidos", key: "apellidos" },
  { label: "Dirección de despacho", key: "direccion" },
];

const data = [{ nombres: "Marco Vivar", apellidos: "Reyes Cáceres" }];

export default function Home() {
  const [rut, setRut] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [medioPago, setMedioPago] = useState("");
  const [productoState, setProductoState] = useState(productoInitialState);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const printRef = useRef(null);

  const handleRut = (value) => setRut(value);
  const handleMedioPago = (value) => setMedioPago(value);
  const handleClienteInfo = (e) =>
    setClienteSeleccionado((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

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

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <Button className="print-btn" type="button" schema="info">
        Registrar e imprimir
      </Button>
    );
  }, []);

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  return (
    <div className={styles.content}>
      <h1>Registrar Venta</h1>
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
        {/* <span className={styles.registrar_rut}>
          No encuentras el RUT?{" "}
          <Link className={styles.redirect} href="/">
            Registrar cliente!
          </Link>
        </span> */}
        {loading && <Spinner />}
        {!loading && clienteSeleccionado && (
          <div className="print-container" ref={printRef}>
            <h2>Datos paciente</h2>
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
              label="Dirección de despacho"
              placeholder="Dirección de despacho"
              name="direccion"
              onChange={handleClienteInfo}
            />
            <h2>Información de Venta</h2>
            <div
              className={clsx(styles.add_product_wrapper, "print-add-producto")}
            >
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
            <FormGroup
              label="Medio de pago"
              type="select"
              value={medioPago}
              onChange={handleMedioPago}
              placeholder="Medio de pago"
              options={metodosPago}
            />
            <div className={styles.btn_container}>
              <ReactToPrint
                content={reactToPrintContent}
                trigger={reactToPrintTrigger}
                documentTitle="Guía de despacho"
                removeAfterPrint
              />
              <Button className="print-btn" schema="success">
                <CSVLink data={data} headers={headers}>
                  Exportar a CSV
                </CSVLink>
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
