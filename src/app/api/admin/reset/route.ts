import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { authUtils } from '@/lib/auth-utils';

export async function POST(request: Request) {
  try {
    // Verify security token
    const body = await request.json();
    const token = body.token;
    const resetToken = process.env.ADMIN_RESET_TOKEN;
    
    if (!resetToken || token !== resetToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Delete all existing users
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .neq('id', '0'); // This will delete all rows
    
    if (deleteError) {
      console.error('Error deleting users:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete existing users' },
        { status: 500 }
      );
    }
    
    // Create new admin user
    const admin = await authUtils.ensureAdminExists();
    
    return NextResponse.json({
      success: true,
      message: 'Admin account reset successfully',
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error resetting admin account:', error);
    return NextResponse.json(
      { error: 'Failed to reset admin account' },
      { status: 500 }
    );
  }
}