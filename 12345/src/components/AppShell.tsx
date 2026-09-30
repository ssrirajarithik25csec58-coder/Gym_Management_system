'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navSections = [
  {
    title: 'Main',
    links: [
      { href: '/dashboard', icon: '📊', label: 'Dashboard' },
      { href: '/schemes', icon: '🎓', label: 'Schemes', badge: '5' },
      { href: '/applications', icon: '📋', label: 'Applications', badge: '3' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/documents', icon: '📄', label: 'Document Wallet', badge: '1' },
      { href: '/payments', icon: '💰', label: 'Payments' },
      { href: '/notifications', icon: '🔔', label: 'Notifications', badge: '2' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/chatbot', icon: '🤖', label: 'JAGO Assistant' },
      { href: '/guidelines', icon: '📖', label: 'Guidelines' },
      { href: '/profile', icon: '👤', label: 'My Profile' },
    ],
  },
  {
    title: 'Administration',
    links: [
      { href: '/admin/dashboard', icon: '📈', label: 'Admin Panel' },
      { href: '/admin/verification', icon: '🔍', label: 'Verification Queue' },
      { href: '/admin/coverage', icon: '🗺️', label: 'Coverage Analysis' },
    ],
  },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const getPageTitle = () => {
    for (const section of navSections) {
      for (const link of section.links) {
        if (pathname === link.href || pathname?.startsWith(link.href + '/')) {
          return link.label;
        }
      }
    }
    return 'Dashboard';
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <div className="auth-layout" style={{ minHeight: '100vh', width: '100%' }}>{children}</div>;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 99, display: 'block',
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-logo-wrapper" style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <img
              src="/logo.jpg"
              alt="Vidvan Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">Vidvan</span>
            <span className="sidebar-brand-subtitle">Ministry of Tribal Affairs</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <div className="sidebar-section-title">{section.title}</div>
              {section.links.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sidebar-link-icon">{link.icon}</span>
                    <span>{link.label}</span>
                    {link.badge && !isActive && (
                      <span className="sidebar-link-badge">{link.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>🇮🇳</span>
            <span>Govt. of India Initiative</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="topbar-hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <img
              src="/logo.jpg"
              alt="Vidvan Logo"
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                borderRadius: '4px',
              }}
            />
            <h1 className="topbar-title">{getPageTitle()}</h1>
          </div>

          <div className="topbar-right">
            <button
              className="topbar-action"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="topbar-action" aria-label="Notifications" title="Notifications">
              🔔
              <span className="badge-dot"></span>
            </button>
            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <div className="topbar-avatar" title="Anita Murmu">AM</div>
            </Link>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <button className="topbar-action" aria-label="Sign Out" title="Sign Out" style={{ fontSize: '1.2rem' }}>
                🚪
              </button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
