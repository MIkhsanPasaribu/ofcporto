/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    
    return NextResponse.json(awards)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch awards' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const award = await prisma.award.create({
      data: {
        title: body.title,
        issuer: body.issuer,
        date: new Date(body.date),
        description: body.description
      }
    })
    
    return NextResponse.json(award, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create award' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const award = await prisma.award.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        issuer: body.issuer,
        date: new Date(body.date),
        description: body.description
      }
    })
    
    return NextResponse.json(award)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update award' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await prisma.award.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete award' }, { status: 500 })
  }
}