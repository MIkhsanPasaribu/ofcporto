'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThreeScene from '@/components/ThreeScene';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
};

type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
};

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/skills')
        ]);
        
        const [projects, allSkills] = await Promise.all([
          projectsRes.json(),
          skillsRes.json()
        ]);
        
        // Get up to 3 featured projects
        setFeaturedProjects(projects.slice(0, 3));
        
        // Get top skills (highest level)
        const sortedSkills = allSkills.sort((a: Skill, b: Skill) => b.level - a.level);
        setSkills(sortedSkills.slice(0, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800 opacity-90"></div>
        {/* Add the 3D animation here */}
        <div className="absolute inset-0 opacity-40">
          <ThreeScene />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-yellow-300">M. Ikhsan Pasaribu</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8">
            Full Stack Developer | UI/UX Designer | Problem Solver
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/projects" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              View My Work
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
      
      {/* Rest of the component remains unchanged */}
      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-xl text-gray-600">Check out some of my recent work</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center text-gray-500">
              No projects available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/projects#${project.id}`} 
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      View Project &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">My Skills</h2>
            <p className="mt-4 text-xl text-gray-600">Technologies and tools I work with</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center text-gray-500">
              No skills available yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {skills.map((skill) => (
                <div key={skill.id} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                    <span className="text-2xl font-bold text-blue-600">{skill.level}</span>
                  </div>
                  <span className="text-gray-800 font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/skills" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              View All Skills
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Me Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-lg text-gray-600 mb-6">
                I'm a passionate full-stack developer with expertise in building modern web applications. 
                With a strong foundation in both frontend and backend technologies, I create seamless, 
                user-friendly experiences that solve real-world problems.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                My journey in software development began several years ago, and I've since worked on 
                various projects ranging from small business websites to complex enterprise applications.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Learn More About Me
              </Link>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                {/* Replace with your actual profile image */}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-lg">Profile Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            I'm currently available for freelance work or full-time positions. 
            If you're interested in working together, get in touch!
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}
