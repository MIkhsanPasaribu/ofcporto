/**
 * Utility function to fetch data from API with proper base URL
 * Works in both development and production environments
 */
/**
 * Utility for making API requests that works in both development and production
 */

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