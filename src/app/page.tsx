'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import the ThreeScene component with no SSR
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false })

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero section with 3D animation */}
      <section className="relative h-screen">
        {mounted && <ThreeScene />}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Your Name</h1>
            <p className="text-xl mb-8">Web Developer & Designer</p>
            <Link 
              href="/about" 
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation to other sections */}
      <nav className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <ul className="flex flex-wrap justify-center gap-6">
            <li><Link href="/about" className="text-lg font-medium hover:text-blue-600">About</Link></li>
            <li><Link href="/experiences" className="text-lg font-medium hover:text-blue-600">Experiences</Link></li>
            <li><Link href="/projects" className="text-lg font-medium hover:text-blue-600">Projects</Link></li>
            <li><Link href="/skills" className="text-lg font-medium hover:text-blue-600">Skills</Link></li>
            <li><Link href="/education" className="text-lg font-medium hover:text-blue-600">Education</Link></li>
            <li><Link href="/certifications" className="text-lg font-medium hover:text-blue-600">Certifications</Link></li>
            <li><Link href="/awards" className="text-lg font-medium hover:text-blue-600">Awards</Link></li>
            <li><Link href="/contact" className="text-lg font-medium hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
