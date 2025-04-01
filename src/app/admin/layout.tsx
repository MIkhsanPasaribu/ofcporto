'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // Skip auth check for login page
  if (pathname !== '/admin/login' && status !== 'loading' && !session) {
    redirect('/admin/login');
  }
  
  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  const navigation = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'About', href: '/admin/about' },
    { name: 'Experiences', href: '/admin/experiences' },
    { name: 'Education', href: '/admin/education' },
    { name: 'Skills', href: '/admin/skills' },
    { name: 'Projects', href: '/admin/projects' },
    { name: 'Certifications', href: '/admin/certifications' },
    { name: 'Awards', href: '/admin/awards' },
    { name: 'Contact Messages', href: '/admin/contacts' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-bold text-blue-600">
                  Admin
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {session?.user?.name}
                  </span>
                  <Link
                    href="/api/auth/signout"
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}