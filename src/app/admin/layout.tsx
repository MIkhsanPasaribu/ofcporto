import { ReactNode } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Portfolio CMS</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link href="/admin" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/about" className="block py-2 px-4 hover:bg-gray-700">
                About
              </Link>
            </li>
            <li>
              <Link href="/admin/experiences" className="block py-2 px-4 hover:bg-gray-700">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/admin/projects" className="block py-2 px-4 hover:bg-gray-700">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/admin/skills" className="block py-2 px-4 hover:bg-gray-700">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/admin/education" className="block py-2 px-4 hover:bg-gray-700">
                Education
              </Link>
            </li>
            <li>
              <Link href="/admin/certifications" className="block py-2 px-4 hover:bg-gray-700">
                Certifications
              </Link>
            </li>
            <li>
              <Link href="/admin/awards" className="block py-2 px-4 hover:bg-gray-700">
                Awards
              </Link>
            </li>
            <li>
              <Link href="/admin/contacts" className="block py-2 px-4 hover:bg-gray-700">
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">
        {children}
      </div>
    </div>
  )
}