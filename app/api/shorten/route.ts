import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

interface RequestBody {
  url: string,
  expiresAt: Date | null,
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()
  
  if (!isValidUrl(body.url)) {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 }
    )
  }

  const shortCode = nanoid(6)
  
  try {
    await prisma.shortLink.create({
      data: {
        longUrl: body.url,
        expiresAt: body.expiresAt || null,
        shortCode
      }
    })
    
    const origin = request.headers.get('origin') || ''
    return NextResponse.json({ 
      shortUrl: `${origin}/${shortCode}`
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}