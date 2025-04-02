import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

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
    const { data: existingUser, error: findError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', body.email)
      .single();
    
    if (findError && findError.code !== 'PGRST116') {
      console.error('Error checking existing user:', findError);
      return NextResponse.json(
        { error: 'Error checking if user exists' },
        { status: 500 }
      );
    }
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const hashedPassword = await bcrypt.hash(body.password, 12);
    
    const { data: user, error: createError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email: body.email,
          password: hashedPassword,
          name: body.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}