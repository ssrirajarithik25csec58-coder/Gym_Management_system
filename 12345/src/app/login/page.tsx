'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (accountType === 'student') {
        router.push('/dashboard');
      } else {
        router.push('/admin/dashboard');
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)',
      padding: 'var(--space-4)',
    }}>
      <div className="card animate-slide-up" style={{
        maxWidth: '480px',
        width: '100%',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-lg)',
        borderTop: '6px solid var(--primary)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <img
            src="/logo.jpg"
            alt="Vidvan Logo"
            style={{
              height: '80px',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              margin: '0 auto var(--space-4)',
            }}
          />
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text)' }}>Welcome to Vidvan</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Unified Scholarship Platform
          </p>
        </div>

        {/* Account Type Selector */}
        <div style={{
          display: 'flex',
          background: 'var(--bg)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          marginBottom: 'var(--space-6)',
        }}>
          <button
            type="button"
            onClick={() => setAccountType('student')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: accountType === 'student' ? 'var(--surface)' : 'transparent',
              color: accountType === 'student' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: accountType === 'student' ? 600 : 500,
              boxShadow: accountType === 'student' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setAccountType('admin')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: accountType === 'admin' ? 'var(--surface)' : 'transparent',
              color: accountType === 'admin' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: accountType === 'admin' ? 600 : 500,
              boxShadow: accountType === 'admin' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Nodal / Admin
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              {accountType === 'student' ? 'APAAR ID / Aadhaar Number' : 'Official Email / ID'}
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={accountType === 'student' ? 'e.g., 12-digit Aadhaar' : 'admin@tribal.gov.in'}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer' }}>Forgot?</span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-2)', padding: '12px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
