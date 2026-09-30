'use client';

import { currentStudent } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Student Unified Profile</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          One Nation, One Student Identity (APAAR) synchronized with UIDAI eKYC & Tribal Registry
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Personal & Demographic Card */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Personal & Demographic Details</h3>
              <p className="card-subtitle">Verified via UIDAI Aadhaar eKYC</p>
            </div>
            <span className="badge verified">eKYC Verified ✓</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <span className="stat-card-label">Full Name</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{currentStudent.name}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div>
                <span className="stat-card-label">Date of Birth</span>
                <div style={{ fontWeight: 600 }}>{currentStudent.dob}</div>
              </div>
              <div>
                <span className="stat-card-label">Gender</span>
                <div style={{ fontWeight: 600 }}>{currentStudent.gender === 'F' ? 'Female' : 'Male'}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div>
                <span className="stat-card-label">Aadhaar Reference</span>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>XXXX-XXXX-{currentStudent.aadhaarLast4}</div>
              </div>
              <div>
                <span className="stat-card-label">APAAR / Student ID</span>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{currentStudent.aparId}</div>
              </div>
            </div>

            <div>
              <span className="stat-card-label">Contact Details</span>
              <div style={{ fontSize: '0.88rem' }}>{currentStudent.email} • {currentStudent.phone}</div>
            </div>
          </div>
        </div>

        {/* Tribal Identity & Domicile */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Tribal & Socio-Economic Certification</h3>
              <p className="card-subtitle">Verified via State e-District & Tribal Dept.</p>
            </div>
            <span className="badge verified">Caste & Income Verified</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div>
                <span className="stat-card-label">Scheduled Tribe (ST)</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                  {currentStudent.tribe}
                </div>
              </div>
              <div>
                <span className="stat-card-label">PVTG Classification</span>
                <div style={{ fontWeight: 600 }}>
                  {currentStudent.isPVTG ? 'Particularly Vulnerable (PVTG)' : 'General ST'}
                </div>
              </div>
            </div>

            <div>
              <span className="stat-card-label">Certified Annual Family Income</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>
                ₹{currentStudent.annualIncome.toLocaleString('en-IN')} / year
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Within ₹2.5L ceiling for Pre/Post-Matric & ₹6L for Top-Class/NOS
              </span>
            </div>

            <div>
              <span className="stat-card-label">Permanent Domicile</span>
              <div style={{ fontWeight: 600 }}>
                {currentStudent.block}, {currentStudent.district}, {currentStudent.state}
              </div>
            </div>
          </div>
        </div>

        {/* Institution & Academic Enrolment */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Enrolled Academic Institution</h3>
              <p className="card-subtitle">AISHE & Academic Bank of Credits</p>
            </div>
            <span className="badge verified">AISHE Validated</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <span className="stat-card-label">Current Course</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{currentStudent.currentEducationLevel}</div>
            </div>

            <div>
              <span className="stat-card-label">Affiliated University / College</span>
              <div style={{ fontWeight: 600 }}>{currentStudent.institutionName}</div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AISHE Registry Code: U-0469</span>
            </div>
          </div>
        </div>

        {/* Bank & DBT Setup */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">PFMS Bank Account</h3>
              <p className="card-subtitle">Direct Benefit Transfer destination</p>
            </div>
            <span className="badge verified">Aadhaar Seeded ✓</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <span className="stat-card-label">Bank Name</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{currentStudent.bankName}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              <div>
                <span className="stat-card-label">Account Number</span>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{currentStudent.bankAccountNo}</div>
              </div>
              <div>
                <span className="stat-card-label">IFSC Code</span>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{currentStudent.ifscCode}</div>
              </div>
            </div>

            <div style={{ background: 'var(--success-bg)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
                ✓ NPCI Aadhaar Payment Bridge (APB) Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
