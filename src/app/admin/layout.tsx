'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    
    setIsLoading(false);
    
    // If not logged in and not on login page, redirect to login
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  // Don't show admin layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

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
        
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">{session?.user?.name || session?.user?.email}</p>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-sm text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">
        {children}
      </div>
    </div>
  );
}