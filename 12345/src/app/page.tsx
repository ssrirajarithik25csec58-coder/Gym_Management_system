import Link from "next/link";
import { schemes } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #2A1B0E 50%, #0D2818 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-9) var(--space-8)",
          color: "white",
          marginBottom: "var(--space-7)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, rgba(230, 81, 0, 0.25) 0%, transparent 70%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />
        
        <div style={{ maxWidth: "850px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#FFB74D",
              marginBottom: "var(--space-4)",
            }}
          >
            <span>🇮🇳</span>
            <span>Ministry of Tribal Affairs • Government of India</span>
          </div>

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
              marginBottom: "var(--space-4)",
            }}
          >
            Unified Scholarship & Fellowship Portal for{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF9800, #4CAF50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Scheduled Tribe Students
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              marginBottom: "var(--space-6)",
              maxWidth: "720px",
            }}
          >
            A single, mobile-first window converging <strong>Pre-Matric, Post-Matric, Top Class, NFST,</strong> and <strong>National Overseas Scholarship (NOS)</strong> schemes. Featuring automated DigiLocker & APAAR verification, real-time DBT tracking, and JAGO AI helpdesk.
          </p>

          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/login" className="btn btn-primary btn-lg">
              🚀 Sign In / Register
            </Link>
            <Link
              href="/schemes"
              className="btn btn-secondary btn-lg"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              🎓 Explore All 5 Schemes
            </Link>
          </div>
        </div>

        {/* Highlight Badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "var(--space-3)",
            marginTop: "var(--space-7)",
            paddingTop: "var(--space-5)",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFA726" }}>5 Schemes</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)" }}>NSP, SFMP & NOS in 1 View</div>
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#66BB6A" }}>100% DBT</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)" }}>Aadhaar-seeded direct payment</div>
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#42A5F5" }}>Zero Duplication</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)" }}>Cross-portal conflict prevention</div>
          </div>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#AB47BC" }}>Auto-Verification</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)" }}>DigiLocker, AISHE, UDISE+, APAAR</div>
          </div>
        </div>
      </section>

      {/* Five Schemes Overview Cards */}
      <section style={{ marginBottom: "var(--space-7)" }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Five Centrally Administered Vidvan Schemes</h2>
            <p className="card-subtitle">Choose your current academic milestone to review eligibility & apply</p>
          </div>
          <Link href="/schemes" className="btn btn-secondary btn-sm">
            View Comparison Table →
          </Link>
        </div>

        <div className="schemes-grid" style={{ marginTop: "var(--space-4)" }}>
          {schemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              <div className="scheme-card-banner" />
              <div className="scheme-card-body">
                <span className={`scheme-card-tag ${scheme.tagClass}`}>
                  Source: {scheme.portalSource}
                </span>
                <h3 className="scheme-card-title">{scheme.shortName}</h3>
                <p className="scheme-card-desc">{scheme.description}</p>

                <div style={{ marginBottom: "var(--space-4)", fontSize: "0.82rem" }}>
                  <strong style={{ color: "var(--text)" }}>Benefits: </strong>
                  <span style={{ color: "var(--primary-dark)", fontWeight: 600 }}>{scheme.benefits}</span>
                </div>

                <div className="scheme-card-meta">
                  <div className="scheme-card-meta-item">
                    <span className="scheme-card-meta-label">Level</span>
                    <span className="scheme-card-meta-value">{scheme.educationLevel}</span>
                  </div>
                  <div className="scheme-card-meta-item">
                    <span className="scheme-card-meta-label">Max Family Income</span>
                    <span className="scheme-card-meta-value">
                      {scheme.maxIncome === 0 ? "No Ceiling" : `₹${(scheme.maxIncome / 100000).toFixed(1)} Lakh/yr`}
                    </span>
                  </div>
                  <div className="scheme-card-meta-item">
                    <span className="scheme-card-meta-label">Deadline</span>
                    <span className="scheme-card-meta-value">{scheme.applicationDeadline}</span>
                  </div>
                </div>

                <div style={{ marginTop: "var(--space-5)" }}>
                  <Link href={`/schemes/${scheme.id}/apply`} className="btn btn-primary btn-sm btn-block">
                    Apply via Unified System →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Ecosystem Architecture Callout */}
      <section
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
          marginBottom: "var(--space-7)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto var(--space-6)" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "var(--space-2)" }}>
            Unified Digital Verification & Integration Hub
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Connecting disparate government databases into one seamless API gateway to eliminate repetitive document uploads and delays.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <div className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>🔒</div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>DigiLocker & ABC</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Direct certificate & marksheet pulls without paper attestations.
            </p>
          </div>

          <div className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>🏛️</div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>AISHE & UDISE+</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Instant verification of school and college accreditation status.
            </p>
          </div>

          <div className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>🆔</div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>APAAR & OTR</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Lifelong One Nation One Student ID tracking cross-scheme benefits.
            </p>
          </div>

          <div className="card" style={{ padding: "var(--space-4)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>💳</div>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "4px" }}>PFMS & NPCI DBT</h4>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Aadhaar-based fast disbursement directly to active bank accounts.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Launchpad Action Bar */}
      <section
        style={{
          background: "var(--primary-50)",
          border: "1.5px dashed var(--primary)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-5) var(--space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.05rem", color: "var(--primary-dark)", marginBottom: "4px" }}>
            Already applied under NSP, SFMP, or NOS?
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Login with your Aadhaar or OTR ID to consolidate your records and track payments.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Link href="/dashboard" className="btn btn-primary btn-sm">
            Access Dashboard
          </Link>
          <Link href="/chatbot" className="btn btn-secondary btn-sm">
            Ask JAGO Assistant
          </Link>
        </div>
      </section>
    </div>
  );
}
