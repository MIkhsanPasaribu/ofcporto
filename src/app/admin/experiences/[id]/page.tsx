/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FormField from '@/components/admin/FormField';

export default function ExperienceForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Just update the useEffect to use the new id variable
  useEffect(() => {
    if (!isNew) {
      const fetchExperience = async () => {
        try {
          const response = await fetch(`/api/experiences/${id}`);
          if (response.ok) {
            const data = await response.json();
            // Format dates for input fields
            setFormData({
              ...data,
              startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
              endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
            });
          } else {
            setStatus({
              type: 'error',
              message: 'Failed to fetch experience'
            });
          }
        } catch (error) {
          setStatus({
            type: 'error',
            message: 'An error occurred while fetching the experience'
          });
        }
      };
      
      fetchExperience();
    }
  }, [id, isNew]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = isNew ? '/api/experiences' : '/api/experiences';
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push('/admin/experiences');
      } else {
        setStatus({
          type: 'error',
          message: `Failed to ${isNew ? 'create' : 'update'} experience`
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
      <h1 className="text-3xl font-bold mb-8">{isNew ? 'Add' : 'Edit'} Experience</h1>
      
      {status.type && (
        <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <FormField label="Job Title" htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Company" htmlFor="company">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Location" htmlFor="location">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label="Start Date" htmlFor="startDate">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>
          
          {!formData.current && (
            <FormField label="End Date" htmlFor="endDate">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>
          )}
          
          <FormField label="Description" htmlFor="description">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/experiences')}
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