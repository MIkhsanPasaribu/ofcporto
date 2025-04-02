/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string | null;
};

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        if (response.ok) {
          const data = await response.json();
          // Sort education by date (most recent first)
          data.sort((a: Education, b: Education) => {
            const dateA = a.current ? new Date().getTime() : new Date(a.endDate || a.startDate).getTime();
            const dateB = b.current ? new Date().getTime() : new Date(b.endDate || b.startDate).getTime();
            return dateB - dateA;
          });
          setEducation(data);
        } else {
          setError('Failed to fetch education');
        }
      } catch (error) {
        setError('An error occurred while fetching education');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
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
      <h1 className="text-4xl font-bold mb-12 text-center">Education</h1>
      
      {education.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No education information available.
        </div>
      ) : (
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold">{edu.institution}</h2>
                  <h3 className="text-lg text-gray-700 mb-1">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate!)}
                  </p>
                </div>
                
                {edu.current && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Current
                  </span>
                )}
              </div>
              
              {edu.description && (
                <div className="prose mt-4">
                  {edu.description.split('\n').map((paragraph, idx) => (
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