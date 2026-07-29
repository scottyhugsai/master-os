'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const INTERNAL_LINKS = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Projects', href: '/projects', icon: '🏗️' },
  { name: 'Quotes', href: '/quotes', icon: '📝' },
  { name: 'Crew', href: '/crew', icon: '👥' },
  { name: 'Gallery', href: '/gallery', icon: '🖼️' },
  { name: 'Invoicing', href: '/invoicing', icon: '💰' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

const EXTERNAL_LINKS = [
  { name: 'Roofing', url: 'https://guayas-roofing-modern.vercel.app', icon: '🏠' },
  { name: 'Quotes', url: 'https://guayas-quoting-tool.vercel.app', icon: '📋' },
  { name: 'Aqua', url: 'https://aqua-finish.vercel.app', icon: '💧' },
];

export function Navigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#13172e] border-b border-[#334155] backdrop-blur-md">
        <div className="h-20 px-4 flex items-center justify-between">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[#1a1f3a] rounded-lg text-[#cbd5e1]"
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-2xl">🏗️</div>
              <div>
                <div className="font-bold text-white text-sm leading-tight">MASTER OS</div>
                <div className="text-xs text-[#94a3b8]">Roofing Pro</div>
              </div>
            </Link>
          </div>

          {/* Right: Quick Links (Desktop Only) */}
          <div className="hidden md:flex items-center gap-1">
            {EXTERNAL_LINKS.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[#1a1f3a] rounded-lg text-[#cbd5e1] hover:text-[#3b82f6] transition text-lg"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR - MOBILE & DESKTOP */}
      <aside
        className={`fixed left-0 top-20 bottom-0 w-64 bg-[#13172e] border-r border-[#334155] overflow-y-auto transition-transform duration-300 z-30 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Navigation Section */}
          <div>
            <h2 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-4">
              Navigation
            </h2>
            <nav className="space-y-1">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition ${
                    isActive(link.href)
                      ? 'bg-[#1e40af] text-white'
                      : 'text-[#cbd5e1] hover:bg-[#1a1f3a] hover:text-white'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Business Sites Section */}
          <div className="border-t border-[#334155] pt-6">
            <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-4">
              Business Sites
            </h3>
            <div className="space-y-2">
              {EXTERNAL_LINKS.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSidebarOpen(false)}
                  className="block p-3 rounded-lg bg-[#1a1f3a] border border-[#334155] hover:border-[#3b82f6] hover:bg-[#1e40af]/20 transition group"
                >
                  <div className="flex items-center gap-2 text-white font-medium group-hover:text-[#3b82f6]">
                    <span className="text-lg">{link.icon}</span>
                    {link.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
