import { NextResponse } from "next/server";
import { clientes } from "@/data/clientes";

export async function GET(req, { params }) {
  const { rut } = params;

  return NextResponse.json({
    // message: "Healthy",
    code: 200,
    status: "success",
    data: clientes.find((cliente) => cliente.rut === rut),
  });
}
