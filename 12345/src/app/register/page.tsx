'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    identifier: '',
    otp: '',
  });

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
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
        borderTop: '6px solid var(--accent)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <img
            src="/logo.jpg"
            alt="Vidvan Logo"
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              margin: '0 auto var(--space-4)',
            }}
          />
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text)' }}>Create your account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Register with Aadhaar or APAAR for instant verification
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Aadhaar Number or APAAR ID</label>
              <input
                type="text"
                required
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                placeholder="Enter 12-digit Aadhaar or APAAR ID"
                style={{ width: '100%' }}
              />
              <span className="form-hint" style={{ marginTop: '6px', display: 'block' }}>
                Your data is secure and verified directly via UIDAI/DigiLocker.
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--space-2)', padding: '12px' }}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} className="animate-fade-in">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Enter OTP sent to linked mobile</label>
              <input
                type="text"
                required
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="6-digit OTP"
                style={{ width: '100%', letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }}
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--space-2)', padding: '12px' }}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify & Create Account'}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStep(1)}
              style={{ width: '100%' }}
            >
              Back
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
