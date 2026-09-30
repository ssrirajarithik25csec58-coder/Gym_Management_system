'use client';

import { use } from 'react';
import Link from 'next/link';
import { applications, applicationTimelines, verifications, disbursements, currentStudent } from '@/lib/mockData';

export default function ApplicationDetailPage({ params }: { params: Promise<{ appId: string }> }) {
  const resolvedParams = use(params);
  const app = applications.find((a) => a.id === resolvedParams.appId) || applications[0];
  const timeline = applicationTimelines[app.id] || applicationTimelines['APP-2025-PM-0382'];
  const appVerifications = verifications.filter((v) => v.applicationId === app.id);
  const appDisbursements = disbursements.filter((d) => d.applicationId === app.id);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
        <Link href="/applications">Applications</Link>
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>{app.id}</span>
      </div>

      {/* Header Banner */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
          marginBottom: "var(--space-6)",
          padding: "var(--space-6)",
          borderLeft: "5px solid var(--primary)",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
              <h1 style={{ fontSize: '1.5rem' }}>{app.schemeName}</h1>
              <span className={`badge ${app.status === 'SANCTIONED' ? 'sanctioned' : app.status === 'DEFICIENT' ? 'deficient' : 'verified'}`}>
                {app.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Application ID: <strong style={{ color: 'var(--text)' }}>{app.id}</strong> • Academic Session: {app.academicYear} • Applied on: {app.appliedDate}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
              Student: <strong>{currentStudent.name}</strong> • APAAR ID: <strong>{currentStudent.aparId}</strong>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Sanctioned Grant
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)' }}>
              {app.sanctionedAmount ? `₹${app.sanctionedAmount.toLocaleString('en-IN')}` : 'Under Scrutiny'}
            </div>
            {app.disbursedAmount && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ₹{app.disbursedAmount.toLocaleString('en-IN')} Disbursed via PFMS
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns (Timeline vs Verifications & Disbursements) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Left Column: Complete Verification Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Multi-Tier Lifecycle Timeline</h2>
              <p className="card-subtitle">Transparent tracking from submission to bank credit</p>
            </div>
            <span className="badge verified">7-Stage Pipeline</span>
          </div>

          <div className="timeline" style={{ marginTop: 'var(--space-4)' }}>
            {timeline.map((event) => (
              <div key={event.id} className="timeline-item">
                <div className={`timeline-dot ${event.status}`} />
                <div className="timeline-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div className="timeline-title">{event.title}</div>
                    <span className="timeline-date">{event.date}</span>
                  </div>
                  <div className="timeline-desc">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Automated Digital Verifications + Payment Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Automated Verifications Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Digital Verification Evidence Layer</h2>
                <p className="card-subtitle">Real-time API matching across national databases</p>
              </div>
              <span className="badge auto">Automated Verification</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              {appVerifications.length > 0 ? (
                appVerifications.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-3) var(--space-4)',
                      borderLeft: `4px solid ${
                        v.status === 'MATCHED' ? 'var(--accent)' :
                        v.status === 'PARTIAL_MATCH' ? 'var(--warning)' : 'var(--error)'
                      }`,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.85rem' }}>{v.field}</strong>
                      <span className={`verify-badge ${v.status === 'MATCHED' ? 'auto' : v.status === 'PARTIAL_MATCH' ? 'manual' : 'failed'}`}>
                        {v.status === 'MATCHED' ? '✓ Matched (100%)' : v.status === 'PARTIAL_MATCH' ? '⚠️ Scrutiny Required' : '✕ Mismatch'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Source: <strong>{v.sourceSystem}</strong>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Verified: {v.verifiedValue}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--space-4)' }}>
                  Auto-verifications matched against DigiLocker, AISHE, and UIDAI repositories.
                </div>
              )}
            </div>
          </div>

          {/* Disbursements Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Disbursement Ledger (PFMS)</h2>
                <p className="card-subtitle">Aadhaar-seeded direct credit to bank account</p>
              </div>
              <Link href="/payments" className="btn btn-ghost btn-sm">Full Ledger →</Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {appDisbursements.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--bg)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.component}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {d.pfmsTransactionId ? `Ref: ${d.pfmsTransactionId}` : 'PFMS Processing'} • {d.disbursedAt || 'In Process'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: d.status === 'SUCCESS' ? 'var(--accent)' : 'var(--warning)' }}>
                      ₹{d.amount.toLocaleString('en-IN')}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: d.status === 'SUCCESS' ? 'var(--success)' : 'var(--warning)' }}>
                      {d.status === 'SUCCESS' ? '✓ Credited' : '⏳ DBT Initiated'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
