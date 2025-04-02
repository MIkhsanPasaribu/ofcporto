/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility function to fetch data from API with proper base URL
 * Works in both development and production environments
 */
/**
 * Utility function for making API requests that works in both development and production
 */
export const getApiUrl = () => {
  // In the browser (client-side)
  if (typeof window !== 'undefined') {
    // Use the configured API URL or fall back to the current origin
    return process.env.NEXT_PUBLIC_API_URL || window.location.origin;
  }
  
  // On the server (server-side)
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export const fetchFromAPI = async (endpoint: string, options = {}) => {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  console.log(`Fetching from: ${url}`);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options as any).headers,
      },
    });
    
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};