/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  // Get the URL and create a URL object to parse query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  // If ID is provided, return a single experience
  if (id) {
    try {
      const experience = await prisma.experience.findUnique({
        where: { id }
      })
      
      if (!experience) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
      }
      
      return NextResponse.json(experience)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
    }
  }
  
  // Otherwise, return all experiences (existing functionality)
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc'
      }
    })
    
    return NextResponse.json(experiences)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const experience = await prisma.experience.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        description: body.description
      }
    })
    
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const experience = await prisma.experience.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        description: body.description
      }
    })
    
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await prisma.experience.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}