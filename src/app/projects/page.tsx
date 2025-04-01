'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (error) {
        setError('An error occurred while fetching projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
      
      {projects.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
          No projects available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {project.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-4">
                  {project.demoUrl && (
                    <Link 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                      Live Demo
                    </Link>
                  )}
                  
                  {project.githubUrl && (
                    <Link 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-900"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}