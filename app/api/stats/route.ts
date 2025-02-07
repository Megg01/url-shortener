// app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RequestParam {
  shortcode: string
}

export async function GET(request: Request) {
  try {
  const params: RequestParam = await request.query();

    const links = await prisma.shortLink.findFirst({
      where: {
        shortCode: params.shortcode
      }
    })

    return NextResponse.json({ links })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    )
  }
}