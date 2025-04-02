import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a Supabase client for client-side usage (limited permissions)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Create a Supabase admin client for server-side operations (full permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Log Supabase configuration for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase Configuration:', {
    url: supabaseUrl ? 'Set' : 'Not Set',
    key: supabaseKey ? 'Set' : 'Not Set',
    serviceKey: supabaseServiceKey ? 'Set' : 'Not Set',
  });
}
