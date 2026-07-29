import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Master OS - Roofing Management Hub',
  description: 'Centralized hub for roofing project management, quoting, crew coordination, and business analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navigation />
        <main className="pt-16 min-h-screen lg:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}
