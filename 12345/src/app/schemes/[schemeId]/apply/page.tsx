'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { schemes, currentStudent, applications, documents, type SchemeType } from '@/lib/mockData';

export default function ApplySchemePage({ params }: { params: Promise<{ schemeId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const scheme = schemes.find((s) => s.id === resolvedParams.schemeId) || schemes[1]; // default to Post-Matric

  // Step wizard: 1 = One-Scheme Conflict Check, 2 = Auto-filled Profile & Aadhaar, 3 = Academic & Institute, 4 = Digital Wallet Docs, 5 = Review & Submit
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Check if student already has active sanctioned/disbursed scholarship
  const activeExistingApp = applications.find(
    (a) => (a.status === 'SANCTIONED' || a.status === 'UNDER_VERIFICATION') && a.academicYear === '2025-26'
  );

  const hasConflict = !!activeExistingApp && activeExistingApp.schemeId !== scheme.id;

  const [formData, setFormData] = useState({
    institutionAishe: 'U-0469',
    institutionName: currentStudent.institutionName,
    courseName: 'B.Sc. (Hons) Chemistry',
    rollNumber: 'CHEM-2023-042',
    admissionYear: '2023',
    annualTuitionFees: '18500',
    hostellerStatus: 'Day Scholar',
    bankAccountNo: currentStudent.bankAccountNo,
    ifscCode: currentStudent.ifscCode,
    agreeOneSchemeRule: false,
    consentAadhaarVerification: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
        <Link href="/schemes">Schemes</Link>
        <span>›</span>
        <span>{scheme.shortName}</span>
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>Unified Application</span>
      </div>

      {/* Scheme Header */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
          marginBottom: "var(--space-6)",
          padding: "var(--space-5) var(--space-6)",
          borderLeft: "5px solid var(--primary)",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <span className={`scheme-card-tag ${scheme.tagClass}`} style={{ marginBottom: '4px' }}>
              Portal: {scheme.portalSource}
            </span>
            <h1 style={{ fontSize: "1.4rem" }}>Application for {scheme.name}</h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Academic Session 2025-26 • Direct Benefit Transfer (DBT) via PFMS
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Estimated Benefit</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>{scheme.benefits}</div>
          </div>
        </div>
      </div>

      {submissionSuccess ? (
        <div className="card animate-slide-up" style={{ textAlign: 'center', padding: 'var(--space-9)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-3)' }}>🎉</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>
            Application Successfully Submitted!
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto var(--space-5)' }}>
            Your application for <strong>{scheme.name}</strong> has been registered with Reference ID <strong>APP-2025-NEW-9041</strong>.
            Instant auto-verification against DigiLocker, AISHE, and e-District has been triggered.
          </p>

          <div
            style={{
              background: 'var(--bg)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '480px',
              margin: '0 auto var(--space-6)',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Applicant:</span>
              <strong>{currentStudent.name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>APAAR ID:</span>
              <strong>{currentStudent.aparId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Current Stage:</span>
              <span className="badge submitted">Institute Verification</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <Link href="/applications" className="btn btn-primary">
              📋 Track in My Applications
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Step Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)', position: 'relative' }}>
            {['Cross-Portal Check', 'eKYC & Identity', 'Institute & Course', 'Digital Wallet', 'Submission'].map((stepLabel, idx) => {
              const stepNumber = idx + 1;
              const isPassed = currentStep > stepNumber;
              const isActive = currentStep === stepNumber;
              return (
                <div
                  key={stepLabel}
                  onClick={() => isPassed && setCurrentStep(stepNumber)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    cursor: isPassed ? 'pointer' : 'default',
                    opacity: currentStep >= stepNumber ? 1 : 0.5,
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isPassed ? 'var(--accent)' : isActive ? 'var(--primary)' : 'var(--border)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    {isPassed ? '✓' : stepNumber}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary)' : 'var(--text-muted)', textAlign: 'center' }}>
                    {stepLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step 1: One-Scheme Conflict Rule Engine */}
          {currentStep === 1 && (
            <div className="card animate-fade-in">
              <div className="card-header">
                <div>
                  <h3 className="card-title">1. One-Scholarship Policy & Conflict Engine</h3>
                  <p className="card-subtitle">
                    Cross-verification against NSP, SFMP (Canara Bank), and standalone NOS portal records
                  </p>
                </div>
                <span className="badge verified">Active Rule Check</span>
              </div>

              {hasConflict ? (
                <div
                  style={{
                    background: 'var(--warning-bg)',
                    border: '1.5px solid var(--warning)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-5)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.8rem' }}>⚠️</div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--warning)', marginBottom: '4px' }}>
                        Active Scholarship Detected Under Policy
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        You currently have an active sanctioned scholarship: <strong>{activeExistingApp?.schemeName}</strong> ({activeExistingApp?.id}) for session 2025-26.
                        Under Vidvan regulations, a student can avail only <em>one</em> centrally funded scholarship or fellowship at any given time.
                      </p>
                      <div style={{ marginTop: 'var(--space-3)', fontSize: '0.82rem', fontWeight: 600 }}>
                        If you proceed, your existing scholarship may be cancelled or surrendered upon sanction of this new scheme.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: 'var(--success-bg)',
                    border: '1.5px solid var(--success)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', color: 'var(--success)' }}>✓</div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--success)', marginBottom: '2px' }}>
                      No Conflicting Scholarship Active
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Verified across NSP, SFMP, and NOS databases. You are clear to submit this application.
                    </p>
                  </div>
                </div>
              )}

              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.agreeOneSchemeRule}
                    onChange={(e) => setFormData({ ...formData, agreeOneSchemeRule: e.target.checked })}
                    style={{ width: 'auto', marginTop: '4px' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>
                    I solemnly declare that I will not claim duplicate financial assistance under any other Central or State government scholarship scheme for the same course duration.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button
                  className="btn btn-primary"
                  disabled={!formData.agreeOneSchemeRule}
                  onClick={() => setCurrentStep(2)}
                  style={{ opacity: formData.agreeOneSchemeRule ? 1 : 0.6 }}
                >
                  Proceed to eKYC & Identity Verification →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Auto-filled Profile & Aadhaar eKYC */}
          {currentStep === 2 && (
            <div className="card animate-fade-in">
              <div className="card-header">
                <div>
                  <h3 className="card-title">2. Pre-Filled Student Profile & Digital Identity</h3>
                  <p className="card-subtitle">
                    Retrieved via UIDAI eKYC and State e-District Certificate Repositories
                  </p>
                </div>
                <span className="badge verified">Aadhaar Verified ✓</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name (As per Aadhaar)</label>
                  <input type="text" value={currentStudent.name} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input type="text" value={currentStudent.dob} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <input type="text" value={currentStudent.gender === 'F' ? 'Female' : 'Male'} disabled style={{ background: 'var(--bg)' }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Community / Tribe</label>
                  <input type="text" value={`${currentStudent.tribe} (Scheduled Tribe)`} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">PVTG Status</label>
                  <input type="text" value={currentStudent.isPVTG ? 'Yes (Particularly Vulnerable)' : 'No (General ST)'} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">APAAR / One Nation Student ID</label>
                  <input type="text" value={currentStudent.aparId} disabled style={{ background: 'var(--bg)' }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">State of Domicile</label>
                  <input type="text" value={currentStudent.state} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">District & Block</label>
                  <input type="text" value={`${currentStudent.district}, ${currentStudent.block}`} disabled style={{ background: 'var(--bg)' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Certified Annual Family Income</label>
                  <input type="text" value={`₹${currentStudent.annualIncome.toLocaleString('en-IN')}`} disabled style={{ background: 'var(--bg)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                  Next: Institution & Course Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Academic & Institution Details */}
          {currentStep === 3 && (
            <div className="card animate-fade-in">
              <div className="card-header">
                <div>
                  <h3 className="card-title">3. Institution & Course Details</h3>
                  <p className="card-subtitle">
                    Automated check against AISHE (All India Survey on Higher Education) database
                  </p>
                </div>
                <span className="badge verified">AISHE Code: U-0469</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Institution AISHE Code</label>
                  <input
                    type="text"
                    value={formData.institutionAishe}
                    onChange={(e) => setFormData({ ...formData, institutionAishe: e.target.value })}
                  />
                  <span className="form-hint">AISHE registry verifies recognized accreditation</span>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Institution Name</label>
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Course / Degree Program</label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">College Roll / Registration No.</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Hosteller or Day Scholar?</label>
                  <select
                    value={formData.hostellerStatus}
                    onChange={(e) => setFormData({ ...formData, hostellerStatus: e.target.value })}
                  >
                    <option value="Day Scholar">Day Scholar</option>
                    <option value="Hosteller">Hosteller (Eligible for Higher Rate)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Annual Non-Refundable Tuition Fees (₹)</label>
                  <input
                    type="number"
                    value={formData.annualTuitionFees}
                    onChange={(e) => setFormData({ ...formData, annualTuitionFees: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Disbursement Bank Account (Aadhaar Seeded)</label>
                  <input type="text" value={`${currentStudent.bankName} - ${formData.bankAccountNo}`} disabled style={{ background: 'var(--bg)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                  ← Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentStep(4)}>
                  Next: Digital Wallet Documents →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Digital Document Wallet Selection */}
          {currentStep === 4 && (
            <div className="card animate-fade-in">
              <div className="card-header">
                <div>
                  <h3 className="card-title">4. DigiLocker Document Wallet & Auto-Attachments</h3>
                  <p className="card-subtitle">
                    Reusable verified documents already stored in your secure Vidvan wallet
                  </p>
                </div>
                <Link href="/documents" target="_blank" className="btn btn-ghost btn-sm">
                  Open Wallet ↗
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {documents.slice(0, 5).map((doc) => (
                  <div key={doc.id} className="doc-card" style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div className="doc-card-icon verified">✓</div>
                    <div className="doc-card-info">
                      <div className="doc-card-name">{doc.name}</div>
                      <div className="doc-card-meta">
                        <span>Source: {doc.source}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span style={{ color: 'var(--accent)' }}>Digitally Verified</span>
                        {doc.type === 'AADHAAR' && (
                          <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#e3f2fd', color: '#1565c0', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>Cross-checked via UIDAI</span>
                        )}
                        {(doc.type === 'MARKSHEET' || doc.type === 'ADMISSION_LETTER') && (
                          <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#f3e5f5', color: '#6a1b9a', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 600 }}>Cross-checked via AISHE / UGC-NTA / UDISE+</span>
                        )}
                      </div>
                    </div>
                    <span className="badge verified">Attached</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 'var(--space-5)',
                  padding: 'var(--space-4)',
                  background: 'var(--primary-50)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div style={{ fontSize: '1.4rem' }}>💡</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <strong>Zero Repetitive Submissions:</strong> Because your Aadhaar, ST Certificate, and Marksheets are already authenticated via DigiLocker, no manual uploads or attestation gazettes are required!
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(3)}>
                  ← Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentStep(5)}>
                  Review & Final Submission →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="card animate-fade-in">
              <div className="card-header">
                <div>
                  <h3 className="card-title">5. Review Application Summary</h3>
                  <p className="card-subtitle">Please check your details before final dispatch to the verification workflow</p>
                </div>
                <span className="badge draft">Ready for Dispatch</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--space-4)',
                  background: 'var(--bg)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target Scheme</span>
                  <div style={{ fontWeight: 700 }}>{scheme.name}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Applicant</span>
                  <div style={{ fontWeight: 700 }}>{currentStudent.name}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Institution</span>
                  <div style={{ fontWeight: 700 }}>{formData.institutionName}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Course & Roll</span>
                  <div style={{ fontWeight: 700 }}>{formData.courseName} ({formData.rollNumber})</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DBT Bank Account</span>
                  <div style={{ fontWeight: 700 }}>{currentStudent.bankName} (XXXX-3456)</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DigiLocker Docs</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent)' }}>5 Verified Attachments</div>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.consentAadhaarVerification}
                    onChange={(e) => setFormData({ ...formData, consentAadhaarVerification: e.target.checked })}
                    style={{ width: 'auto' }}
                  />
                  <span style={{ fontSize: '0.85rem' }}>
                    I give voluntary consent to Vidvan to use my Aadhaar details for authenticating my student profile and routing DBT payment via PFMS.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                <button className="btn btn-secondary" onClick={() => setCurrentStep(4)}>
                  ← Back
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.consentAadhaarVerification}
                >
                  {isSubmitting ? 'Submitting to Unified Gateway...' : '🚀 Submit Application'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
