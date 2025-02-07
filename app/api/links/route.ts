// app/api/links/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const links = await prisma.shortLink.findMany({
      orderBy: {
        createdAt: 'desc'
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