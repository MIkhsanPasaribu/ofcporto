'use client';

import { useState, useEffect } from 'react';

type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
};

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences');
        if (response.ok) {
          const data = await response.json();
          // Sort experiences by date (most recent first)
          data.sort((a: Experience, b: Experience) => {
            const dateA = a.current ? new Date().getTime() : new Date(a.endDate || a.startDate).getTime();
            const dateB = b.current ? new Date().getTime() : new Date(b.endDate || b.startDate).getTime();
            return dateB - dateA;
          });
          setExperiences(data);
        } else {
          setError('Failed to fetch experiences');
        }
      } catch (error) {
        setError('An error occurred while fetching experiences');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
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
      <h1 className="text-4xl font-bold mb-12 text-center">Professional Experience</h1>
      
      {experiences.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No experiences available.
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                
                <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2"></div>
                  <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">{experience.title}</h2>
                    <h3 className="text-lg text-gray-700 mb-2">{experience.company}</h3>
                    <p className="text-sm text-gray-500 mb-1">{experience.location}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate!)}
                    </p>
                    <div className="prose">
                      {experience.description.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}