// app/[shortCode]/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  context: { params: { shortCode: string } }
) {
  try {
    const params = await context.params
    const shortCode = params.shortCode

    const shortLink = await prisma.shortLink.findUnique({
      where: { shortCode }
    })


    if (!shortLink) {
      return NextResponse.json(
        { error: 'Short link not found' },
        { status: 404 }
      )
    }

    return NextResponse.redirect(shortLink.longUrl)
  } catch (error) {
    console.error("🚀 ~ error:", error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}