import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request
) {
  try {
    const url = new URL(request.url)
    const shortCode = url.pathname.split('/')[2]

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
