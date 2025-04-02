/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is kept for compatibility with existing imports
// It now re-exports the Supabase client instead of Prisma
import { supabaseAdmin } from './supabase';

// Export supabaseAdmin as prisma for backward compatibility
// This allows existing code to continue working with minimal changes
export const prisma = {
  user: {
    findUnique: async ({ where }: { where: { email?: string, id?: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq(where.email ? 'email' : 'id', where.email || where.id)
        .single();
      
      if (error) {
        console.error('Error finding user:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error.message}`);
      }
      
      return user;
    },
    count: async () => {
      const { count, error } = await supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error counting users:', error);
        return 0;
      }
      
      return count || 0;
    }
  },
  
  // Add other models as needed with similar patterns
  experience: {
    findMany: async ({ orderBy }: { orderBy?: any } = {}) => {
      const { data, error } = await supabaseAdmin
        .from('experiences')
        .select('*')
        .order(orderBy?.startDate || 'start_date', { ascending: orderBy?.startDate === 'asc' });
      
      if (error) {
        console.error('Error finding experiences:', error);
        return [];
      }
      
      return data;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('experiences')
        .select('*')
        .eq('id', where.id)
        .single();
      
      if (error) {
        console.error('Error finding experience:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: experience, error } = await supabaseAdmin
        .from('experiences')
        .insert([{
          ...data,
          start_date: data.startDate,
          end_date: data.endDate,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating experience:', error);
        throw new Error(`Failed to create experience: ${error.message}`);
      }
      
      return experience;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const { data: experience, error } = await supabaseAdmin
        .from('experiences')
        .update({
          ...data,
          start_date: data.startDate,
          end_date: data.endDate,
          updated_at: new Date().toISOString()
        })
        .eq('id', where.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating experience:', error);
        throw new Error(`Failed to update experience: ${error.message}`);
      }
      
      return experience;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const { error } = await supabaseAdmin
        .from('experiences')
        .delete()
        .eq('id', where.id);
      
      if (error) {
        console.error('Error deleting experience:', error);
        throw new Error(`Failed to delete experience: ${error.message}`);
      }
      
      return { id: where.id };
    }
  },
  
  // Add similar patterns for other models
  skill: {
    findMany: async ({ orderBy }: { orderBy?: any } = {}) => {
      const { data, error } = await supabaseAdmin
        .from('skills')
        .select('*')
        .order(orderBy?.category || 'category', { ascending: true });
      
      if (error) {
        console.error('Error finding skills:', error);
        return [];
      }
      
      return data;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('skills')
        .select('*')
        .eq('id', where.id)
        .single();
      
      if (error) {
        console.error('Error finding skill:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: skill, error } = await supabaseAdmin
        .from('skills')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating skill:', error);
        throw new Error(`Failed to create skill: ${error.message}`);
      }
      
      return skill;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const { data: skill, error } = await supabaseAdmin
        .from('skills')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', where.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating skill:', error);
        throw new Error(`Failed to update skill: ${error.message}`);
      }
      
      return skill;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const { error } = await supabaseAdmin
        .from('skills')
        .delete()
        .eq('id', where.id);
      
      if (error) {
        console.error('Error deleting skill:', error);
        throw new Error(`Failed to delete skill: ${error.message}`);
      }
      
      return { id: where.id };
    }
  },
  
  // Add other models as needed
  education: {
    findMany: async ({ orderBy }: { orderBy?: any } = {}) => {
      const { data, error } = await supabaseAdmin
        .from('education')
        .select('*')
        .order(orderBy?.startDate || 'start_date', { ascending: orderBy?.startDate === 'asc' });
      
      if (error) {
        console.error('Error finding education:', error);
        return [];
      }
      
      return data;
    },
    // Add other methods similar to experience
  },
  
  award: {
    findMany: async ({ orderBy }: { orderBy?: any } = {}) => {
      const { data, error } = await supabaseAdmin
        .from('awards')
        .select('*')
        .order(orderBy?.date || 'date', { ascending: orderBy?.date === 'asc' });
      
      if (error) {
        console.error('Error finding awards:', error);
        return [];
      }
      
      return data;
    },
    // Add other methods similar to experience
  },
  
  certification: {
    findMany: async () => {
      const { data, error } = await supabaseAdmin
        .from('certifications')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (error) {
        console.error('Error finding certifications:', error);
        return [];
      }
      
      return data;
    },
    // Add other methods similar to experience
  },
  
  about: {
    findMany: async () => {
      const { data, error } = await supabaseAdmin
        .from('about')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error finding about:', error);
        return [];
      }
      
      return data;
    },
    // Add other methods similar to experience
  },
  
  project: {
    findMany: async () => {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error finding projects:', error);
        return [];
      }
      
      return data;
    },
    // Add other methods similar to experience
  },
  
  // Add a disconnect method for compatibility
  $disconnect: async () => {
    // No need to disconnect from Supabase
    return Promise.resolve();
  }
};