"use client";

import { useMemo, createContext, useState, useEffect } from "react";
import { getVentas } from "../../lib/ventas";

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

  useEffect(() => {
    getVentas().then((res) => {
      setVentas(res.ventas);
    });
  }, []);

  return (
    <FarmaciaContext.Provider value={value}>
      {children}
    </FarmaciaContext.Provider>
  );
}
