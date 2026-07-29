'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/projects', label: 'Projects' },
    { href: '/quotes', label: 'Quotes' },
    { href: '/crew', label: 'Crew' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/invoicing', label: 'Invoicing' },
    { href: '/settings', label: 'Settings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 217, 255, 0.1)',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#00d9ff',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#a78bfa'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#00d9ff'}
          >
            Master OS
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              color: '#f1f5f9',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: '1.5rem',
            }}
            className="mobile-menu-btn"
          >
            ☰
          </button>

          {/* Desktop navigation */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive(item.href) ? '#0f172a' : '#cbd5e1',
                  background: isActive(item.href) ? '#00d9ff' : 'transparent',
                  border: isActive(item.href) ? 'none' : '1px solid rgba(0, 217, 255, 0.2)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.background = 'rgba(0, 217, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.2)';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            display: 'none',
            borderTop: '1px solid rgba(0, 217, 255, 0.1)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            gap: '0.5rem',
            flexDirection: 'column',
          }} className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  color: isActive(item.href) ? '#0f172a' : '#cbd5e1',
                  background: isActive(item.href) ? '#00d9ff' : 'transparent',
                  border: isActive(item.href) ? 'none' : '1px solid rgba(0, 217, 255, 0.2)',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }

          nav div > div:last-of-type {
            display: none !important;
          }

          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
