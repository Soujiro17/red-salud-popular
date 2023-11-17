/* eslint-disable consistent-return */

"use client";

import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { FormGroup } from "../FormGroup";
import styles from "./registrarventaform.module.css";
import { useFarmacia } from "@/hooks/useFarmacia";

// Data
import { guiaDespachoExcelHeaders, guiaDespachoRowExample } from "@/data/excel";
import { clientesSelect } from "@/data/clientes";

import { Spinner } from "../Spinner";
import { parseRUT } from "@/utils/parseRut";
import { FormGroupLayout } from "@/layouts/FormGroupLayout";
import { Button } from "../Button";
import { metodosPago } from "@/data/metodos_pago";
import { BoletaDespacho } from "../BoletaDespacho";
import { productoInitialState } from "@/data/states";
import { addNewVenta } from "../../../lib/ventas";
import { getCliente } from "../../../lib/clientes";
import { getProductos } from "../../../lib/productos";

export function RegistrarVentaForm() {
  const [rut, setRut] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [medioPago, setMedioPago] = useState("");
  const [producto, setProducto] = useState(productoInitialState);
  const [productos, setProductos] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);

  const printRef = useRef(null);
  const promiseResolveRef = useRef(null);

  const precioTotal = productos.reduce((a, b) => a + b.total, 0);

  const { addVenta } = useFarmacia();

  const handleRut = (value) => setRut(value);
  const handleMedioPago = (value) => setMedioPago(value);
  const handleProducto = (value) => {
    const selectedProduct = listaProductos.find((p) => p.value === value);

    if (selectedProduct.cantidad <= 0) {
      toast.error("Producto fuera de stock");
      return;
    }

    setProducto((prev) => ({
      ...prev,
      nombre: value,
      precioUnidad: selectedProduct.precio,
    }));
  };
  const handleCantidad = (e) => {
    setProducto((prev) => ({
      ...prev,
      cantidad: e.target.value,
      total: prev.precioUnidad * e.target.value,
    }));
  };

  const handleClienteInfo = (e) =>
    setClienteSeleccionado((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const addProduct = () => {
    if (producto.cantidad <= 0)
      return toast.error("La cantidad debe ser mayor que cero");

    setProductos((prev) => [...prev, producto]);
    setProducto(productoInitialState);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve, reject) => {
        setIsPrinting(true);
        addNewVenta({
          data: {
            cliente: clienteSeleccionado,
            venta: { medioPago, productos },
          },
        })
          .then((data) => {
            promiseResolveRef.current = resolve;
            /* nueva venta para el state */
            addVenta({
              cliente: clienteSeleccionado,
              venta: { medioPago, productos },
            });
            resolve(data);
          })
          .catch((err) => {
            promiseResolveRef.current = reject;
            reject(err);
          });
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

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
      getCliente({ data: rut }).then((res) => setClienteSeleccionado(res.data));
    } else {
      setClienteSeleccionado(null);
    }
  }, [rut]);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await getProductos();
        const productosMapeados = res.data.map((producto) => ({
          nombre: producto.nombre,
          value: producto.nombre,
          label: producto.nombre,
          disabled: producto.stock <= 0,
          disabledMessage: "Fuera de stock",
          precio: producto.precio,
          stock: producto.stock,
        }));
        setListaProductos(productosMapeados);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchProductos();
  }, []);

  return (
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
      {loading && <Spinner loadingMessage="Buscando RUT" />}
      {!loading && clienteSeleccionado && (
        <div className="print-container">
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
                value={producto.nombre}
                name="nombre"
                onChange={handleProducto}
                placeholder="Nombre fármaco"
                options={listaProductos}
                maxLength={9}
                disableDefault
                write
              />
              <FormGroup
                label="Cantidad"
                name="cantidad"
                value={producto.cantidad}
                disabled={!producto.nombre}
                onChange={handleCantidad}
                type="number"
                placeholder="Cantidad"
                min={1}
              />
            </FormGroupLayout>
            <Button
              disabled={!(producto.nombre && producto.cantidad)}
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
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr key={producto.nombre}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precioUnidad.toLocaleString("es-CL")}</td>
                    <td>${producto.total.toLocaleString("es-CL")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No hay productos añadidos</td>
                </tr>
              )}
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td> </td>
                <td> </td>
                <td>
                  <strong>${precioTotal.toLocaleString("es-CL")}</strong>
                </td>
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
            <Button
              onClick={handlePrint}
              className="print-btn"
              type="button"
              schema="info"
            >
              Registrar e imprimir
            </Button>
            <Button className="print-btn" schema="success">
              <CSVLink
                filename={`guia-despacho-${rut}`}
                headers={guiaDespachoExcelHeaders}
                data={guiaDespachoRowExample}
              >
                Exportar a CSV
              </CSVLink>
            </Button>
          </div>
          <BoletaDespacho
            ref={printRef}
            data={{ ...clienteSeleccionado, medioPago }}
          />
        </div>
      )}
    </form>
  );
}
