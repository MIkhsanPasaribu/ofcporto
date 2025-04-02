/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
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