'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const INTERNAL_LINKS = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Projects', href: '/projects', icon: '🏗️' },
  { name: 'Quotes', href: '/quotes', icon: '📋' },
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

export function PremiumNavigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (href: string) => pathname === href;
  const isHome = pathname === '/';

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-color-bg-elevated/80 border-b border-color-border-default backdrop-blur-xl safe-area-inset-top">
        <div className="h-16 sm:h-20 px-3 sm:px-4 md:px-6 flex items-center justify-between">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile hamburger menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-color-bg-hover rounded-lg text-color-text-secondary hover:text-color-text-primary transition touch-target"
              aria-label="Toggle menu"
              title="Menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo - Responsive sizing */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xs sm:text-lg">
                M
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-color-text-primary leading-tight text-xs sm:text-sm">Master OS</div>
                <div className="text-xs text-color-text-muted">Roofing Pro</div>
              </div>
            </Link>
          </div>

          {/* Right: External Links (Desktop Only) */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {EXTERNAL_LINKS.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-color-bg-hover rounded-lg text-color-text-secondary hover:text-color-teal-400 transition text-lg touch-target"
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

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-16 sm:top-20 bottom-0 w-64 bg-color-bg-elevated border-r border-color-border-default overflow-y-auto transition-transform duration-300 z-30 lg:translate-x-0 safe-area-inset-left safe-area-inset-bottom ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Navigation Section */}
          <div>
            <h2 className="text-xs font-bold text-color-text-muted uppercase tracking-widest mb-3 sm:mb-4">
              Navigation
            </h2>
            <div className="space-y-1 sm:space-y-2">
              {INTERNAL_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition touch-target ${
                    isActive(link.href)
                      ? 'bg-gradient-primary text-white'
                      : 'text-color-text-secondary hover:bg-color-bg-hover hover:text-color-text-primary'
                  }`}
                >
                  <span className="text-base sm:text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* External Section */}
          {!isHome && (
            <div>
              <h2 className="text-xs font-bold text-color-text-muted uppercase tracking-widest mb-3 sm:mb-4">
                Business Sites
              </h2>
              <div className="space-y-1 sm:space-y-2">
                {EXTERNAL_LINKS.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-color-text-secondary hover:bg-color-bg-hover hover:text-color-teal-400 transition touch-target"
                  >
                    <span className="text-base sm:text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
