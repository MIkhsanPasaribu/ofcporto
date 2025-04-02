/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id
    
    const certification = await prisma.certification.findUnique({
      where: {
        id
      }
    })
    
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
    }
    
    return NextResponse.json(certification)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certification' }, { status: 500 })
  }
}