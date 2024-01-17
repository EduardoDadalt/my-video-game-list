import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import database from "@/lib/database";
export async function GET(
  req: NextRequest,
  { params: { characterId } }: { params: { characterId: string } }
) {
  const { image: imageBytes } = await database.character.findUniqueOrThrow({
    where: { id: characterId },
    select: { image: true },
  });

  const response = new NextResponse(imageBytes);
  response.headers.set("Content-Type", "image/webp");

  return response;
}

export async function POST(
  req: NextRequest,
  { params: { characterId } }: { params: { characterId: string } }
) {
  try {
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const bufferImg: Buffer = Buffer.from(arrayBuffer);
    const outputImgBuffer = await sharp(bufferImg)
      .webp({ quality: 80 })
      .toBuffer();

    await database.character.update({
      data: {
        image: outputImgBuffer,
      },
      where: { id: characterId },
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 400 }); // Todo: Melhorar o tratamento de erros
  }
}
