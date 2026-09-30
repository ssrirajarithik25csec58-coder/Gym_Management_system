'use client';

import Link from 'next/link';
import { schemes } from '@/lib/mockData';

export default function GuidelinesPage() {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Operational Guidelines & FAQs</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Official Ministry guidelines, eligibility norms, document checklists, and grievance redressal
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Core Rules Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Fundamental Scholarship Rules</h3>
              <p className="card-subtitle">Key statutory requirements under Vidvan schemes</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: '0.85rem' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--primary-50)', borderRadius: 'var(--radius-sm)' }}>
              <strong>1. One Scholarship at a Time:</strong>
              <p style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>
                A student can avail financial assistance under only ONE centrally funded scholarship/fellowship scheme concurrently.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
              <strong>2. Aadhaar-Seeded Bank Account Mandatory:</strong>
              <p style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>
                Disbursements are made solely through Aadhaar Payment Bridge (APB) directly to bank accounts validated via NPCI.
              </p>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
              <strong>3. Paperless Digital Verification:</strong>
              <p style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>
                Certificates pulled via DigiLocker and State e-District have legal parity with original physical documents under the IT Act 2000.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion-style */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Frequently Asked Questions</h3>
              <p className="card-subtitle">Common student inquiries</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: '0.85rem' }}>
            <details style={{ background: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 600 }}>What is APAAR ID and why do I need it?</summary>
              <p style={{ marginTop: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Automated Permanent Academic Account Registry (APAAR) is a lifelong student identity issued by the Ministry of Education that connects your academic awards, DigiLocker credentials, and scholarship records seamlessly.
              </p>
            </details>

            <details style={{ background: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 600 }}>What happens if my income certificate is flagged as expired?</summary>
              <p style={{ marginTop: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                You will receive a deficiency alert in your dashboard. You can issue a renewed income certificate from your State e-District portal and re-submit it with one click through the Document Wallet.
              </p>
            </details>

            <details style={{ background: 'var(--bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 600 }}>Can I switch from Post-Matric to Top Class or NFST?</summary>
              <p style={{ marginTop: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Yes, but once the higher scheme is sanctioned, the previous scheme benefit will be adjusted or surrendered automatically via the Unified Conflict Engine.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Nodal Officer Contact & Grievance Callout */}
      <div
        className="card"
        style={{
          marginTop: 'var(--space-6)',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>National Tribal Scholarship Helpdesk & Grievance Portal</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Toll-Free Helpline: <strong>1800-11-7788</strong> (9:30 AM to 6:00 PM IST) • Email: <strong>scholarship-tribal@nic.in</strong>
          </p>
        </div>
        <Link href="/chatbot" className="btn btn-primary btn-sm">
          Chat with JAGO Assistant →
        </Link>
      </div>
    </div>
  );
}
