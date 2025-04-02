/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from './supabase';

// Get the base URL for API requests
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }
  
  // Server should use absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return `http://localhost:${process.env.PORT || 3000}`;
};

// Generic fetch function for API requests
export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${getBaseUrl()}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  console.log(`[API] Fetching from: ${url}`);
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });
  
  if (!response.ok) {
    console.error(`[API] Request failed: ${response.status} ${response.statusText}`);
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }
  
  return response.json();
};

// Supabase data operations
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
  
  // Add similar methods for other entities (projects, skills, education, etc.)
};