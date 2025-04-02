/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  // Get the URL and create a URL object to parse query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  // If ID is provided, return a single certification
  if (id) {
    try {
      const certification = await prisma.certification.findUnique({
        where: { id }
      })
      
      if (!certification) {
        return NextResponse.json({ error: 'Certification not found' }, { status: 404 })
      }
      
      return NextResponse.json(certification)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch certification' }, { status: 500 })
    }
  }
  
  // Otherwise, return all certifications (existing functionality)
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: {
        issueDate: 'desc'
      }
    })
    
    return NextResponse.json(certifications)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const certification = await prisma.certification.create({
      data: {
        name: body.name,
        issuer: body.issuer,
        issueDate: new Date(body.issueDate),
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        credentialId: body.credentialId,
        credentialUrl: body.credentialUrl
      }
    })
    
    return NextResponse.json(certification, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const certification = await prisma.certification.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        issuer: body.issuer,
        issueDate: new Date(body.issueDate),
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        credentialId: body.credentialId,
        credentialUrl: body.credentialUrl
      }
    })
    
    return NextResponse.json(certification)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await prisma.certification.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 })
  }
}