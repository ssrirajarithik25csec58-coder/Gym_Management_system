'use client';

import { useState } from 'react';
import { coverageData } from '@/lib/mockData';

export default function CoverageGapPage() {
  const [selectedState, setSelectedState] = useState('ALL');
  const [matchingRunning, setMatchingRunning] = useState(false);
  const [matchResultNotice, setMatchResultNotice] = useState<string | null>(null);

  const totalSTEnrolled = coverageData.reduce((sum, d) => sum + d.totalSTStudents, 0);
  const totalBeneficiaries = coverageData.reduce((sum, d) => sum + d.scholarshipBeneficiaries, 0);
  const overallCoverage = Math.round((totalBeneficiaries / totalSTEnrolled) * 100);
  const unreachedPool = totalSTEnrolled - totalBeneficiaries;

  const handleRunMatchingEngine = () => {
    setMatchingRunning(true);
    setMatchResultNotice(null);
    setTimeout(() => {
      setMatchingRunning(false);
      setMatchResultNotice(
        `✅ Matching Complete: Cross-referenced 6.6 Million UDISE+ and APAAR enrolled ST records against NSP/SFMP/NOS databases. Identified 3.84 Million unreached beneficiaries. 142 high-priority PVTG blocks flagged for targeted doorstep outreach.`
      );
    }, 2000);
  };

  const filteredData = selectedState === 'ALL'
    ? coverageData
    : coverageData.filter(d => d.state === selectedState);

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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            <span>🗺️</span>
            <span>UDISE+ • APAAR • OTR Matching Engine</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', marginTop: '2px' }}>Scholarship Coverage Gap Analyzer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Identify enrolled Scheduled Tribe students who are not yet availing scholarship benefits for targeted outreach
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={handleRunMatchingEngine}
            disabled={matchingRunning}
            className="btn btn-primary"
          >
            {matchingRunning ? '🔄 Executing Cross-Matching...' : '⚡ Run APAAR vs NSP Match'}
          </button>
          <button
            onClick={() => alert('Exporting targeted outreach list (CSV) with UDISE+ school codes and block nodal contacts...')}
            className="btn btn-secondary"
          >
            📥 Export Outreach List
          </button>
        </div>
      </div>

      {matchResultNotice && (
        <div
          className="animate-slide-up"
          style={{
            background: 'var(--success-bg)',
            border: '1.5px solid var(--success)',
            color: 'var(--success)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-5)',
            fontWeight: 600,
            fontSize: '0.88rem',
          }}
        >
          {matchResultNotice}
        </div>
      )}

      {/* Coverage Gap Metrics */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="stat-card primary animate-slide-up stagger-1">
          <div className="stat-card-header">
            <div className="stat-card-icon">🎓</div>
            <span className="stat-card-label">Total ST Students (UDISE+)</span>
          </div>
          <div className="stat-card-value">{(totalSTEnrolled / 1000000).toFixed(2)} Million</div>
          <div className="stat-card-change">Across 10 major tribal states</div>
        </div>

        <div className="stat-card success animate-slide-up stagger-2">
          <div className="stat-card-header">
            <div className="stat-card-icon">✓</div>
            <span className="stat-card-label">Current Beneficiaries</span>
          </div>
          <div className="stat-card-value">{(totalBeneficiaries / 1000000).toFixed(2)} Million</div>
          <div className="stat-card-change positive">{overallCoverage}% Coverage Rate</div>
        </div>

        <div className="stat-card warning animate-slide-up stagger-3">
          <div className="stat-card-header">
            <div className="stat-card-icon">⚠️</div>
            <span className="stat-card-label">Unreached Coverage Gap</span>
          </div>
          <div className="stat-card-value">{(unreachedPool / 1000000).toFixed(2)} Million</div>
          <div className="stat-card-change negative">Enrolled in school/college but 0 scholarship</div>
        </div>

        <div className="stat-card info animate-slide-up stagger-4">
          <div className="stat-card-header">
            <div className="stat-card-icon">🎯</div>
            <span className="stat-card-label">PVTG Priority Saturation</span>
          </div>
          <div className="stat-card-value">28.4%</div>
          <div className="stat-card-change">Special mission blocks targeted</div>
        </div>
      </div>

      {/* State-by-State Coverage Heatmap Table */}
      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">State-Wise Gap Analysis & Matching Breakdown</h3>
            <p className="card-subtitle">Identifies districts with highest dropout vulnerability and low scheme penetration</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{ width: 'auto', padding: '4px 12px', fontSize: '0.85rem' }}
            >
              <option value="ALL">All States (10)</option>
              {coverageData.map((d) => (
                <option key={d.state} value={d.state}>{d.state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper" style={{ marginTop: 'var(--space-3)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Enrolled STs (UDISE+)</th>
                <th>Active Beneficiaries</th>
                <th>Unreached Gap</th>
                <th>Coverage %</th>
                <th>Pre-Matric</th>
                <th>Post-Matric</th>
                <th>Top Class / Fellowship</th>
                <th>Intervention Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const gap = row.totalSTStudents - row.scholarshipBeneficiaries;
                const priority = row.coveragePercent < 40 ? 'HIGH' : row.coveragePercent < 48 ? 'MEDIUM' : 'OPTIMAL';

                return (
                  <tr key={row.state}>
                    <td>
                      <strong style={{ fontSize: '0.9rem' }}>{row.state}</strong>
                    </td>
                    <td>{row.totalSTStudents.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent)' }}>
                      {row.scholarshipBeneficiaries.toLocaleString('en-IN')}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--error)' }}>
                      {gap.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div className="progress-bar-container" style={{ width: '50px', height: '6px' }}>
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${row.coveragePercent}%`,
                              background: row.coveragePercent >= 45 ? 'var(--accent)' : 'var(--warning)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{row.coveragePercent}%</span>
                      </div>
                    </td>
                    <td>{row.preMatric.toLocaleString('en-IN')}</td>
                    <td>{row.postMatric.toLocaleString('en-IN')}</td>
                    <td>{(row.topClass + row.nfst + row.nos).toLocaleString('en-IN')}</td>
                    <td>
                      <span
                        className={`badge ${
                          priority === 'HIGH' ? 'rejected' : priority === 'MEDIUM' ? 'deficient' : 'verified'
                        }`}
                        style={{ fontSize: '0.68rem' }}
                      >
                        {priority === 'HIGH' ? '🚨 High Priority' : priority === 'MEDIUM' ? '⚠️ Medium Gap' : '✓ Good Saturation'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Targeted Outreach Action Protocol */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)',
          borderLeft: '5px solid var(--primary)',
        }}
      >
        <h3 style={{ fontSize: '1.05rem', marginBottom: 'var(--space-2)' }}>
          Targeted Beneficiary Outreach & Enrolment Protocols
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', maxWidth: '780px' }}>
          By matching student Aadhaar and APAAR IDs from UDISE+ with scholarship portal registrations, District Tribal Development Officers (DTDOs) can directly send pre-filled application forms to schools and Gram Panchayats.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ background: 'var(--surface)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>1. Pre-Filled School Dossiers</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Headmasters receive lists of eligible students automatically populated with UDISE+ details.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>2. Mobile CSC Enrolment Camps</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Common Service Centers dispatch biometrics vans to remote tribal hamlets with low coverage.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>3. JAGO Multilingual SMS Campaign</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Automated reminders in tribal languages sent to parents before scheme deadlines close.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
