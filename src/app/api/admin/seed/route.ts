import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Seeding admin user...');
    
    // Check if admin user already exists
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('Admin email not found in environment variables');
      return NextResponse.json(
        { error: 'Admin email not found in environment variables' },
        { status: 500 }
      );
    }
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return NextResponse.json({ 
        message: 'Admin user already exists',
        admin: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name
        }
      });
    }
    
    // Admin doesn't exist, create one
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
    
    if (!adminPassword) {
      console.error('Admin password not found in environment variables');
      return NextResponse.json(
        { error: 'Admin password not found in environment variables' },
        { status: 500 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const newAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
      },
    });
    
    console.log('Admin user created successfully');
    return NextResponse.json({
      message: 'Admin user created successfully',
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name
      }
    });
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
    return NextResponse.json(
      { error: 'Failed to seed admin user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}