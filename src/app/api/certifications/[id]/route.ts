/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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