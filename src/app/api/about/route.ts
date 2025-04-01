/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about information' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const about = await prisma.about.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl
      }
    })
    
    return NextResponse.json(about, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create about information' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const about = await prisma.about.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl
      }
    })
    
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about information' }, { status: 500 })
  }
}