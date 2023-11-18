import { Grid } from "gridjs-react";
import idiomaTabla from "@/data/idioma_tabla";
import "gridjs/dist/theme/mermaid.css";

export function Table() {
  return (
    <Grid
      data={[
        ["John", "john@example.com"],
        ["Mike", "mike@gmail.com"],
      ]}
      language={idiomaTabla}
      columns={["Name", "Email"]}
      pagination={{
        limit: 10,
      }}
      search
      sort
    />
  );
}
