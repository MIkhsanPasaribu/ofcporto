'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
};

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('/api/certifications');
        if (response.ok) {
          const data = await response.json();
          setCertifications(data);
        } else {
          setError('Failed to fetch certifications');
        }
      } catch (error) {
        setError('An error occurred while fetching certifications');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCertifications();
  }, []);
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/certifications?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setCertifications(certifications.filter(cert => cert.id !== id));
      } else {
        setError('Failed to delete certification');
      }
    } catch (error) {
      setError('An error occurred while deleting the certification');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
        <h1 className="text-3xl font-bold">Certifications</h1>
        <Link 
          href="/admin/certifications/new" 
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Certification
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {certifications.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No certifications found. Add your first certification!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1">{cert.name}</h2>
                <p className="text-gray-600 mb-3">Issued by {cert.issuer}</p>
                <div className="text-sm text-gray-500 mb-3">
                  <p>Issued: {formatDate(cert.issueDate)}</p>
                  {cert.expiryDate && <p>Expires: {formatDate(cert.expiryDate)}</p>}
                  {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
                </div>
                <div className="flex justify-end space-x-2">
                  <Link 
                    href={`/admin/certifications/${cert.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}