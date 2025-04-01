'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this award?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/awards?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setAwards(awards.filter(award => award.id !== id));
      } else {
        setError('Failed to delete award');
      }
    } catch (error) {
      setError('An error occurred while deleting the award');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
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
        <h1 className="text-3xl font-bold">Awards & Honors</h1>
        <Link 
          href="/admin/awards/new" 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Award
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {awards.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No awards found. Add your first award!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {awards.map((award) => (
                <tr key={award.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{award.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{award.issuer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(award.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/admin/awards/${award.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(award.id)}
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