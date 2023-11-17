export const getCliente = ({ data }) =>
  fetch(`/api/clientes/${data}`, {
    method: "GET",
  }).then((res) => res.json());
