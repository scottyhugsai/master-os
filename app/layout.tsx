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
      <body>
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
