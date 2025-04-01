/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type AboutData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        } else {
          setError('Failed to fetch about information');
        }
      } catch (error) {
        setError('An error occurred while fetching about information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 text-red-800 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          No about information available.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">{aboutData.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {aboutData.imageUrl && (
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={aboutData.imageUrl} 
              alt={aboutData.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        )}
        
        <div>
          <div className="prose prose-lg max-w-none">
            {aboutData.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}