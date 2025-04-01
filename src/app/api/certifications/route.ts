/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
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