import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

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
    
    const { data: existingAdmin, error: findError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', adminEmail)
      .single();
    
    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding admin:', findError);
      return NextResponse.json(
        { error: 'Error finding admin user' },
        { status: 500 }
      );
    }
    
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
    
    const { data: newAdmin, error: createError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating admin:', createError);
      return NextResponse.json(
        { error: 'Failed to create admin user' },
        { status: 500 }
      );
    }
    
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
  }
}