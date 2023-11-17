import { NextResponse } from "next/server";
import { productos } from "@/data/productos";

export async function GET() {
  return NextResponse.json({
    // message: "Healthy",
    code: 200,
    status: "success",
    data: productos,
  });
}
