import { guiaDespachoCompletaExcel } from "@/data/excel";

export function getColumnsGuiaDespacho(full = false) {
  return guiaDespachoCompletaExcel
    .filter((column) => full || column.chofer)
    .map((column) => ({
      ...column,
      style: {
        alignment: {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        },
      },
    }));
}
