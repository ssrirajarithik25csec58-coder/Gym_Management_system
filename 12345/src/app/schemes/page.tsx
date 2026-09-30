'use client';

import { useState } from 'react';
import Link from 'next/link';
import { schemes, applications, type SchemeInfo } from '@/lib/mockData';

export default function SchemesPage() {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Eligibility Checker state
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [userIncome, setUserIncome] = useState<number>(200000);
  const [userLevel, setUserLevel] = useState<string>('UG');
  const [isTribeST, setIsTribeST] = useState<boolean>(true);
  const [clearedNetJrf, setClearedNetJrf] = useState<boolean>(false);
  const [hasOverseasAdmission, setHasOverseasAdmission] = useState<boolean>(false);

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterLevel === 'ALL') return matchesSearch;
    if (filterLevel === 'SCHOOL') return matchesSearch && s.id === 'PRE_MATRIC';
    if (filterLevel === 'COLLEGE') return matchesSearch && (s.id === 'POST_MATRIC' || s.id === 'TOP_CLASS');
    if (filterLevel === 'RESEARCH') return matchesSearch && s.id === 'NFST';
    if (filterLevel === 'OVERSEAS') return matchesSearch && s.id === 'NOS';
    return matchesSearch;
  });

  // Calculate Eligibility for each scheme
  const checkEligibilityForScheme = (scheme: SchemeInfo) => {
    const activeApp = applications.find(a => ['VERIFIED', 'SANCTIONED', 'DISBURSED', 'DISBURSEMENT_INITIATED'].includes(a.status));
    if (activeApp && activeApp.schemeId !== scheme.id) {
      return { eligible: false, reason: `Not Eligible — Already Availing ${activeApp.schemeName}` };
    }
    
    if (!isTribeST) return { eligible: false, reason: 'Must belong to Scheduled Tribe (ST)' };

    if (scheme.id === 'PRE_MATRIC') {
      if (userLevel !== 'SCHOOL') return { eligible: false, reason: 'Only for Class I to X' };
      if (userIncome > 250000) return { eligible: false, reason: 'Income exceeds ₹2.5L limit' };
      return { eligible: true, reason: 'Eligible for Class I-X maintenance and fee grant' };
    }

    if (scheme.id === 'POST_MATRIC') {
      if (userLevel === 'SCHOOL') return { eligible: false, reason: 'Requires Class XI or higher' };
      if (userIncome > 250000) return { eligible: false, reason: 'Income exceeds ₹2.5L limit' };
      return { eligible: true, reason: 'Eligible for tuition & maintenance DBT' };
    }

    if (scheme.id === 'TOP_CLASS') {
      if (userLevel === 'SCHOOL') return { eligible: false, reason: 'Only for premier notified colleges' };
      if (userIncome > 600000) return { eligible: false, reason: 'Income exceeds ₹6L limit' };
      return { eligible: true, reason: 'Eligible if enrolled in notified premier institute' };
    }

    if (scheme.id === 'NFST') {
      if (!clearedNetJrf) return { eligible: false, reason: 'UGC-NET/JRF qualification required' };
      return { eligible: true, reason: 'Eligible for JRF/SRF monthly fellowship' };
    }

    if (scheme.id === 'NOS') {
      if (!hasOverseasAdmission) return { eligible: false, reason: 'Admission in top 500 foreign university required' };
      if (userIncome > 600000) return { eligible: false, reason: 'Income exceeds ₹6L limit' };
      return { eligible: true, reason: 'Eligible for full overseas sponsorship' };
    }

    return { eligible: false, reason: 'Criteria not matched' };
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--secondary-dark) 0%, var(--secondary) 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-7)",
          color: "white",
          marginBottom: "var(--space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <span style={{ fontSize: "0.8rem", color: "#90CAF9", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
            Unified Scheme Catalog
          </span>
          <h1 style={{ color: "white", fontSize: "1.8rem", marginTop: "4px" }}>
            Vidvan Scholarship Schemes (2025-26)
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem", maxWidth: "600px" }}>
            Compare funding levels, eligibility thresholds, and required documentation across all five national schemes.
          </p>
        </div>

        <button
          onClick={() => setCheckerOpen(!checkerOpen)}
          className="btn btn-primary"
          style={{ background: "#FF9800", color: "#000", fontWeight: 700 }}
        >
          {checkerOpen ? "Hide Eligibility Wizard" : "⚡ Check My Eligibility"}
        </button>
      </div>

      {/* Interactive Eligibility Wizard */}
      {checkerOpen && (
        <div
          className="card animate-slide-up"
          style={{
            marginBottom: "var(--space-6)",
            border: "2px solid var(--primary)",
            background: "var(--surface)",
          }}
        >
          <div className="card-header">
            <div>
              <h3 className="card-title">🎯 Instant Multi-Scheme Eligibility Checker</h3>
              <p className="card-subtitle">
                Fill in your credentials to check eligibility across all 5 schemes simultaneously.
              </p>
            </div>
            <span className="badge sanctioned">Simulated Verification</span>
          </div>

          <div className="form-row" style={{ marginTop: "var(--space-3)" }}>
            <div className="form-group">
              <label className="form-label">Are you a Scheduled Tribe (ST) Student?</label>
              <select
                value={isTribeST ? 'YES' : 'NO'}
                onChange={(e) => setIsTribeST(e.target.value === 'YES')}
              >
                <option value="YES">Yes, Belong to ST</option>
                <option value="NO">No, Other Category</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Current Education Level</label>
              <select value={userLevel} onChange={(e) => setUserLevel(e.target.value)}>
                <option value="SCHOOL">School (Class 1 - 10)</option>
                <option value="INTERMEDIATE">Higher Secondary (Class 11 - 12)</option>
                <option value="UG">Undergraduate Degree (BA, BSc, BTech)</option>
                <option value="PG">Postgraduate Degree (MA, MSc, MTech)</option>
                <option value="PHD">M.Phil / Ph.D Research</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Annual Family Income: ₹{userIncome.toLocaleString('en-IN')}</label>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={userIncome}
                onChange={(e) => setUserIncome(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>₹50K</span>
                <span>₹2.5L (Pre/Post Cap)</span>
                <span>₹6L (Top/NOS Cap)</span>
                <span>₹10L</span>
              </div>
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: "var(--space-4)" }}>
            <div className="form-group">
              <label className="form-label">UGC-NET / JRF Qualified?</label>
              <select
                value={clearedNetJrf ? 'YES' : 'NO'}
                onChange={(e) => setClearedNetJrf(e.target.value === 'YES')}
              >
                <option value="NO">No / Not Appeared</option>
                <option value="YES">Yes, NET/JRF Qualified</option>
              </select>
              <span className="form-hint">Mandatory for NFST fellowship</span>
            </div>

            <div className="form-group">
              <label className="form-label">Foreign University Admission Offer?</label>
              <select
                value={hasOverseasAdmission ? 'YES' : 'NO'}
                onChange={(e) => setHasOverseasAdmission(e.target.value === 'YES')}
              >
                <option value="NO">No / Domestic Student</option>
                <option value="YES">Yes, Top 500 QS/THE University Offer</option>
              </select>
              <span className="form-hint">Mandatory for National Overseas Scholarship</span>
            </div>
          </div>

          {/* Results Summary Grid */}
          <div style={{ background: "var(--bg)", padding: "var(--space-4)", borderRadius: "var(--radius-md)" }}>
            <h4 style={{ fontSize: "0.9rem", marginBottom: "var(--space-3)" }}>Eligibility Evaluation:</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-3)" }}>
              {schemes.map((s) => {
                const evalResult = checkEligibilityForScheme(s);
                return (
                  <div
                    key={s.id}
                    style={{
                      background: "var(--surface)",
                      padding: "var(--space-3)",
                      borderRadius: "var(--radius-md)",
                      border: evalResult.eligible ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "0.85rem" }}>{s.shortName}</strong>
                      <span className={`badge ${evalResult.eligible ? 'verified' : 'rejected'}`} style={{ fontSize: '0.68rem' }}>
                        {evalResult.eligible ? 'Eligible ✓' : 'Not Eligible'}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{evalResult.reason}</p>
                    {evalResult.eligible && (
                      <Link
                        href={`/schemes/${s.id}/apply`}
                        className="btn btn-primary btn-sm btn-block"
                        style={{ marginTop: "var(--space-2)", fontSize: "0.72rem", padding: "4px 8px" }}
                      >
                        Apply for {s.shortName} →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          marginBottom: "var(--space-5)",
        }}
      >
        <div className="tabs" style={{ marginBottom: 0 }}>
          <button
            className={`tab ${filterLevel === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterLevel('ALL')}
          >
            All Schemes (5)
          </button>
          <button
            className={`tab ${filterLevel === 'SCHOOL' ? 'active' : ''}`}
            onClick={() => setFilterLevel('SCHOOL')}
          >
            School (Pre-Matric)
          </button>
          <button
            className={`tab ${filterLevel === 'COLLEGE' ? 'active' : ''}`}
            onClick={() => setFilterLevel('COLLEGE')}
          >
            Higher Ed (Post-Matric & Top Class)
          </button>
          <button
            className={`tab ${filterLevel === 'RESEARCH' ? 'active' : ''}`}
            onClick={() => setFilterLevel('RESEARCH')}
          >
            Research Fellowship (NFST)
          </button>
          <button
            className={`tab ${filterLevel === 'OVERSEAS' ? 'active' : ''}`}
            onClick={() => setFilterLevel('OVERSEAS')}
          >
            Overseas (NOS)
          </button>
        </div>

        <div style={{ maxWidth: "260px", width: "100%" }}>
          <input
            type="text"
            placeholder="🔍 Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "var(--space-2) var(--space-4)", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      {/* Scheme Detailed Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="card" style={{ padding: "var(--space-6)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "var(--space-4)",
                marginBottom: "var(--space-4)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                  <span className={`scheme-card-tag ${scheme.tagClass}`} style={{ marginBottom: 0 }}>
                    Integrated Portal: {scheme.portalSource}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Target: {scheme.educationLevel}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.3rem" }}>{scheme.name}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px", maxWidth: "800px" }}>
                  {scheme.description}
                </p>
              </div>

              <div style={{ textAlign: "right", minWidth: "160px" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Application Deadline
                </span>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary-dark)" }}>
                  {scheme.applicationDeadline}
                </div>
                <Link
                  href={`/schemes/${scheme.id}/apply`}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: "var(--space-2)" }}
                >
                  Apply Online →
                </Link>
              </div>
            </div>

            {/* Benefit and Criteria Columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-5)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              <div>
                <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "var(--space-2)" }}>
                  Financial Assistance & Benefits
                </h4>
                <div
                  style={{
                    background: "var(--primary-50)",
                    borderLeft: "3px solid var(--primary)",
                    padding: "var(--space-3) var(--space-4)",
                    borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {scheme.benefits}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "var(--space-2)" }}>
                  Key Eligibility Rules
                </h4>
                <ul style={{ paddingLeft: "var(--space-4)", fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {scheme.eligibility.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "var(--space-2)" }}>
                  Documents Auto-Pulled from DigiLocker
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {scheme.documentsRequired.map((doc, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "var(--bg)",
                        padding: "3px 8px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.72rem",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      📄 {doc.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
