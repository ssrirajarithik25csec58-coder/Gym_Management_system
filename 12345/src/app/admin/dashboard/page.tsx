'use client';

import Link from 'next/link';
import { adminStats, coverageData, schemes } from '@/lib/mockData';

export default function AdminDashboardPage() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>🏛️</span>
            <span>Ministry of Tribal Affairs • Central Monitoring Directorate</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', marginTop: '2px' }}>National Scholarship Oversight Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Consolidated analytics across NSP, SFMP (Canara Bank), and standalone NOS platforms
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/admin/verification" className="btn btn-secondary btn-sm">
            🔍 Verification Queue (12)
          </Link>
          <Link href="/admin/coverage" className="btn btn-primary btn-sm">
            🗺️ Coverage Gap Analyzer
          </Link>
        </div>
      </div>

      {/* National Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="stat-card primary animate-slide-up stagger-1">
          <div className="stat-card-header">
            <div className="stat-card-icon">👥</div>
            <span className="stat-card-label">Total Applications</span>
          </div>
          <div className="stat-card-value">{(adminStats.totalApplications / 100000).toFixed(2)} Lakh</div>
          <div className="stat-card-change positive">↑ 18.2% vs previous year</div>
        </div>

        <div className="stat-card success animate-slide-up stagger-2">
          <div className="stat-card-header">
            <div className="stat-card-icon">💰</div>
            <span className="stat-card-label">Total Funds Disbursed</span>
          </div>
          <div className="stat-card-value">₹{(adminStats.totalDisbursement / 10000000).toFixed(0)} Cr</div>
          <div className="stat-card-change positive">100% via DBT / PFMS</div>
        </div>

        <div className="stat-card info animate-slide-up stagger-3">
          <div className="stat-card-header">
            <div className="stat-card-icon">⚡</div>
            <span className="stat-card-label">Auto-Verification Rate</span>
          </div>
          <div className="stat-card-value">{adminStats.autoVerifiedPercent}%</div>
          <div className="stat-card-change positive">DigiLocker, AISHE & e-District</div>
        </div>

        <div className="stat-card warning animate-slide-up stagger-4">
          <div className="stat-card-header">
            <div className="stat-card-icon">⏱️</div>
            <span className="stat-card-label">Average Processing Time</span>
          </div>
          <div className="stat-card-value">{adminStats.averageProcessingDays} Days</div>
          <div className="stat-card-change positive">↓ Reduced from 120 days</div>
        </div>
      </div>

      {/* Scheme Performance Breakdown */}
      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Scheme-Wise Sanction & Disbursal Status (AY 2025-26)</h3>
            <p className="card-subtitle">Tracking target saturation across all five central schemes</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Integrated Portal</th>
                <th>Enrolment Pool</th>
                <th>Sanctioned</th>
                <th>Disbursed via DBT</th>
                <th>Deficiency Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((s, idx) => {
                const totalPool = idx === 0 ? '12.4 Lakh' : idx === 1 ? '5.1 Lakh' : idx === 2 ? '42,000' : idx === 3 ? '18,500' : '4,800';
                const sanctioned = idx === 0 ? '8.9 Lakh' : idx === 1 ? '3.8 Lakh' : idx === 2 ? '31,500' : idx === 3 ? '14,200' : '3,100';
                const disbursed = idx === 0 ? '₹1,240 Cr' : idx === 1 ? '₹2,100 Cr' : idx === 2 ? '₹620 Cr' : idx === 3 ? '₹580 Cr' : '₹316 Cr';
                const defRate = idx === 0 ? '5.2%' : idx === 1 ? '9.4%' : idx === 2 ? '14.1%' : idx === 3 ? '4.8%' : '18.2%';

                return (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.educationLevel}</div>
                    </td>
                    <td>
                      <span className={`scheme-card-tag ${s.tagClass}`} style={{ marginBottom: 0 }}>
                        {s.portalSource}
                      </span>
                    </td>
                    <td>{totalPool}</td>
                    <td style={{ fontWeight: 600 }}>{sanctioned}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{disbursed}</td>
                    <td style={{ color: idx === 2 || idx === 4 ? 'var(--warning)' : 'var(--text-secondary)' }}>
                      {defRate}
                    </td>
                    <td>
                      <span className="badge verified">Active Pipeline</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column: State Performance & Bottleneck Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* State Performance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Tribal States — Coverage Overview</h3>
              <p className="card-subtitle">Beneficiary saturation against enrolled ST students</p>
            </div>
            <Link href="/admin/coverage" className="btn btn-ghost btn-sm">Full Heatmap →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {coverageData.slice(0, 5).map((st) => (
              <div key={st.state} style={{ background: 'var(--bg)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.88rem' }}>{st.state}</strong>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: st.coveragePercent >= 45 ? 'var(--accent)' : 'var(--warning)' }}>
                    {st.coveragePercent}% Covered
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {st.scholarshipBeneficiaries.toLocaleString('en-IN')} beneficiaries of {st.totalSTStudents.toLocaleString('en-IN')} enrolled STs
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${st.coveragePercent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Bottlenecks */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Pipeline Bottleneck Analytics</h3>
              <p className="card-subtitle">Where applications spend the longest turnaround time</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ borderLeft: '3px solid var(--warning)', paddingLeft: 'var(--space-3)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>District Level Welfare Scrutiny</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Avg. delay: <strong>14.2 days</strong>. 41% of delayed files are due to unrenewed State e-District income certificates.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 'var(--space-3)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Institutional Verification (AISHE)</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Avg. delay: <strong>8.6 days</strong>. Automated API check resolved 78% instantly; manual review required for newly notified institutes.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 'var(--space-3)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>PFMS Direct Benefit Transfer</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Avg. delay: <strong>3.1 days</strong>. Fast automated batch clearance for Aadhaar-seeded accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
