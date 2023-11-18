/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

"use client";

import ExcelJS from "exceljs";

import { Button } from "@/components/Button";
import { useFarmacia } from "@/hooks/useFarmacia";
import { getColumnsGuiaDespacho } from "@/utils/getColumnsGuiaDespacho";
import styles from "./ventas.module.css";
import { Table } from "@/components/Table";

export default function RegistrosVentas() {
  const { ventas } = useFarmacia();

  const downloadxls = (e, full = false) => {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("Mi Hoja");

    sheet.columns = getColumnsGuiaDespacho(full);

    const headerRow = sheet.getRow(1);

    headerRow.height = 30;

    headerRow.eachCell((cell) => {
      cell.style = {
        alignment: {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" },
        },
        font: {
          color: { argb: "000" },
          bold: true,
        },
      };
    });

    ventas.forEach((solicitud) => {
      const baseRow = {
        id: solicitud.id,
        nombres: solicitud.cliente.nombres,
        apellidos: solicitud.cliente.apellidos,
        telefono: solicitud.cliente.telefono,
        direccion: solicitud.cliente.direccion,
        sector: solicitud.cliente.sector,
        metodo_pago: solicitud.venta.medio_pago,
        observacion: "",
      };

      sheet.addRow(
        full
          ? {
              ...baseRow,
              estado: "",
              fecha_solicitud: new Date(
                solicitud.venta.fecha_solicitud,
              ).toLocaleDateString("es-CL"),
              fecha_entrega: new Date(
                solicitud.venta.fecha_despacho,
              ).toLocaleDateString("es-CL"),
              rut: solicitud.cliente.rut,

              descripcion: solicitud.venta.productos
                .map((producto) => producto.nombre)
                .join("\n"),
              cantidad: solicitud.venta.productos
                .map((producto) => producto.cantidad)
                .join("\n"),
              valot: solicitud.venta.productos
                .map((producto) =>
                  "$".concat(producto.precioUnidad.toLocaleString("es-CL")),
                )
                .join("\n"),
              total: "$".concat(solicitud.venta.total.toLocaleString("es-CL")),
            }
          : baseRow,
      );
    });

    // Escribimos el archivo de Excel en el navegador para descargarlo
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${new Date().toLocaleDateString("es-CL")}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="content">
      <h1>Lista de Ventas</h1>
      <section className={styles.btns_wrapper}>
        <Button
          className="print-btn"
          schema="success"
          onClick={(e) => downloadxls(e, true)}
        >
          Exportar guía de despacho completa
        </Button>
        <Button
          className="print-btn"
          schema="info"
          onClick={(e) => downloadxls(e)}
        >
          Exportar guía de despacho chofer
        </Button>
      </section>
      <Table />
    </div>
  );
}
