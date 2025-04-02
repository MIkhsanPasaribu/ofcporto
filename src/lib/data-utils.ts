/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from './supabase';

export const dataOperations = {
  // About operations
  async getAbout() {
    const { data, error } = await supabaseAdmin
      .from('about')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      console.error('Error fetching about:', error);
      throw new Error(`Failed to fetch about: ${error.message}`);
    }
    
    return data;
  },
  
  async createAbout(aboutData: any) {
    const { data, error } = await supabaseAdmin
      .from('about')
      .insert([{
        ...aboutData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating about:', error);
      throw new Error(`Failed to create about: ${error.message}`);
    }
    
    return data;
  },
  
  async updateAbout(id: string, aboutData: any) {
    const { data, error } = await supabaseAdmin
      .from('about')
      .update({
        ...aboutData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating about:', error);
      throw new Error(`Failed to update about: ${error.message}`);
    }
    
    return data;
  },
  
  // Experience operations
  async getExperiences() {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });
      
    if (error) {
      console.error('Error fetching experiences:', error);
      throw new Error(`Failed to fetch experiences: ${error.message}`);
    }
    
    return data;
  },
  
  async getExperienceById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching experience:', error);
      throw new Error(`Failed to fetch experience: ${error.message}`);
    }
    
    return data;
  },
  
  async createExperience(experienceData: any) {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .insert([{
        ...experienceData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating experience:', error);
      throw new Error(`Failed to create experience: ${error.message}`);
    }
    
    return data;
  },
  
  async updateExperience(id: string, experienceData: any) {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .update({
        ...experienceData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating experience:', error);
      throw new Error(`Failed to update experience: ${error.message}`);
    }
    
    return data;
  },
  
  async deleteExperience(id: string) {
    const { error } = await supabaseAdmin
      .from('experiences')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting experience:', error);
      throw new Error(`Failed to delete experience: ${error.message}`);
    }
    
    return { success: true };
  },
  
  // Project operations
  async getProjects() {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching projects:', error);
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
    
    return data;
  },
  
  async getProjectById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching project:', error);
      throw new Error(`Failed to fetch project: ${error.message}`);
    }
    
    return data;
  },
  
  async createProject(projectData: any) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        ...projectData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating project:', error);
      throw new Error(`Failed to create project: ${error.message}`);
    }
    
    return data;
  },
  
  async updateProject(id: string, projectData: any) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
        ...projectData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating project:', error);
      throw new Error(`Failed to update project: ${error.message}`);
    }
    
    return data;
  },
  
  async deleteProject(id: string) {
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting project:', error);
      throw new Error(`Failed to delete project: ${error.message}`);
    }
    
    return { success: true };
  },
  
  // Skills operations
  async getSkills() {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .select('*')
      .order('category', { ascending: true });
      
    if (error) {
      console.error('Error fetching skills:', error);
      throw new Error(`Failed to fetch skills: ${error.message}`);
    }
    
    return data;
  },
  
  async getSkillById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching skill:', error);
      throw new Error(`Failed to fetch skill: ${error.message}`);
    }
    
    return data;
  },
  
  async createSkill(skillData: any) {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .insert([{
        ...skillData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating skill:', error);
      throw new Error(`Failed to create skill: ${error.message}`);
    }
    
    return data;
  },
  
  async updateSkill(id: string, skillData: any) {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .update({
        ...skillData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating skill:', error);
      throw new Error(`Failed to update skill: ${error.message}`);
    }
    
    return data;
  },
  
  async deleteSkill(id: string) {
    const { error } = await supabaseAdmin
      .from('skills')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting skill:', error);
      throw new Error(`Failed to delete skill: ${error.message}`);
    }
    
    return { success: true };
  },
  
  // Education operations
  async getEducation() {
    const { data, error } = await supabaseAdmin
      .from('education')
      .select('*')
      .order('start_date', { ascending: false });
      
    if (error) {
      console.error('Error fetching education:', error);
      throw new Error(`Failed to fetch education: ${error.message}`);
    }
    
    return data;
  },
  
  // Add similar methods for other entities (education, awards, etc.)
};