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
  credentialUrl: string | null;
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
          // Sort certifications by date (most recent first)
          data.sort((a: Certification, b: Certification) => {
            return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
          });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
      <h1 className="text-4xl font-bold mb-12 text-center">Certifications</h1>
      
      {certifications.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No certifications available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{cert.name}</h2>
                <p className="text-gray-700 mb-1">Issued by {cert.issuer}</p>
                <p className="text-sm text-gray-500 mb-3">Issued on {formatDate(cert.issueDate)}</p>
                
                {cert.expiryDate && (
                  <p className="text-sm text-gray-500 mb-3">
                    Expires on {formatDate(cert.expiryDate)}
                  </p>
                )}
                
                {cert.credentialId && (
                  <p className="text-sm text-gray-500 mb-3">
                    Credential ID: {cert.credentialId}
                  </p>
                )}
                
                {cert.credentialUrl && (
                  <div className="mt-4">
                    <Link 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Verify Credential
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}