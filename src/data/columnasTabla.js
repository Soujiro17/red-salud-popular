import { toRelativeDate } from "@/utils/toRelativeDate";

export const columnasVentas = [
  {
    id: "_id",
    name: "ID",
  },
  {
    id: "rut",
    name: "RUT",
  },
  {
    id: "fecha_despacho",
    name: "Fecha Despacho",
    formatter: (c) => toRelativeDate(c),
  },
  {
    id: "fecha_solicitud",
    name: "Fecha Solicitud",
    formatter: (c) => toRelativeDate(c),
  },
  {
    id: "total",
    name: "Total venta",
    formatter: (c) => `$${c.toLocaleString("es-CL")}`,
  },
];
