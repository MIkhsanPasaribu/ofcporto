/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';

type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string | null;
};

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch('/api/awards');
        if (response.ok) {
          const data = await response.json();
          // Sort awards by date (most recent first)
          data.sort((a: Award, b: Award) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          setAwards(data);
        } else {
          setError('Failed to fetch awards');
        }
      } catch (error) {
        setError('An error occurred while fetching awards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Awards & Honors</h1>
      
      {awards.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No awards available.
        </div>
      ) : (
        <div className="space-y-8">
          {awards.map((award) => (
            <div key={award.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold">{award.title}</h2>
                  <h3 className="text-lg text-gray-700 mb-1">Awarded by {award.issuer}</h3>
                  <p className="text-sm text-gray-500 mb-4">{formatDate(award.date)}</p>
                </div>
              </div>
              
              {award.description && (
                <div className="prose mt-4">
                  {award.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-2">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}