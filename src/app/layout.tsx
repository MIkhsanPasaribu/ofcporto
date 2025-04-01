import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from '@/components/SessionProvider';
//import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'M. Ikhsan Pasaribu | Portfolio',
  description: 'Professional portfolio of M. Ikhsan Pasaribu showcasing work and experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`} suppressHydrationWarning>
        <SessionProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
