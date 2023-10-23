export const clientes = [
  {
    nombres: "Vicente Thomas Mauricio",
    apellidos: "Reyes Cáceres",
    rut: "204427968",
    direccion: "Yungay 2579, Depto 21 B, Valparaíso",
  },
  {
    nombres: "Marco Antonio",
    apellidos: "Vivar De La Cruz",
    rut: "205058923",
    direccion: "Pasaje 1 222, Viña del Mar",
  },
  {
    nombres: "Marcelo Andrés",
    apellidos: "Estay Marchant",
    rut: "200684931",
    direccion: "Santa Margarita 1157, Villa Alemana",
  },
  {
    nombres: "Juan Alejandro",
    apellidos: "Larenas Veloso",
    rut: "183869329",
    direccion: "Mi casa",
  },
  {
    nombres: "Aracelly Stefany",
    apellidos: "Balboa Carvajal",
    rut: "204793905",
    direccion: "Hector Calvo 311, Valparaíso",
  },
];

export const clientesSelect = clientes.map((item) => ({
  label: `${item.rut} - ${item.nombres} ${item.apellidos}`,
  value: item.rut,
}));
