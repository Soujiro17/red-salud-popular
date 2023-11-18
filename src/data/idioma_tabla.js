const idiomaTabla = {
  search: {
    placeholder: "Buscar...",
  },
  sort: {
    sortAsc: "Ordenar columna ascendentemente",
    sortDesc: "Ordenar columna descendentemente",
  },
  pagination: {
    previous: "Anterior",
    next: "Siguiente",
    navigate: (page, pages) => `Página ${page} de ${pages}`,
    page: (page) => `Página ${page}`,
    showing: "Mostrando",
    of: "de",
    to: "a",
    results: () => "registros",
  },
  loading: "Cargando...",
  noRecordsFound: "No hay registros coincidentes",
  error: "Un error ha ocurrido mientras se obtenía la información",
};

export default idiomaTabla;
