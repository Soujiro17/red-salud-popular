import { jsonToQueryParams } from "@/utils/jsonToQueryParams";

export const getProductos = ({ query }) =>
  fetch(`/api/productos${query ? `?${jsonToQueryParams(query)}` : ""}`, {
    method: "GET",
  }).then((res) => res.json());
