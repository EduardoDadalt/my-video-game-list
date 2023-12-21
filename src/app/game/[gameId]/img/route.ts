import database from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(
  req: NextRequest,
  { params: { gameId } }: { params: { gameId: string } }
) {
  try {
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const bufferImg: Buffer = Buffer.from(arrayBuffer);
    const outputImgBuffer = await sharp(bufferImg)
      .webp({ quality: 80 })
      .toBuffer();

    await database.gameImage.create({
      data: {
        data: outputImgBuffer,
        gameId: gameId,
      },
    });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 400 }); // Todo: Melhorar o tratamento de erros
  }
}
