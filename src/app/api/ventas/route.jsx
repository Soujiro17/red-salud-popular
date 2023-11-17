import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  return NextResponse.json({
    message: "POST done",
    data,
    code: 200,
    status: "success",
  });
}

// export async function GET(req) {
//   setTimeout(() => {
//     return NextResponse.json({
//       message: "Healthy",
//       code: 200,
//       status: "success",
//     });
//   });
// }
