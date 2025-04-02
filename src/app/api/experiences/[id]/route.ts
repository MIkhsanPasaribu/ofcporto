/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    const experience = await prisma.experience.findUnique({
      where: {
        id
      }
    })
    
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}