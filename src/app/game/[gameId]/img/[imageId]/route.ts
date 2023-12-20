import database from "@/lib/database";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(
  req: NextRequest,
  { params: { imageId } }: { params: { imageId: string } }
) {
  const database = new PrismaClient();
  const { data } = await database.gameImage.findUniqueOrThrow({
    where: { id: imageId },
    select: { data: true },
  });

  const response = new NextResponse(data);
  response.headers.set("Content-Type", "image/webp");

  return response;
}
