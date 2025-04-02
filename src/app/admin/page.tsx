/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchFromAPI } from '@/lib/api-utils';

type DashboardStats = {
  projects: number;
  experiences: number;
  skills: number;
  education: number;
  certifications: number;
  awards: number;
  unreadMessages: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    experiences: 0,
    skills: 0,
    education: 0,
    certifications: 0,
    awards: 0,
    unreadMessages: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [
          projects,
          experiences,
          skills,
          education,
          certifications,
          awards,
          contacts
        ] = await Promise.all([
          fetchFromAPI('api/projects'),
          fetchFromAPI('api/experiences'),
          fetchFromAPI('api/skills'),
          fetchFromAPI('api/education'),
          fetchFromAPI('api/certifications'),
          fetchFromAPI('api/awards'),
          fetchFromAPI('api/contacts')
        ]);
        
        setStats({
          projects: projects.length,
          experiences: experiences.length,
          skills: skills.length,
          education: education.length,
          certifications: certifications.length,
          awards: awards.length,
          unreadMessages: contacts.filter((c: any) => !c.read).length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const statCards = [
    { name: 'Projects', count: stats.projects, href: '/admin/projects', color: 'bg-blue-500' },
    { name: 'Experiences', count: stats.experiences, href: '/admin/experiences', color: 'bg-green-500' },
    { name: 'Skills', count: stats.skills, href: '/admin/skills', color: 'bg-yellow-500' },
    { name: 'Education', count: stats.education, href: '/admin/education', color: 'bg-purple-500' },
    { name: 'Certifications', count: stats.certifications, href: '/admin/certifications', color: 'bg-pink-500' },
    { name: 'Awards', count: stats.awards, href: '/admin/awards', color: 'bg-indigo-500' },
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {stats.unreadMessages > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded-md">
          <div className="flex items-center">
            <div className="py-1">
              <p className="font-bold">You have {stats.unreadMessages} unread message{stats.unreadMessages !== 1 ? 's' : ''}!</p>
              <p className="text-sm">
                <Link href="/admin/contacts" className="underline">
                  View messages
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className={`h-2 ${stat.color}`}></div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{stat.name}</h2>
                <p className="text-3xl font-bold mt-2">{stat.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/admin/projects/new" 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
          >
            Add New Project
          </Link>
          <Link 
            href="/admin/experiences/new" 
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center"
          >
            Add New Experience
          </Link>
          <Link 
            href="/admin/skills/new" 
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 text-center"
          >
            Add New Skill
          </Link>
          <Link 
            href="/admin/education/new" 
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-center"
          >
            Add New Education
          </Link>
          <Link 
            href="/admin/certifications/new" 
            className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 text-center"
          >
            Add New Certification
          </Link>
          <Link 
            href="/admin/awards/new" 
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-center"
          >
            Add New Award
          </Link>
        </div>
      </div>
    </div>
  );
}