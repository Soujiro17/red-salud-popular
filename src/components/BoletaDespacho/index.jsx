/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styles from "./boletadespacho.module.css";

export const BoletaDespacho = forwardRef(({ data }, ref) => {
  return (
    <table className={styles.boleta} ref={ref}>
      <tbody>
        <tr>
          <th className={styles.boleta_title} colSpan="2">
            DATOS DEL REQUIRENTE
          </th>
        </tr>
        <tr>
          <th>N°Orden</th>
          <td>{data.id || 1}</td>
        </tr>
        <tr>
          <th>Fecha</th>
          <td>{data.fecha}</td>
        </tr>
        <tr>
          <th>Nombre:</th>
          <td>{`${data.nombres} ${data.apellidos}`}</td>
        </tr>
        <tr>
          <th>Dirección:</th>
          <td>{data.direccion}</td>
        </tr>
        <tr>
          <th>F.Pago</th>
          <td>{data.medioPago}</td>
        </tr>
        <tr>
          <th className={styles.boleta_title} colSpan="2">
            DATOS DEL ESTABLECIMIENTO
          </th>
        </tr>
        <tr>
          <td colSpan="2">Farmacia popular de Valparaíso</td>
        </tr>
        <tr>
          <td colSpan="2">Molina 468. Valparaíso</td>
        </tr>
        <tr>
          <td colSpan="2">DT.QF SILVANA GONZALEZ</td>
        </tr>
        <tr>
          <th>FONO</th>
          <td />
        </tr>
      </tbody>
    </table>
  );
});
