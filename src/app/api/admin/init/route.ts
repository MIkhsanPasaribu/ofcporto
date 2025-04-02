import { NextResponse } from 'next/server';
import { authUtils } from '@/lib/auth-utils';

export async function POST() {
  try {
    console.log('[Admin Init] Starting admin initialization');
    
    // Create admin user if it doesn't exist
    const admin = await authUtils.ensureAdminExists();
    
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