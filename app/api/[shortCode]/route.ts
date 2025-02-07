import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  const { shortCode } = params

  try {
    const shortLink = await prisma.shortLink.findUnique({
      where: { shortCode }
    })

    if (!shortLink) {
      return NextResponse.json(
        { error: 'Short link not found' },
        { status: 404 }
      )
    }

    return NextResponse.redirect(shortLink.longUrl, 302)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}