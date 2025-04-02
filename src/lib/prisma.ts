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
    findUnique: async ({ where }: { where: { id: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('education')
        .select('*')
        .eq('id', where.id)
        .single();
      
      if (error) {
        console.error('Error finding education:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: education, error } = await supabaseAdmin
        .from('education')
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
        console.error('Error creating education:', error);
        throw new Error(`Failed to create education: ${error.message}`);
      }
      
      return education;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const { data: education, error } = await supabaseAdmin
        .from('education')
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
        console.error('Error updating education:', error);
        throw new Error(`Failed to update education: ${error.message}`);
      }
      
      return education;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const { error } = await supabaseAdmin
        .from('education')
        .delete()
        .eq('id', where.id);
      
      if (error) {
        console.error('Error deleting education:', error);
        throw new Error(`Failed to delete education: ${error.message}`);
      }
      
      return { id: where.id };
    }
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
    findUnique: async ({ where }: { where: { id: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('awards')
        .select('*')
        .eq('id', where.id)
        .single();
      
      if (error) {
        console.error('Error finding award:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: award, error } = await supabaseAdmin
        .from('awards')
        .insert([{
          ...data,
          date: data.date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating award:', error);
        throw new Error(`Failed to create award: ${error.message}`);
      }
      
      return award;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const { data: award, error } = await supabaseAdmin
        .from('awards')
        .update({
          ...data,
          date: data.date,
          updated_at: new Date().toISOString()
        })
        .eq('id', where.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating award:', error);
        throw new Error(`Failed to update award: ${error.message}`);
      }
      
      return award;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const { error } = await supabaseAdmin
        .from('awards')
        .delete()
        .eq('id', where.id);
      
      if (error) {
        console.error('Error deleting award:', error);
        throw new Error(`Failed to delete award: ${error.message}`);
      }
      
      return { id: where.id };
    }
  },
  
  certification: {
    findMany: async ({ orderBy }: { orderBy?: any } = {}) => {
      const { data, error } = await supabaseAdmin
        .from('certifications')
        .select('*')
        .order(orderBy?.issueDate || 'issue_date', { ascending: false });
      
      if (error) {
        console.error('Error finding certifications:', error);
        return [];
      }
      
      return data;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      const { data, error } = await supabaseAdmin
        .from('certifications')
        .select('*')
        .eq('id', where.id)
        .single();
      
      if (error) {
        console.error('Error finding certification:', error);
        return null;
      }
      
      return data;
    },
    create: async ({ data }: { data: any }) => {
      const { data: certification, error } = await supabaseAdmin
        .from('certifications')
        .insert([{
          ...data,
          issue_date: data.issueDate,
          expiry_date: data.expiryDate,
          credential_id: data.credentialId,
          credential_url: data.credentialUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating certification:', error);
        throw new Error(`Failed to create certification: ${error.message}`);
      }
      
      return certification;
    },
    update: async ({ where, data }: { where: { id: string }, data: any }) => {
      const { data: certification, error } = await supabaseAdmin
        .from('certifications')
        .update({
          ...data,
          issue_date: data.issueDate,
          expiry_date: data.expiryDate,
          credential_id: data.credentialId,
          credential_url: data.credentialUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', where.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating certification:', error);
        throw new Error(`Failed to update certification: ${error.message}`);
      }
      
      return certification;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const { error } = await supabaseAdmin
        .from('certifications')
        .delete()
        .eq('id', where.id);
      
      if (error) {
        console.error('Error deleting certification:', error);
        throw new Error(`Failed to delete certification: ${error.message}`);
      }
      
      return { id: where.id };
    }
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