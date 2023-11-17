import { useContext } from "react";
import { FarmaciaContext } from "@/contexts/FarmaciaContext";

export function useFarmacia() {
  return useContext(FarmaciaContext);
}
