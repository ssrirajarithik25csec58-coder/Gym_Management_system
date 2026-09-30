'use client';

import { useState } from 'react';
import { disbursements, currentStudent } from '@/lib/mockData';

export default function PaymentsPage() {
  const [filterYear, setFilterYear] = useState('ALL');

  const totalDisbursed = disbursements
    .filter((d) => d.status === 'SUCCESS')
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingDisbursement = disbursements
    .filter((d) => d.status === 'PROCESSING' || d.status === 'INITIATED')
    .reduce((sum, d) => sum + d.amount, 0);

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
          <h1 style={{ fontSize: '1.8rem' }}>Direct Benefit Transfer (DBT) & Payment Hub</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Consolidated payment ledger powered by Public Financial Management System (PFMS) & NPCI
          </p>
        </div>

        <button
          onClick={() => alert('Official DBT Statement for AY 2024-26 downloaded.')}
          className="btn btn-secondary"
        >
          📥 Download Statement
        </button>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="stat-card success animate-slide-up stagger-1">
          <div className="stat-card-header">
            <div className="stat-card-icon">💰</div>
            <span className="stat-card-label">Total Amount Disbursed</span>
          </div>
          <div className="stat-card-value">₹{totalDisbursed.toLocaleString('en-IN')}</div>
          <div className="stat-card-change positive">✓ Credited via Aadhaar Bridge</div>
        </div>

        <div className="stat-card info animate-slide-up stagger-2">
          <div className="stat-card-header">
            <div className="stat-card-icon">⏳</div>
            <span className="stat-card-label">In-Pipeline / PFMS Processing</span>
          </div>
          <div className="stat-card-value">₹{pendingDisbursement.toLocaleString('en-IN')}</div>
          <div className="stat-card-change">Expected within 7-10 working days</div>
        </div>

        <div className="stat-card primary animate-slide-up stagger-3">
          <div className="stat-card-header">
            <div className="stat-card-icon">🏦</div>
            <span className="stat-card-label">Aadhaar Seeded Bank Account</span>
          </div>
          <div className="stat-card-value" style={{ fontSize: '1.25rem' }}>{currentStudent.bankName}</div>
          <div className="stat-card-change positive">A/c: {currentStudent.bankAccountNo} • NPCI Active ✓</div>
        </div>
      </div>

      {/* Bank Account DBT Health Check Callout */}
      <div
        className="card"
        style={{
          background: 'var(--surface)',
          borderLeft: '4px solid var(--accent)',
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>💳</div>
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Aadhaar Seeding Status: Active & Ready for DBT</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              NPCI Aadhaar Payment Bridge (APB) mapping confirmed on 12-July-2024. Next DBT installment will credit without friction.
            </p>
          </div>
        </div>
        <span className="badge verified">NPCI Validated ✓</span>
      </div>

      {/* Transactions Ledger Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Consolidated Transaction Ledger</h3>
            <p className="card-subtitle">Every installment disbursed or initiated across all five schemes</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              className={`btn btn-sm ${filterYear === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterYear('ALL')}
            >
              All Years
            </button>
            <button
              className={`btn btn-sm ${filterYear === '2025' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterYear('2025')}
            >
              2025-26
            </button>
            <button
              className={`btn btn-sm ${filterYear === '2024' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterYear('2024')}
            >
              2024-25
            </button>
          </div>
        </div>

        <div className="table-wrapper" style={{ marginTop: 'var(--space-3)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Scheme & Component</th>
                <th>Application ID</th>
                <th>Amount</th>
                <th>PFMS Ref ID</th>
                <th>Date Credited</th>
                <th>DBT Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {disbursements.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{d.component}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.schemeName}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{d.applicationId}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: d.status === 'SUCCESS' ? 'var(--accent)' : 'var(--warning)' }}>
                      ₹{d.amount.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {d.pfmsTransactionId || 'Processing in PFMS'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem' }}>{d.disbursedAt || 'Expected Nov 2025'}</span>
                  </td>
                  <td>
                    <span className={`badge ${d.status === 'SUCCESS' ? 'verified' : 'pending'}`}>
                      {d.status === 'SUCCESS' ? '✓ Credited' : '⏳ In Progress'}
                    </span>
                  </td>
                  <td>
                    {d.status === 'SUCCESS' ? (
                      <button
                        onClick={() => alert(`Downloading payment receipt for ${d.pfmsTransactionId}`)}
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: '0.75rem' }}
                      >
                        📄 Slip
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
