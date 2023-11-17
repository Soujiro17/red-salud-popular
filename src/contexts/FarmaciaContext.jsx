"use client";

import { useMemo, createContext, useState } from "react";

export const FarmaciaContext = createContext({
  ventas: [],
  addVenta: (venta) => ({ venta }),
});

export function FarmaciaProvider({ children }) {
  const [ventas, setVentas] = useState([]);

  const addVenta = (newVenta) => {
    setVentas((prev) => [...prev, newVenta]);
  };

  const value = useMemo(() => ({ ventas, setVentas, addVenta }), [ventas]);

  return (
    <FarmaciaContext.Provider value={value}>
      {children}
    </FarmaciaContext.Provider>
  );
}
