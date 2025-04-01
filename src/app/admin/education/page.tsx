'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
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
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/education?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setEducation(education.filter(edu => edu.id !== id));
      } else {
        setError('Failed to delete education entry');
      }
    } catch (error) {
      setError('An error occurred while deleting the education entry');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <Link 
          href="/admin/education/new" 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Education
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {education.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No education entries found. Add your first education!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {education.map((edu) => (
                <tr key={edu.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{edu.institution}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{edu.degree}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{edu.field || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/admin/education/${edu.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}