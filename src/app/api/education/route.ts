/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  // Get the URL and create a URL object to parse query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  // If ID is provided, return a single education
  if (id) {
    try {
      const education = await prisma.education.findUnique({
        where: { id }
      })
      
      if (!education) {
        return NextResponse.json({ error: 'Education not found' }, { status: 404 })
      }
      
      return NextResponse.json(education)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
    }
  }
  
  // Otherwise, return all education (existing functionality)
  try {
    const education = await prisma.education.findMany({
      orderBy: {
        startDate: 'desc'
      }
    })
    
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const education = await prisma.education.create({
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        description: body.description
      }
    })
    
    return NextResponse.json(education, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const education = await prisma.education.update({
      where: {
        id: body.id
      },
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        description: body.description
      }
    })
    
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await prisma.education.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}