'use client';

import { useState } from 'react';
import { verifications as initialVerifs, type Verification } from '@/lib/mockData';

export default function VerificationQueuePage() {
  const [verifList, setVerifList] = useState<Verification[]>(initialVerifs);
  const [selectedVerif, setSelectedVerif] = useState<Verification | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setVerifList(
      verifList.map((v) =>
        v.id === id ? { ...v, status: 'MATCHED', manualReviewRequired: false } : v
      )
    );
    setActionNotice(`✅ Verification ${id} manually reviewed and Approved.`);
    setSelectedVerif(null);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleFlagDeficiency = (id: string) => {
    setVerifList(
      verifList.map((v) =>
        v.id === id ? { ...v, status: 'PARTIAL_MATCH', manualReviewRequired: true } : v
      )
    );
    setActionNotice(`⚠️ Deficiency notice dispatched to applicant for ${id}.`);
    setSelectedVerif(null);
    setTimeout(() => setActionNotice(null), 3000);
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>
            <span>🔍</span>
            <span>Common Verification Layer (CVL)</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', marginTop: '2px' }}>Automated Verification & Scrutiny Queue</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Exceptions, ambiguities, and document mismatches routed from national source systems for officer adjudication
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={() => {
              setActionNotice('🔄 Synchronizing API connections with UIDAI, AISHE, e-District & UGC-NTA...');
              setTimeout(() => setActionNotice('✅ All 7 national source gateways healthy & synchronized.'), 1500);
            }}
            className="btn btn-secondary btn-sm"
          >
            🔄 Health-Check Gateways
          </button>
        </div>
      </div>

      {actionNotice && (
        <div
          className="animate-slide-up"
          style={{
            background: 'var(--primary-50)',
            border: '1.5px solid var(--primary)',
            color: 'var(--text)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-5)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          {actionNotice}
        </div>
      )}

      {/* Verification Queue Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Pending & Flagged Verifications ({verifList.length})</h3>
            <p className="card-subtitle">Auto-checked items with exception flags requiring manual review</p>
          </div>
          <span className="badge warning">
            {verifList.filter(v => v.manualReviewRequired).length} Require Officer Review
          </span>
        </div>

        <div className="table-wrapper" style={{ marginTop: 'var(--space-3)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Verification ID</th>
                <th>App ID</th>
                <th>Attribute & Field</th>
                <th>Source API System</th>
                <th>Confidence</th>
                <th>Status & Match</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {verifList.map((v) => (
                <tr key={v.id} style={{ background: v.manualReviewRequired ? 'var(--warning-bg)' : undefined }}>
                  <td>
                    <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{v.id}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{v.applicationId}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{v.field}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{v.submittedValue}</div>
                  </td>
                  <td>
                    <span className="badge draft">{v.sourceSystem}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="progress-bar-container" style={{ width: '60px', height: '6px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${v.confidence}%`,
                            background: v.confidence >= 90 ? 'var(--accent)' : v.confidence >= 50 ? 'var(--warning)' : 'var(--error)',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{v.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`verify-badge ${
                        v.status === 'MATCHED' ? 'auto' : v.status === 'PARTIAL_MATCH' ? 'manual' : 'failed'
                      }`}
                    >
                      {v.status === 'MATCHED' ? '✓ Auto-Matched' : v.status === 'PARTIAL_MATCH' ? '⚠️ Exception Flag' : '✕ Mismatch'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedVerif(v)}
                      style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                    >
                      Inspect Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exception Detail Modal */}
      {selectedVerif && (
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
          <div className="card animate-slide-up" style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Adjudicate Verification Exception</h3>
                <p className="card-subtitle">{selectedVerif.id} • {selectedVerif.field}</p>
              </div>
              <button
                onClick={() => setSelectedVerif(null)}
                style={{ fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-5)' }}>
              <div>
                <span className="stat-card-label">Source System</span>
                <div style={{ fontWeight: 600 }}>{selectedVerif.sourceSystem}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div>
                  <span className="stat-card-label">Applicant Submitted Value</span>
                  <div style={{ fontSize: '0.85rem', padding: 'var(--space-2)', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    {selectedVerif.submittedValue}
                  </div>
                </div>
                <div>
                  <span className="stat-card-label">Government Source Value</span>
                  <div style={{ fontSize: '0.85rem', padding: 'var(--space-2)', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    {selectedVerif.verifiedValue || 'No record returned from gateway'}
                  </div>
                </div>
              </div>

              <div>
                <span className="stat-card-label">Algorithm Confidence</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedVerif.confidence >= 90 ? 'var(--accent)' : 'var(--warning)' }}>
                  {selectedVerif.confidence}% Confidence Score
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleFlagDeficiency(selectedVerif.id)}
                style={{ borderColor: 'var(--warning)', color: 'var(--warning)' }}
              >
                ⚠️ Issue Deficiency Notice
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleApprove(selectedVerif.id)}
              >
                ✓ Override & Approve Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
