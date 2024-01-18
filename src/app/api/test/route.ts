import { hashPassword, verifyPassword } from "@/util/cripto";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const senha = req.nextUrl.searchParams.get("senha");
  if (!senha) return new Response("Senha não informada", { status: 400 });
  const combined = hashPassword(senha);
  const result = verifyPassword(senha, combined.slice(0, 64));
  return new NextResponse(result.toString(), { status: 200 });
}
