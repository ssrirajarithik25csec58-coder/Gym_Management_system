'use client';

import Link from 'next/link';
import { applications, disbursements, notifications, currentStudent, documents } from '@/lib/mockData';

const statusStages = ['Submitted', 'Inst. Verified', 'Dist. Verified', 'State Verified', 'Sanctioned', 'Disbursed'];

function getStageIndex(status: string): number {
  switch (status) {
    case 'SUBMITTED': return 0;
    case 'UNDER_VERIFICATION': return 1;
    case 'DEFICIENT': return 1;
    case 'VERIFIED': return 3;
    case 'SANCTIONED': return 4;
    case 'DISBURSEMENT_INITIATED': return 4;
    case 'DISBURSED': return 5;
    default: return -1;
  }
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'DRAFT': return 'draft';
    case 'SUBMITTED': return 'submitted';
    case 'UNDER_VERIFICATION': return 'submitted';
    case 'VERIFIED': case 'SANCTIONED': return 'sanctioned';
    case 'DEFICIENT': return 'deficient';
    case 'DISBURSED': return 'disbursed';
    case 'DISBURSEMENT_INITIATED': return 'pending';
    case 'REJECTED': return 'rejected';
    default: return 'draft';
  }
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function DashboardPage() {
  const totalSanctioned = applications.reduce((sum, app) => sum + (app.sanctionedAmount || 0), 0);
  const totalDisbursed = disbursements
    .filter(d => d.status === 'SUCCESS')
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingAmount = totalSanctioned - totalDisbursed;
  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  const verifiedDocs = documents.filter(d => d.verificationStatus === 'VERIFIED' || d.verificationStatus === 'AUTO_VERIFIED').length;

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #E65100 0%, #BF360C 50%, #1B5E20 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-7) var(--space-7)',
        color: 'white',
        marginBottom: 'var(--space-6)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '16px', top: '16px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', color: 'white', backdropFilter: 'blur(4px)' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }}></span> All synced
        </div>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '8rem', opacity: 0.08 }}>🏛️</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '4px' }}>Welcome back,</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
              {currentStudent.name}
            </h1>
            {applications.some(a => ['VERIFIED', 'SANCTIONED', 'DISBURSED', 'DISBURSEMENT_INITIATED'].includes(a.status)) && (
              <span style={{ background: 'rgba(76, 175, 80, 0.2)', color: '#A5D6A7', border: '1px solid rgba(76, 175, 80, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600 }}>
                Currently Availing: {applications.find(a => ['VERIFIED', 'SANCTIONED', 'DISBURSED', 'DISBURSEMENT_INITIATED'].includes(a.status))?.schemeName}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>
            {currentStudent.currentEducationLevel} • {currentStudent.institutionName}
          </p>
          <p style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: '8px' }}>
            Unifying NSP, SFMP (Canara Bank) and NOS Portal.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
            <Link href="/schemes" className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              🎓 Explore Schemes
            </Link>
            <Link href="/applications" className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              📋 My Applications
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="stat-card primary animate-slide-up stagger-1">
          <div className="stat-card-header">
            <div className="stat-card-icon">📋</div>
            <span className="stat-card-label">Active Applications</span>
          </div>
          <div className="stat-card-value">{applications.filter(a => a.status !== 'DISBURSED').length}</div>
          <div className="stat-card-change positive">
            ↑ {applications.length} total across schemes
          </div>
        </div>

        <div className="stat-card success animate-slide-up stagger-2">
          <div className="stat-card-header">
            <div className="stat-card-icon">💰</div>
            <span className="stat-card-label">Total Received</span>
          </div>
          <div className="stat-card-value">{formatCurrency(totalDisbursed)}</div>
          <div className="stat-card-change positive">
            ✓ via DBT / PFMS
          </div>
        </div>

        <div className="stat-card info animate-slide-up stagger-3">
          <div className="stat-card-header">
            <div className="stat-card-icon">⏳</div>
            <span className="stat-card-label">Pending Amount</span>
          </div>
          <div className="stat-card-value">{formatCurrency(pendingAmount)}</div>
          <div className="stat-card-change">
            Processing via PFMS
          </div>
        </div>

        <div className="stat-card warning animate-slide-up stagger-4">
          <div className="stat-card-header">
            <div className="stat-card-icon">📄</div>
            <span className="stat-card-label">Verified Documents</span>
          </div>
          <div className="stat-card-value">{verifiedDocs}/{documents.length}</div>
          <div className="stat-card-change">
            {documents.filter(d => d.verificationStatus === 'PENDING').length} pending verification
          </div>
        </div>
      </div>

      {/* Action Centre */}
      {(applications.some(a => a.deficiencies.length > 0) || documents.some(d => d.verificationStatus === 'REJECTED' || d.verificationStatus === 'MANUAL_REVIEW')) && (
        <div className="card" style={{ marginBottom: 'var(--space-6)', background: 'var(--warning-bg)', border: '1px solid rgba(245, 127, 23, 0.2)' }}>
          <div className="card-header" style={{ paddingBottom: '0' }}>
            <div>
              <h3 className="card-title" style={{ color: 'var(--warning)' }}>⚠️ Action Centre</h3>
              <p className="card-subtitle">Items requiring your immediate attention</p>
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {applications.filter(a => a.deficiencies.length > 0).map(app => (
              <div key={app.id} style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Deficient Application: {app.schemeName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Deadline: Within 15 days</div>
                </div>
                <Link href={`/applications/${app.id}`} className="btn btn-primary btn-sm">Resolve</Link>
              </div>
            ))}
            {documents.filter(d => d.verificationStatus === 'REJECTED').map(doc => (
              <div key={doc.id} style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Document Rejected: {doc.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Please re-upload a clear copy</div>
                </div>
                <Link href={`/documents`} className="btn btn-primary btn-sm">Re-upload</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Status Cards */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title" style={{ fontSize: '1.15rem' }}>My Scholarship Applications</h2>
            <p className="card-subtitle">Track status across all schemes</p>
          </div>
          <Link href="/applications" className="btn btn-ghost btn-sm">View All →</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          {applications.map((app) => {
            const stageIdx = getStageIndex(app.status);
            return (
              <div key={app.id} className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{app.schemeName}</h3>
                      <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                        <span className="badge-dot-indicator" />
                        {formatStatus(app.status)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {app.id} • {app.academicYear} • {app.institutionName}
                    </p>
                  </div>
                  {app.sanctionedAmount && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sanctioned</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{formatCurrency(app.sanctionedAmount)}</div>
                    </div>
                  )}
                </div>

                {/* Progress Pipeline */}
                <div className="pipeline" style={{ marginBottom: 'var(--space-3)' }}>
                  {statusStages.map((stage, idx) => (
                    <div key={stage} className="pipeline-stage">
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={`pipeline-dot ${
                          idx < stageIdx ? 'completed' :
                          idx === stageIdx ? (app.status === 'DEFICIENT' ? 'rejected' : 'active') :
                          ''
                        }`}>
                          {idx < stageIdx ? '✓' :
                           idx === stageIdx && app.status === 'DEFICIENT' ? '!' :
                           idx === stageIdx ? '●' :
                           idx + 1}
                        </div>
                        <span className={`pipeline-label ${
                          idx < stageIdx ? 'completed' :
                          idx === stageIdx ? 'active' : ''
                        }`}>{stage}</span>
                      </div>
                      {idx < statusStages.length - 1 && (
                        <div className={`pipeline-connector ${idx < stageIdx ? 'completed' : ''}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Deficiencies */}
                {app.deficiencies.length > 0 && (
                  <div style={{
                    background: 'var(--warning-bg)',
                    border: '1px solid rgba(245, 127, 23, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3) var(--space-4)',
                    marginTop: 'var(--space-3)',
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--warning)', marginBottom: '4px' }}>
                      ⚠️ Action Required
                    </div>
                    {app.deficiencies.map((def, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '16px' }}>
                        • {def}
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress Bar */}
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Overall Progress</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{app.stageProgress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${app.stageProgress}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column: Recent Payments + Notifications */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
        {/* Recent Payments */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Payments</h3>
              <p className="card-subtitle">DBT disbursements via PFMS</p>
            </div>
            <Link href="/payments" className="btn btn-ghost btn-sm">View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {disbursements.slice(0, 4).map((dis) => (
              <div key={dis.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg)',
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{dis.component}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {dis.disbursedAt || 'Processing'} • {dis.schemeName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: dis.status === 'SUCCESS' ? 'var(--accent)' : 'var(--warning)' }}>
                    {formatCurrency(dis.amount)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: dis.status === 'SUCCESS' ? 'var(--success)' : 'var(--warning)' }}>
                    {dis.status === 'SUCCESS' ? '✓ Credited' : '⏳ Processing'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Notifications</h3>
              <p className="card-subtitle">{unreadNotifs} unread alerts</p>
            </div>
            <Link href="/notifications" className="btn btn-ghost btn-sm">View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {notifications.slice(0, 4).map((notif) => (
              <div key={notif.id} className={`notification-card ${!notif.isRead ? 'unread' : ''}`} style={{ padding: 'var(--space-3)' }}>
                <div className="notification-icon" style={{
                  background: notif.type === 'success' ? 'var(--success-bg)' :
                    notif.type === 'warning' ? 'var(--warning-bg)' :
                    notif.type === 'error' ? 'var(--error-bg)' : 'var(--info-bg)',
                  color: notif.type === 'success' ? 'var(--success)' :
                    notif.type === 'warning' ? 'var(--warning)' :
                    notif.type === 'error' ? 'var(--error)' : 'var(--info)',
                  width: '32px', height: '32px', fontSize: '0.85rem',
                }}>
                  {notif.type === 'success' ? '✓' : notif.type === 'warning' ? '⚠' : notif.type === 'error' ? '✕' : 'ℹ'}
                </div>
                <div className="notification-body">
                  <div className="notification-title" style={{ fontSize: '0.82rem' }}>{notif.title}</div>
                  <div className="notification-time">{new Date(notif.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
