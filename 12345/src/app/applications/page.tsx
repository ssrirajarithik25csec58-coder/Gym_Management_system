'use client';

import { useState } from 'react';
import Link from 'next/link';
import { applications, type Application } from '@/lib/mockData';

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'DRAFT': return 'draft';
    case 'SUBMITTED': case 'UNDER_VERIFICATION': return 'submitted';
    case 'VERIFIED': case 'SANCTIONED': return 'sanctioned';
    case 'DEFICIENT': return 'deficient';
    case 'DISBURSED': return 'disbursed';
    default: return 'draft';
  }
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function ApplicationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeDeficiencyModal, setActiveDeficiencyModal] = useState<Application | null>(null);
  const [reuploadSuccess, setReuploadSuccess] = useState(false);

  const filteredApps = applications.filter((app) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'ACTIVE') return app.status !== 'DISBURSED';
    if (selectedFilter === 'DEFICIENT') return app.status === 'DEFICIENT';
    if (selectedFilter === 'DISBURSED') return app.status === 'DISBURSED';
    return true;
  });

  const handleResolveDeficiency = () => {
    setReuploadSuccess(true);
    setTimeout(() => {
      setReuploadSuccess(false);
      setActiveDeficiencyModal(null);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Consolidated Applications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Unified tracking across NSP, SFMP (Canara Bank), and NOS systems in one view
          </p>
        </div>

        <Link href="/schemes" className="btn btn-primary">
          + Apply for New Scheme
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="tabs">
        <button
          className={`tab ${selectedFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('ALL')}
        >
          All Applications ({applications.length})
        </button>
        <button
          className={`tab ${selectedFilter === 'ACTIVE' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('ACTIVE')}
        >
          In Progress ({applications.filter(a => a.status !== 'DISBURSED').length})
        </button>
        <button
          className={`tab ${selectedFilter === 'DEFICIENT' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('DEFICIENT')}
        >
          Action Required ({applications.filter(a => a.status === 'DEFICIENT').length})
        </button>
        <button
          className={`tab ${selectedFilter === 'DISBURSED' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('DISBURSED')}
        >
          Disbursed / Completed ({applications.filter(a => a.status === 'DISBURSED').length})
        </button>
      </div>

      {/* Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {filteredApps.map((app) => (
          <div key={app.id} className="card" style={{ padding: 'var(--space-5)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                  <h3 style={{ fontSize: '1.15rem' }}>{app.schemeName}</h3>
                  <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                    <span className="badge-dot-indicator" />
                    {formatStatus(app.status)}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  App ID: <strong style={{ color: 'var(--text)' }}>{app.id}</strong> • Session: {app.academicYear} • Applied: {app.appliedDate}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  🏛️ {app.institutionName} • <em>{app.courseName}</em>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {app.sanctionedAmount && (
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sanctioned</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>
                      ₹{app.sanctionedAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  {app.status === 'DEFICIENT' && (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ background: 'var(--warning)', color: 'white' }}
                      onClick={() => setActiveDeficiencyModal(app)}
                    >
                      Resolve Deficiencies (2)
                    </button>
                  )}
                  <Link href={`/applications/${app.id}`} className="btn btn-secondary btn-sm">
                    View Verification Timeline →
                  </Link>
                </div>
              </div>
            </div>

            {/* Deficiency Warning Banner if applicable */}
            {app.deficiencies.length > 0 && (
              <div
                style={{
                  background: 'var(--warning-bg)',
                  border: '1.5px solid rgba(245, 127, 23, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--warning)', fontSize: '0.85rem' }}>
                  <span>⚠️</span>
                  <span>Deficiencies Flagged by Scrutiny Officer:</span>
                </div>
                <ul style={{ paddingLeft: 'var(--space-6)', marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {app.deficiencies.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Progress Bar & Stage Status */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  Verification Stage: <strong style={{ color: 'var(--text)' }}>{app.currentStage}</strong>
                </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{app.stageProgress}% Completed</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${app.stageProgress}%`,
                    background: app.status === 'DEFICIENT' ? 'var(--warning)' : undefined,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deficiency Resolution Modal */}
      {activeDeficiencyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)',
          }}
        >
          <div
            className="card animate-slide-up"
            style={{ maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="card-header">
              <div>
                <h3 className="card-title">Resolve Application Deficiencies</h3>
                <p className="card-subtitle">{activeDeficiencyModal.id} • {activeDeficiencyModal.schemeName}</p>
              </div>
              <button
                onClick={() => setActiveDeficiencyModal(null)}
                style={{ fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                ✕
              </button>
            </div>

            {reuploadSuccess ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>✅</div>
                <h4 style={{ color: 'var(--accent)' }}>Documents Successfully Re-Submitted!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Status updated. The verification layer will automatically re-verify the submitted records.
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: 'var(--warning-bg)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-4)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <strong>Notice:</strong> Please upload the rectified documents or pull newly issued certificates from DigiLocker.
                </div>

                <div className="form-group">
                  <label className="form-label">1. Renewed Income Certificate (State e-District)</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input type="file" style={{ fontSize: '0.8rem' }} />
                    <button className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                      Pull from DigiLocker
                    </button>
                  </div>
                  <span className="form-hint">Must be issued within current financial year (after April 2025)</span>
                </div>

                <div className="form-group">
                  <label className="form-label">2. Institution Accreditation / Top-Class Evidence</label>
                  <input type="file" style={{ fontSize: '0.8rem' }} />
                  <span className="form-hint">Official letterhead confirmation or AISHE certificate</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Explanation / Remarks to Scrutiny Officer</label>
                  <textarea rows={3} placeholder="Provide details regarding the rectification..." />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
                  <button className="btn btn-secondary" onClick={() => setActiveDeficiencyModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleResolveDeficiency}>
                    Submit Rectified Documents
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
