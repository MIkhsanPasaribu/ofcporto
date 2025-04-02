/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabaseAdmin } from './supabase';
import bcrypt from 'bcrypt';

export async function seedAdmin() {
  try {
    // Check if there are any users
    const { count, error: countError } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error counting users:', countError);
      return;
    }
    
    if (count === 0) {
      // Use environment variables for credentials
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
      
      if (!adminEmail || !adminPassword) {
        console.error('Admin credentials not found in environment variables');
        return;
      }
      
      // Create admin user if none exists
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert([{
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) {
        console.error('Error creating admin user:', error);
        return;
      }
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}