export const guiaDespachoVendedorExcel = [
  { header: "N°ORDEN", key: "id", width: 20 },
  { header: "ESTADO", key: "estado", width: 20 },
  { header: "FECHA SOLICITUD", key: "fecha_solicitud", width: 20 },
  { header: "FECHA ENTREGA", key: "fecha_entrega", width: 20 },
  { header: "RUT", key: "rut", width: 20 },
  { header: "NOMBRES", key: "nombres", width: 40 },
  { header: "APELLIDOS", key: "apellidos", width: 40 },
  { header: "TELEFONO", key: "telefono", width: 20 },
  { header: "DIRECCION", key: "direccion", width: 40 },
  { header: "SECTOR", key: "sector", width: 20 },
  { header: "DESCRIPCION", key: "descripcion", width: 40 },
  { header: "CANT", key: "cantidad", width: 20 },
  { header: "VALOT", key: "valot", width: 20 },
  { header: "TOTAL", key: "total", width: 20 },
  { header: "FORMA DE PAGO", key: "metodo_pago", width: 20 },
  { header: "OBSERVACIÓN", key: "observacion", width: 40 },
];

export const guiaDespachoVendedorExcelHeaders = guiaDespachoVendedorExcel.map(
  (column) => ({
    ...column,
    style: {
      alignment: {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      },
    },
  }),
);

export const guiaDespachoVendedorRowExample = [
  {
    id: 0,
    fecha_solicitud: "15-11",
    nombres: "Vicente Thomas Mauricio",
    apellidos: "Reyes Cáceres",
    direccion: "Yungay 2579, Depto 21 B, Valparaíso",
  },
];
