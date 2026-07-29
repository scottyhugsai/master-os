import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Master OS - Roofing Management',
  description: 'Professional roofing project management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
