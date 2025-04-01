import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // This should only be used in development or with proper authorization
  // In production, you should secure this endpoint or remove it
  
  try {
    const body = await request.json();
    
    // Check if required fields are provided
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });
    
    // Return the user without the password
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}