/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  // Get the URL and create a URL object to parse query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  // If ID is provided, return a single skill
  if (id) {
    try {
      const skill = await prisma.skill.findUnique({
        where: { id }
      })
      
      if (!skill) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
      }
      
      return NextResponse.json(skill)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 })
    }
  }
  
  // Otherwise, return all skills (existing functionality)
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        category: 'asc'
      }
    })
    
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        level: body.level || 0,
        category: body.category
      }
    })
    
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const skill = await prisma.skill.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        level: body.level || 0,
        category: body.category
      }
    })
    
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await prisma.skill.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}