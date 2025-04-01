'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    contacts: 0
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For now, we'll use dummy data
    setStats({
      projects: 12,
      experiences: 5,
      skills: 20,
      contacts: 8
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-3xl font-bold">{stats.projects}</p>
          <Link href="/admin/projects" className="text-blue-600 mt-4 inline-block">
            Manage Projects →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Experiences</h2>
          <p className="text-3xl font-bold">{stats.experiences}</p>
          <Link href="/admin/experiences" className="text-blue-600 mt-4 inline-block">
            Manage Experiences →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <p className="text-3xl font-bold">{stats.skills}</p>
          <Link href="/admin/skills" className="text-blue-600 mt-4 inline-block">
            Manage Skills →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Contacts</h2>
          <p className="text-3xl font-bold">{stats.contacts}</p>
          <Link href="/admin/contacts" className="text-blue-600 mt-4 inline-block">
            View Messages →
          </Link>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </div>
  )
}