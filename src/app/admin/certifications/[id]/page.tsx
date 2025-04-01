'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/admin/FormField';

export default function CertificationForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: ''
  });
  
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isNew) {
      const fetchCertification = async () => {
        try {
          const response = await fetch(`/api/certifications/${id}`);
          if (response.ok) {
            const data = await response.json();
            // Format dates for input fields
            setFormData({
              ...data,
              issueDate: data.issueDate ? new Date(data.issueDate).toISOString().split('T')[0] : '',
              expiryDate: data.expiryDate ? new Date(data.expiryDate).toISOString().split('T')[0] : '',
            });
          } else {
            setStatus({
              type: 'error',
              message: 'Failed to fetch certification'
            });
          }
        } catch (error) {
          setStatus({
            type: 'error',
            message: 'An error occurred while fetching the certification'
          });
        }
      };
      
      fetchCertification();
    }
  }, [id, isNew]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = isNew ? '/api/certifications' : '/api/certifications';
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push('/admin/certifications');
      } else {
        setStatus({
          type: 'error',
          message: `Failed to ${isNew ? 'create' : 'update'} certification`
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{isNew ? 'Add' : 'Edit'} Certification</h1>
      
      {status.type && (
        <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <FormField label="Certification Name" htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Issuing Organization" htmlFor="issuer">
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Issue Date" htmlFor="issueDate">
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Expiry Date (if applicable)" htmlFor="expiryDate">
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Credential ID" htmlFor="credentialId">
            <input
              type="text"
              id="credentialId"
              name="credentialId"
              value={formData.credentialId || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Credential URL" htmlFor="credentialUrl">
            <input
              type="url"
              id="credentialUrl"
              name="credentialUrl"
              value={formData.credentialUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/verify/credential"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/certifications')}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}