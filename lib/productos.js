export const getProductos = () =>
  fetch("/api/productos", {
    method: "GET",
  }).then((res) => res.json());
