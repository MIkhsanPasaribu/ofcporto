import { NextResponse } from 'next/server';
import { seedAdmin } from '@/lib/seed-admin';

export async function GET() {
  try {
    await seedAdmin();
    return NextResponse.json({ success: true, message: 'Admin user seeded successfully' });
  } catch (error) {
    console.error('Error in admin seed route:', error);
    return NextResponse.json({ success: false, error: 'Failed to seed admin user' }, { status: 500 });
  }
}