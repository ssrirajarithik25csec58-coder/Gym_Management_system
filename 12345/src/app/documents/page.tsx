'use client';

import { useState } from 'react';
import { documents as initialDocs, type Document, type DocumentType } from '@/lib/mockData';

export default function DocumentWalletPage() {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('ALL');
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  // New Upload / OCR Simulation
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);

  const handleDigiLockerSync = () => {
    setIsSyncing(true);
    setSyncNotice(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('✅ Successfully synchronized with DigiLocker. 3 verified documents refreshed.');
      setTimeout(() => setSyncNotice(null), 4000);
    }, 1800);
  };

  const handleSimulateOcr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrScanning(true);
    setOcrResult(null);

    setTimeout(() => {
      setOcrScanning(false);
      setOcrResult({
        extractedName: 'Anita Murmu',
        extractedCaste: 'Santhal (Scheduled Tribe)',
        extractedDistrict: 'Dumka, Jharkhand',
        certNumber: 'JH/DUM/ST/2023/4567',
        confidenceScore: '98.6%',
        ocrStatus: 'AUTO_VERIFIED',
      });
    }, 1600);
  };

  const handleSaveOcrDoc = () => {
    if (!ocrResult) return;
    const newDoc: Document = {
      id: `DOC-NEW-${Date.now()}`,
      type: 'ST_CERTIFICATE',
      name: 'Scheduled Tribe Certificate (OCR Verified)',
      source: 'OCR',
      verificationStatus: 'AUTO_VERIFIED',
      verifiedBy: 'Smart AI OCR & e-District Hash',
      isReusable: true,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: '340 KB',
      verificationSource: 'OCR Engine + State Hash',
    };
    setDocs([newDoc, ...docs]);
    setUploadModalOpen(false);
    setOcrResult(null);
  };

  const filteredDocs = docs.filter((d) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'REUSABLE') return d.isReusable;
    if (filterType === 'VERIFIED') return d.verificationStatus === 'VERIFIED' || d.verificationStatus === 'AUTO_VERIFIED';
    if (filterType === 'PENDING') return d.verificationStatus === 'PENDING' || d.verificationStatus === 'MANUAL_REVIEW';
    return true;
  });

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
          <h1 style={{ fontSize: '1.8rem' }}>Digital Document Wallet</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Store once, reuse across all five scholarship schemes with automated DigiLocker & OCR verification
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={handleDigiLockerSync}
            disabled={isSyncing}
            className="btn btn-secondary"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'var(--primary-50)' }}
          >
            {isSyncing ? '🔄 Syncing DigiLocker...' : '🔗 Sync DigiLocker'}
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="btn btn-primary"
          >
            + Upload & OCR Verify
          </button>
        </div>
      </div>

      {syncNotice && (
        <div
          className="animate-slide-up"
          style={{
            background: 'var(--success-bg)',
            border: '1px solid var(--success)',
            color: 'var(--success)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-5)',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {syncNotice}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="tabs">
        <button
          className={`tab ${filterType === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilterType('ALL')}
        >
          All Documents ({docs.length})
        </button>
        <button
          className={`tab ${filterType === 'REUSABLE' ? 'active' : ''}`}
          onClick={() => setFilterType('REUSABLE')}
        >
          Reusable Across Schemes ({docs.filter(d => d.isReusable).length})
        </button>
        <button
          className={`tab ${filterType === 'VERIFIED' ? 'active' : ''}`}
          onClick={() => setFilterType('VERIFIED')}
        >
          Digitally Verified ({docs.filter(d => d.verificationStatus === 'VERIFIED' || d.verificationStatus === 'AUTO_VERIFIED').length})
        </button>
        <button
          className={`tab ${filterType === 'PENDING' ? 'active' : ''}`}
          onClick={() => setFilterType('PENDING')}
        >
          Action Needed ({docs.filter(d => d.verificationStatus === 'PENDING' || d.verificationStatus === 'MANUAL_REVIEW').length})
        </button>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <div
                className={`doc-card-icon ${
                  doc.verificationStatus === 'VERIFIED' || doc.verificationStatus === 'AUTO_VERIFIED'
                    ? 'verified'
                    : doc.verificationStatus === 'PENDING'
                    ? 'pending'
                    : 'default'
                }`}
              >
                {doc.verificationStatus === 'VERIFIED' || doc.verificationStatus === 'AUTO_VERIFIED' ? '✓' : '📄'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }} className="truncate">
                  {doc.name}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Source: <strong>{doc.source}</strong> • {doc.fileSize}
                </div>
              </div>
              <span
                className={`badge ${
                  doc.verificationStatus === 'VERIFIED' || doc.verificationStatus === 'AUTO_VERIFIED'
                    ? 'verified'
                    : doc.verificationStatus === 'PENDING'
                    ? 'pending'
                    : 'deficient'
                }`}
                style={{ fontSize: '0.68rem' }}
              >
                {doc.verificationStatus.replace(/_/g, ' ')}
              </span>
            </div>

            <div
              style={{
                background: 'var(--bg)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <div>
                <strong>Authority:</strong> {doc.verifiedBy || doc.verificationSource || 'Self-Uploaded (Awaiting Check)'}
              </div>
              <div style={{ marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Uploaded: {doc.uploadedAt}</span>
                {doc.isReusable && (
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>♻ Reusable</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setPreviewDoc(doc)}
              >
                👁 Inspect
              </button>
              <button className="btn btn-ghost btn-sm" title="Share with application">
                🔗 Link to Scheme
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Document Modal */}
      {previewDoc && (
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
          <div className="card animate-slide-up" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">{previewDoc.name}</h3>
                <p className="card-subtitle">{previewDoc.id} • {previewDoc.source}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                style={{ fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div><strong>Document Category:</strong> {previewDoc.type.replace(/_/g, ' ')}</div>
                <div><strong>Verification Status:</strong> <span className="badge verified">{previewDoc.verificationStatus}</span></div>
                <div><strong>Issuing Authority:</strong> {previewDoc.verifiedBy || previewDoc.verificationSource || 'Not yet certified'}</div>
                <div><strong>Digital Signature:</strong> SHA-256 Validated via Gov PKI</div>
                <div><strong>Multi-Scheme Reusability:</strong> {previewDoc.isReusable ? 'Allowed across Pre-Matric, Post-Matric, Top Class, NFST, NOS' : 'Scheme specific'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setPreviewDoc(null)}>
                Close
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Certificate downloaded securely with digital watermark.')}>
                Download Verified Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload & Smart OCR Modal */}
      {uploadModalOpen && (
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
          <div className="card animate-slide-up" style={{ maxWidth: '560px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Upload & Automated OCR Extraction</h3>
                <p className="card-subtitle">Extracts text and matches certificate hash with State e-District</p>
              </div>
              <button
                onClick={() => { setUploadModalOpen(false); setOcrResult(null); }}
                style={{ fontSize: '1.2rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                ✕
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Select Certificate / Document</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleSimulateOcr}
                style={{ border: '2px dashed var(--primary)', padding: 'var(--space-5)', textAlign: 'center', cursor: 'pointer' }}
              />
              <span className="form-hint">Supports PDF, PNG, JPEG up to 5MB (ST Certificate, Income, Marksheet)</span>
            </div>

            {ocrScanning && (
              <div style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                <div style={{ fontSize: '2rem', animation: 'spin 1s infinite linear' }}>🔄</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, marginTop: '8px' }}>
                  Scanning document via Smart OCR & verifying QR hash...
                </div>
              </div>
            )}

            {ocrResult && (
              <div className="animate-fade-in" style={{ background: 'var(--success-bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--success)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                  <span>✓</span>
                  <span>OCR Data Extracted & Validated ({ocrResult.confidenceScore} match)</span>
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text)' }}>
                  <div><strong>Student Name:</strong> {ocrResult.extractedName}</div>
                  <div><strong>Caste / Tribe:</strong> {ocrResult.extractedCaste}</div>
                  <div><strong>Certificate No:</strong> {ocrResult.certNumber}</div>
                  <div><strong>Jurisdiction:</strong> {ocrResult.extractedDistrict}</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <button
                className="btn btn-secondary"
                onClick={() => { setUploadModalOpen(false); setOcrResult(null); }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!ocrResult}
                onClick={handleSaveOcrDoc}
              >
                Save to Reusable Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
