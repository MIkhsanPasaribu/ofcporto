/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { dbOperations } from '@/lib/db-direct';

export async function POST(request: Request) {
  try {
    console.log('[Admin Init] Starting admin initialization');
    
    // Create admin user if it doesn't exist
    const admin = await dbOperations.ensureAdminExists();
    
    console.log('[Admin Init] Admin user initialized successfully');
    return NextResponse.json({
      success: true,
      message: 'Admin user initialized successfully',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('[Admin Init] Error initializing admin user:', error);
    return NextResponse.json(
      { error: 'Failed to initialize admin user' },
      { status: 500 }
    );
  }
}