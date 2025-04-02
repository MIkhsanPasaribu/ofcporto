/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility function to fetch data from API with proper base URL
 * Works in both development and production environments
 */
export const fetchFromAPI = async (endpoint: string, options = {}) => {
  // For client-side requests, we need to use the full URL in production
  // or relative URL in development
  const isClient = typeof window !== 'undefined';
  const baseUrl = isClient ? window.location.origin : '';
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options as any).headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};