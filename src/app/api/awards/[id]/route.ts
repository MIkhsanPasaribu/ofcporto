/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Using the NextRequest type from next/server
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    const award = await prisma.award.findUnique({
      where: {
        id
      }
    })
    
    if (!award) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 })
    }
    
    return NextResponse.json(award)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch award' }, { status: 500 })
  }
}