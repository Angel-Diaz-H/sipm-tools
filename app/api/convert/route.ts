import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se encontró ninguna imagen." },
        { status: 400 },
      );
    }

    // Convertir el archivo a un Buffer que sharp pueda leer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Procesar con sharp
    const webpBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer();

    // Devolver la imagen convertida al cliente
    // Envolvemos el Buffer de Node en un Uint8Array estándar de la web
    return new NextResponse(new Uint8Array(webpBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Content-Disposition": `attachment; filename="${file.name.split(".")[0]}.webp"`,
      },
    });
  } catch (error) {
    console.error("Error en la conversión:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar la imagen." },
      { status: 500 },
    );
  }
}
