import { Grid } from "gridjs-react";
import idiomaTabla from "@/data/idioma_tabla";
import "gridjs/dist/theme/mermaid.css";

export function Table({ columnas, data }) {
  return (
    <Grid
      data={data}
      language={idiomaTabla}
      columns={columnas}
      pagination={{
        limit: 10,
      }}
      search
      sort
    />
  );
}
