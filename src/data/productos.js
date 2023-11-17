export const productos = [
  {
    nombre: "Paracetamol",
    precio: 990,
    stock: 2,
  },
  {
    nombre: "Ibuprofeno",
    precio: 990,
    stock: 7,
  },
  {
    nombre: "Loratadina",
    precio: 1290,
    stock: 0,
  },
  {
    nombre: "Desloratadina",
    precio: 1590,
    stock: 5,
  },
];

export const productosSelect = productos.map((producto) => ({
  value: producto.nombre,
  label: producto.nombre,
  disabled: producto.stock <= 0,
  disabledMessage: "Fuera de stock",
}));
