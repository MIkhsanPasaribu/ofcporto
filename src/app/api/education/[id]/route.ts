/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    
    const education = await prisma.education.findUnique({
      where: {
        id
      }
    })
    
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }
    
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}