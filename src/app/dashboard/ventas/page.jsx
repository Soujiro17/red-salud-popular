/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

"use client";

import ExcelJS from "exceljs";

import { Button } from "@/components/Button";
import { useFarmacia } from "@/hooks/useFarmacia";
import { guiaDespachoVendedorExcelHeaders } from "@/data/excel";

export default function RegistrosVentas() {
  const { ventas } = useFarmacia();

  const downloadxls = (e) => {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    // Añadimos una hoja al libro
    const sheet = workbook.addWorksheet("Mi Hoja");

    // Añadimos algunas columnas con sus nombres y datos iniciales
    sheet.columns = guiaDespachoVendedorExcelHeaders;

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

    ventas.forEach((solicitud) =>
      sheet.addRow({
        id: solicitud.id,
        estado: "",
        fecha_solicitud: new Date(
          solicitud.venta.fecha_solicitud,
        ).toLocaleDateString("es-CL"),
        fecha_entrega: new Date(
          solicitud.venta.fecha_despacho,
        ).toLocaleDateString("es-CL"),
        rut: solicitud.cliente.rut,
        nombres: solicitud.cliente.nombres,
        apellidos: solicitud.cliente.apellidos,
        telefono: solicitud.cliente.telefono,
        direccion: solicitud.cliente.direccion,
        sector: solicitud.cliente.sector,
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
        metodo_pago: solicitud.venta.medio_pago,
        OBSERVACION: "",
      }),
    );

    // Añadimos una fila individual
    sheet.addRow({ id: 4, name: "Sofía", age: 27 });

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
      <Button className="print-btn" schema="success" onClick={downloadxls}>
        Exportar guía de despacho completa
      </Button>
      <ul>
        {ventas.map((v, index) => (
          <li key={index}>{JSON.stringify(v)}</li>
        ))}
      </ul>
    </div>
  );
}

// const date = new Date().toLocaleDateString("es-CL");

// const ws = utils.json_to_sheet(ventasParsed, {
//   cellStyles: true,
// });

// const wb = utils.book_new();
// utils.book_append_sheet(wb, ws, date);
// /* generate file and send to client */
// writeFile(wb, `${date}.xlsx`);
