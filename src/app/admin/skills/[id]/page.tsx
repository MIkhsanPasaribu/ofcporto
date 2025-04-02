/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import FormField from '@/components/admin/FormField';

export default function SkillForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    level: 5,
    category: ''
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
      const fetchSkill = async () => {
        try {
          const response = await fetch(`/api/skills?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          } else {
            setStatus({
              type: 'error',
              message: 'Failed to fetch skill'
            });
          }
        } catch (error) {
          setStatus({
            type: 'error',
            message: 'An error occurred while fetching the skill'
          });
        }
      };
      
      fetchSkill();
    }
  }, [id, isNew]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'range') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value, 10)
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
      const url = isNew ? '/api/skills' : '/api/skills';
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        router.push('/admin/skills');
      } else {
        setStatus({
          type: 'error',
          message: `Failed to ${isNew ? 'create' : 'update'} skill`
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
      <h1 className="text-3xl font-bold mb-8">{isNew ? 'Add' : 'Edit'} Skill</h1>
      
      {status.type && (
        <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status.message}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <FormField label="Skill Name" htmlFor="name">
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
          
          <FormField label="Category" htmlFor="category">
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              placeholder="e.g., Frontend, Backend, DevOps"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
          
          <FormField label={`Skill Level: ${formData.level}/10`} htmlFor="level">
            <input
              type="range"
              id="level"
              name="level"
              min="1"
              max="10"
              value={formData.level}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
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
              onClick={() => router.push('/admin/skills')}
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