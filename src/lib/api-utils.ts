/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility function to fetch data from API with proper base URL
 * Works in both development and production environments
 */
export const fetchFromAPI = async (endpoint: string, options = {}) => {
  // For client-side requests, we need to use the full URL in production
  // or relative URL in development
  const isClient = typeof window !== 'undefined';
  let baseUrl = '';
  
  if (isClient) {
    // In the browser, use the current origin or the configured API URL
    baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
  } else {
    // On the server, use the configured API URL or default to empty (relative URLs)
    baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }
  
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