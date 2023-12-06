export const addNewVenta = ({ data }) =>
  fetch("https://farmacia-popular-backend.onrender.com/venta/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());

export const getVentas = () =>
  fetch("https://farmacia-popular-backend.onrender.com/venta/get-all", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
