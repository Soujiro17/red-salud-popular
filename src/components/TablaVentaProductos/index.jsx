import styles from "./tablaventaproductos.module.css";

export function TablaVentaProductos({ productos, total }) {
  return (
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
            <strong>${total.toLocaleString("es-CL")}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
