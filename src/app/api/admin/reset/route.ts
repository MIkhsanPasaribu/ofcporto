import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Verifikasi token keamanan
    const body = await request.json();
    const token = body.token;
    const resetToken = process.env.ADMIN_RESET_TOKEN;
    
    if (!resetToken || token !== resetToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Hapus semua user yang ada
    await prisma.user.deleteMany({});
    
    // Ambil kredensial dari environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
    
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not found in environment variables' },
        { status: 500 }
      );
    }
    
    // Buat user admin baru
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Admin account reset successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error resetting admin account:', error);
    return NextResponse.json(
      { error: 'Failed to reset admin account' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}