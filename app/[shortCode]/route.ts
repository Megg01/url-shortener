import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  try {
    const shortCode = (await params).shortCode;

    const shortLink = await prisma.shortLink.update({
      where: { shortCode },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    if (!shortLink) {
      return NextResponse.json(
        { error: "Short link not found" },
        { status: 404 },
      );
    }

    return NextResponse.redirect(shortLink.longUrl);
  } catch (error) {
    if (error instanceof Error) {
      console.error("🚀 ~ error:", error);
    } else {
      console.error("��� ~ error:", error);
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
