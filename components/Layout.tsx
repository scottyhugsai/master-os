'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { designTokens } from '@/config/designTokens';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
}

export const RootLayout: React.FC<LayoutProps> = ({
  children,
  title = 'Master OS',
  showSidebar = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/projects', label: 'Projects', icon: '🏗️' },
    { href: '/quotes', label: 'Quotes', icon: '📋' },
    { href: '/crew', label: 'Crew', icon: '👥' },
    { href: '/gallery', label: 'Gallery', icon: '🖼️' },
    { href: '/invoicing', label: 'Invoicing', icon: '💰' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: designTokens.colors.neutral[50],
        color: designTokens.colors.neutral[900],
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: designTokens.colors.neutral[900],
          color: 'white',
          borderBottom: `1px solid ${designTokens.colors.neutral[800]}`,
          boxShadow: designTokens.shadow.sm,
        }}
      >
        <div
          style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: designTokens.fontSize['2xl'],
                color: 'white',
              }}
              className="md:hidden"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <Link href="/dashboard">
              <div
                style={{
                  fontSize: designTokens.fontSize['2xl'],
                  fontWeight: 700,
                  color: designTokens.colors.primary,
                  textDecoration: 'none',
                }}
              >
                Master OS
              </div>
            </Link>
          </div>

          {/* User Menu Placeholder */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: designTokens.spacing.md,
              fontSize: designTokens.fontSize.sm,
            }}
          >
            <span>👤 User</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        {showSidebar && (
          <aside
            style={{
              width: sidebarOpen ? '240px' : '0',
              backgroundColor: designTokens.colors.neutral[100],
              borderRight: `1px solid ${designTokens.colors.neutral[200]}`,
              transition: 'width 0.3s ease-in-out',
              overflow: 'hidden',
              display: 'none',
            }}
            className="md:block"
          >
            <nav
              style={{
                padding: designTokens.spacing.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: designTokens.spacing.sm,
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: `${designTokens.spacing.md} ${designTokens.spacing.md}`,
                    borderRadius: designTokens.borderRadius.md,
                    textDecoration: 'none',
                    color: designTokens.colors.neutral[700],
                    fontSize: designTokens.fontSize.sm,
                    display: 'flex',
                    alignItems: 'center',
                    gap: designTokens.spacing.md,
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      designTokens.colors.primary;
                    (e.target as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.color = designTokens.colors.neutral[700];
                  }}
                >
                  <span style={{ fontSize: designTokens.fontSize.xl }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: designTokens.spacing.lg,
          }}
        >
          {title && (
            <div
              style={{
                marginBottom: designTokens.spacing.xl,
                paddingBottom: designTokens.spacing.lg,
                borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
              }}
            >
              <h1
                style={{
                  fontSize: designTokens.fontSize['3xl'],
                  fontWeight: 700,
                  color: designTokens.colors.neutral[900],
                  margin: 0,
                }}
              >
                {title}
              </h1>
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: designTokens.colors.neutral[900],
          color: designTokens.colors.neutral[400],
          padding: designTokens.spacing.lg,
          textAlign: 'center',
          fontSize: designTokens.fontSize.sm,
          borderTop: `1px solid ${designTokens.colors.neutral[800]}`,
        }}
      >
        <p style={{ margin: 0 }}>© 2024 Master OS. All rights reserved.</p>
      </footer>
    </div>
  );
};
