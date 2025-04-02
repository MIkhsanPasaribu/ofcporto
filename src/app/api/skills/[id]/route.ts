/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id
    
    const skill = await prisma.skill.findUnique({
      where: {
        id
      }
    })
    
    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
    }
    
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 })
  }
}