import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Search, 
  Camera, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  User, 
  Award, 
  Hash, 
  Clock,
  Building,
  RefreshCw
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function VerifyCertificate({ initialCertId = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialCertId);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);

  // If initial ID provided, auto-verify
  useEffect(() => {
    if (initialCertId) {
      setSearchQuery(initialCertId);
      performVerification(initialCertId);
    }
  }, [initialCertId]);

  // Set up camera scanner when modal/panel is opened
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      'qr-reader-container',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        // Handle URL or raw ID
        let certId = decodedText;
        if (decodedText.includes('/verify/')) {
          const parts = decodedText.split('/verify/');
          certId = parts[1];
        }
        setSearchQuery(certId);
        setShowScanner(false);
        scanner.clear();
        performVerification(certId);
      },
      (error) => {
        // scanning frames...
      }
    );

    return () => {
      try {
        scanner.clear();
      } catch (e) {}
    };
  }, [showScanner]);

  const performVerification = async (idToVerify) => {
    const cleanId = (idToVerify || searchQuery).trim();
    if (!cleanId) return;

    setLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(cleanId)}`);
      const data = await res.json();
      if (res.ok) {
        setVerificationResult(data);
      } else {
        setError(data.error || 'Certificate not found in regulatory registry.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error connecting to National Verification Authority.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <ShieldCheck size={14} />
          <span>NATIONAL PUBLIC VERIFICATION REPOSITORY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Verify Safety Competency Certificate
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Scan the QR code printed on the physical credential or input the Certificate ID below to perform instant cryptographic authenticity verification.
        </p>
      </div>

      {/* Verification Search Bar & Camera Trigger */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performVerification(searchQuery);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Enter Certificate UUID or Number (e.g. CERT-2026-IND-8821)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <RefreshCw className="animate-spin" size={16} /> : <ShieldCheck size={16} />}
              <span>Verify Now</span>
            </button>

            <button
              type="button"
              onClick={() => setShowScanner(!showScanner)}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              title="Scan QR Code with Camera"
            >
              <Camera size={16} />
              <span className="hidden sm:inline">Camera Scan</span>
            </button>
          </div>
        </form>

        {/* In-Browser Camera Scanner Container */}
        {showScanner && (
          <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-xl text-center space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Camera size={14} />
              <span>Point Camera at Certificate QR Code</span>
            </h4>
            <div id="qr-reader-container" className="max-w-xs mx-auto overflow-hidden rounded-xl"></div>
            <button
              onClick={() => setShowScanner(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Close Scanner
            </button>
          </div>
        )}
      </div>

      {/* Verification Error */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/40 text-red-300 flex items-start gap-4">
          <ShieldX size={28} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-white text-base">Verification Failed: Invalid Credential</h3>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-xs text-slate-400 mt-2">
              Note: If this certificate was recently issued, ensure the entire UUID or certificate number was copied correctly.
            </p>
          </div>
        </div>
      )}

      {/* Verification Success Result Dossier */}
      {verificationResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Status Banner */}
          <div className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${
            verificationResult.verified
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : verificationResult.isRevoked
              ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              : 'bg-red-950/40 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                verificationResult.verified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {verificationResult.verified ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 inline-block mb-1">
                  OFFICIAL AUDIT STATUS
                </span>
                <h2 className="text-xl font-black text-white">
                  {verificationResult.verified
                    ? 'AUTHENTIC CERTIFICATE VERIFIED'
                    : verificationResult.isRevoked
                    ? 'CREDENTIAL REVOKED BY AUTHORITY'
                    : 'CRYPTOGRAPHIC INTEGRITY MISMATCH'}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Verification Timestamp</span>
              <span className="text-xs font-mono font-semibold text-slate-300">
                {new Date(verificationResult.verificationTimestamp).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 space-y-6">
            {/* Grid of Trainee & Course Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} className="text-cyan-400" />
                  <span>Certified Trainee Details</span>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white">
                    {verificationResult.certificate.traineeName}
                  </p>
                  <p className="text-xs text-slate-400">
                    Employee ID: <span className="font-mono text-slate-300">{verificationResult.certificate.employeeId || 'N/A'}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Department: <span className="text-slate-300">{verificationResult.certificate.department || 'Heavy Machinery'}</span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Award size={14} className="text-amber-400" />
                  <span>Credential & Examination</span>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-white">
                    {verificationResult.certificate.moduleTitle}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      Score: {verificationResult.certificate.score}%
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                      Status: {verificationResult.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Security Details */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Hash size={14} className="text-cyan-400" />
                <span>Cryptographic Audit Proof</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">SHA-256 Tamper-Proof Seal:</span>
                  <p className="font-mono text-cyan-300 break-all bg-slate-900 p-2 rounded border border-slate-800 mt-0.5">
                    {verificationResult.certificate.tamperHash}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-400">
                  <p>Certificate Number: <span className="font-mono text-white">{verificationResult.certificate.certNumber}</span></p>
                  <p>Issue Date: <span className="text-white">{verificationResult.certificate.issueDate}</span></p>
                  <p>Expiry Date: <span className="text-white">{verificationResult.certificate.expiryDate}</span></p>
                  <p>Standards: <span className="text-white">{verificationResult.certificate.standard}</span></p>
                </div>
              </div>
            </div>

            {/* Issuing Authority Seal */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Building size={14} className="text-slate-500" />
                <span>Authority: {verificationResult.certificate.authority}</span>
              </div>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Official Record Sealed</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

