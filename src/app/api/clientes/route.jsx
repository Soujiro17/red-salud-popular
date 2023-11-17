import { NextResponse } from "next/server";
import { clientes } from "@/data/clientes";

export async function GET() {
  return NextResponse.json({
    // message: "Healthy",
    code: 200,
    status: "success",
    data: clientes,
  });
}
