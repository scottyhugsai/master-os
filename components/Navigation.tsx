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
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-700">
        <div className="max-w-full px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-800 lg:hidden"
                aria-label="Toggle menu"
              >
                <span className="text-xl">☰</span>
              </button>
              <Link href="/" className="flex-shrink-0">
                <div>
                  <h1 className="text-base font-bold text-white">Master OS</h1>
                  <p className="text-xs text-gray-400">Roofing Hub</p>
                </div>
              </Link>
            </div>

            {/* Desktop Header Links */}
            <nav className="hidden md:flex gap-1">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1 rounded text-xs font-medium transition hidden lg:inline-block ${
                    pathname === link.href
                      ? 'bg-blue-900 text-blue-300'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}
            </nav>

            {/* Quick External Links (Desktop Only) */}
            <div className="hidden md:flex gap-2">
              <a
                href="https://guayas-roofing-modern.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition"
              >
                🏠
              </a>
              <a
                href="https://guayas-quoting-tool.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition"
              >
                📋
              </a>
              <a
                href="https://aqua-finish.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded text-xs font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition"
              >
                💧
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto transition-transform lg:hidden z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Master OS</h2>
          <nav className="space-y-1 mb-8">
            {INTERNAL_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
                  pathname === link.href
                    ? 'bg-blue-900 text-blue-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Business Sites</h3>
            <nav className="space-y-2">
              {EXTERNAL_LINKS.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSidebarOpen(false)}
                  className="block p-3 rounded bg-gray-800 hover:bg-gray-700 transition"
                >
                  <div className="text-sm font-medium text-white">{link.icon} {link.name}</div>
                  <p className="text-xs text-gray-400 mt-1">{link.description}</p>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-64 lg:bg-gray-900 lg:border-r lg:border-gray-700 lg:overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Navigation</h2>
            <nav className="space-y-1">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
                    pathname === link.href
                      ? 'bg-blue-900 text-blue-300'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Business Sites</h3>
            <nav className="space-y-3">
              {EXTERNAL_LINKS.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded bg-gray-800 hover:bg-gray-700 transition border border-gray-700 hover:border-blue-500 group"
                >
                  <div className="flex items-center gap-2 font-medium text-white group-hover:text-blue-300">
                    <span className="text-lg">{link.icon}</span>
                    {link.name}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-300">{link.description}</p>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Spacing */}
      <style jsx global>{`
        main {
          margin-left: 0;
        }
        @media (min-width: 1024px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </>
  );
}
