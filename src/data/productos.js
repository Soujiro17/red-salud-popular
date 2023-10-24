export const productos = [
  {
    nombre: "Paracetamol",
    precio: 990,
    cantidad: 2,
  },
  {
    nombre: "Ibuprofeno",
    precio: 990,
    cantidad: 7,
  },
  {
    nombre: "Loratadina",
    precio: 1290,
    cantidad: 0,
  },
  {
    nombre: "Desloratadina",
    precio: 1590,
    cantidad: 5,
  },
];

export const productosSelect = productos.map((producto) => ({
  value: producto.nombre,
  label: producto.nombre,
  disabled: producto.cantidad <= 0,
  disabledMessage: "Fuera de stock",
}));
