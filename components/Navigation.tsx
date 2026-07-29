'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const EXTERNAL_LINKS = [
  {
    name: 'Guayas Roofing',
    url: 'https://guayas-roofing-modern.vercel.app',
    icon: '🏠',
    description: 'Main roofing company website'
  },
  {
    name: 'Quoting Tool',
    url: 'https://guayas-quoting-tool.vercel.app',
    icon: '📋',
    description: 'Generate roofing quotes'
  },
  {
    name: 'Aqua Finish',
    url: 'https://aqua-finish.vercel.app',
    icon: '💧',
    description: 'Pool finishing services'
  },
  {
    name: 'Scotty Hub',
    url: 'https://scotty-hub.vercel.app',
    icon: '⚙️',
    description: 'Personal dashboard'
  },
];

const INTERNAL_LINKS = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Projects', href: '/projects', icon: '🏗️' },
  { name: 'Quotes', href: '/quotes', icon: '📝' },
  { name: 'Crew', href: '/crew', icon: '👥' },
  { name: 'Gallery', href: '/gallery', icon: '🖼️' },
  { name: 'Invoicing', href: '/invoicing', icon: '💰' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Navigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
              >
                <span className="text-xl">☰</span>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Master OS</h1>
                <p className="text-xs text-gray-500">Roofing Management Hub</p>
              </div>
            </div>

            {/* Desktop Links */}
            <nav className="hidden lg:flex gap-1">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}
            </nav>

            {/* External Links Dropdown */}
            <div className="hidden md:flex gap-2">
              <a
                href="https://guayas-roofing-modern.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                🏠 Roofing
              </a>
              <a
                href="https://guayas-quoting-tool.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                📋 Quotes
              </a>
              <a
                href="https://aqua-finish.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                💧 Aqua
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform lg:hidden z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Master OS</h2>
          <nav className="space-y-1 mb-8">
            {INTERNAL_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Other Sites</h3>
            <nav className="space-y-2">
              {EXTERNAL_LINKS.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  <div>{link.icon} {link.name}</div>
                  <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-64 lg:bg-gray-50 lg:border-r lg:border-gray-200 lg:overflow-y-auto lg:block">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Navigation</h2>
            <nav className="space-y-1">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Business Sites</h3>
            <nav className="space-y-3">
              {EXTERNAL_LINKS.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center gap-2 font-medium text-gray-900 group-hover:text-blue-700">
                    <span className="text-lg">{link.icon}</span>
                    {link.name}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">{link.description}</p>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Offset */}
      <style jsx>{`
        main {
          margin-left: 0;
        }
        @media (min-width: 1024px) {
          main {
            margin-left: 16rem; /* 64 * 4 = 256px for sidebar */
          }
        }
      `}</style>
    </>
  );
}
