import { XIcon } from "../Icons/X";
import styles from "./tablaventaproductos.module.css";

export function TablaVentaProductos({ productos, total, eliminarProducto }) {
  return (
    <table className={styles.tabla_productos}>
      <thead>
        <tr>
          <th className={styles.table_producto_nombre}>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio_unidad.toLocaleString("es-CL")}</td>
              <td>${producto.total.toLocaleString("es-CL")}</td>
              <td
                className={styles.actions_cell}
                onClick={() => eliminarProducto(producto.id)}
              >
                <XIcon />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No hay productos añadidos</td>
          </tr>
        )}
        <tr>
          <td>
            <strong>Total</strong>
          </td>
          <td> </td>
          <td> </td>
          <td>
            <strong>${total.toLocaleString("es-CL")}</strong>
          </td>
          <td> </td>
        </tr>
      </tbody>
    </table>
  );
}
