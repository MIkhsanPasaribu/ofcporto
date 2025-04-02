/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const id = params.id
    
    const project = await prisma.project.findUnique({
      where: {
        id
      }
    })
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}