import { supabaseAdmin } from './supabase';
import bcrypt from 'bcrypt';

export const authUtils = {
  // Find user by email
  async findUserByEmail(email: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error) {
      console.error('Error finding user:', error);
      return null;
    }
    
    return data;
  },
  
  // Create a new user
  async createUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        { 
          email, 
          password: hashedPassword, 
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    return data;
  },
  
  // Verify password
  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
  
  // Ensure admin exists
  async ensureAdminExists() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
    
    if (!adminEmail || !adminPassword) {
      throw new Error('Admin credentials not found in environment variables');
    }
    
    // Check if admin exists
    const existingAdmin = await this.findUserByEmail(adminEmail);
    if (existingAdmin) {
      return existingAdmin;
    }
    
    // Create admin if not exists
    console.log('Creating admin user...');
    return this.createUser(adminEmail, adminPassword, adminName);
  }
};