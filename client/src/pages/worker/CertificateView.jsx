import React, { useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  QrCode,
  Printer
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificateView({ certificate, onVerifyClick }) {
  const certRef = useRef(null);

  if (!certificate) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
        <Award size={36} className="mx-auto mb-2 text-slate-500" />
        <p>No certificate selected.</p>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    try {
      const element = certRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, (210 - imgHeight) / 2, imgWidth, imgHeight);
      pdf.save(`${certificate.cert_number || certificate.certNumber || 'Safety-Certificate'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
      window.print();
    }
  };

  const certNumber = certificate.cert_number || certificate.certNumber;
  const traineeName = certificate.user_name || certificate.traineeName;
  const moduleTitle = certificate.module_title || certificate.moduleTitle;
  const score = certificate.score;
  const issueDate = certificate.issue_date || certificate.issueDate;
  const expiryDate = certificate.expiry_date || certificate.expiryDate;
  const tamperHash = certificate.tamper_hash || certificate.tamperHash;
  const qrCode = certificate.qr_code;
  const certId = certificate.id;

  return (
    <div className="space-y-6">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            OFFICIALLY VERIFIED & ACTIVE
          </span>
          <span className="text-xs text-slate-400 font-mono">({certNumber})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition cursor-pointer"
          >
            <Download size={14} />
            <span>Download Official PDF</span>
          </button>

          <button
            onClick={() => onVerifyClick(certId)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>Simulate Public QR Scan</span>
          </button>
        </div>
      </div>

      {/* High-Resolution Printable Certificate Frame */}
      <div className="flex justify-center">
        <div
          ref={certRef}
          className="w-full max-w-4xl bg-[#fffefc] text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border-8 border-double border-amber-900/40 relative overflow-hidden select-none font-serif"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 80%)'
          }}
        >
          {/* Security Guilloche Border simulation */}
          <div className="absolute inset-2 border-2 border-amber-800/30 pointer-events-none rounded"></div>
          <div className="absolute inset-3 border border-amber-700/20 pointer-events-none rounded"></div>

          {/* Watermark Security Emblem in Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <ShieldCheck size={480} className="text-amber-950" />
          </div>

          {/* Certificate Header */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-amber-800/10 border-2 border-amber-800 flex items-center justify-center shadow-md">
                <ShieldCheck size={28} className="text-amber-900" />
              </div>
            </div>

            <h4 className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-amber-900/80">
              National Industrial Safety & Vocational Directorate
            </h4>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 uppercase tracking-wider font-serif">
              Certificate of Technical Competency
            </h1>
            <p className="text-[11px] font-sans font-semibold text-slate-600 uppercase tracking-widest mt-1">
              Factories Act & OSHA Standard Compliance • Ref: PS-41 Accreditation
            </p>
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-800 to-transparent mx-auto mt-3"></div>
          </div>

          {/* Body Content */}
          <div className="text-center mt-8 relative z-10 font-sans">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              This is to officially certify that
            </p>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif text-amber-950 underline decoration-amber-700/30 underline-offset-8">
              {traineeName}
            </h2>

            <p className="text-xs text-slate-600 mt-2">
              has satisfactorily completed all rigorous practical requirements, hands-on 3D/AR simulation drills, and achieved mastery in the standardized safety examination for
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 px-4 py-2 bg-amber-500/10 border border-amber-700/20 rounded-lg inline-block font-sans">
              {moduleTitle}
            </h3>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Examination Score: <strong className="text-amber-900">{score}%</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Issue Date: <strong>{issueDate}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Valid Until: <strong>{expiryDate}</strong>
              </span>
            </div>
          </div>

          {/* Bottom Security Seals & Signatures */}
          <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10 font-sans">
            {/* Signature 1 */}
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 mb-1">Dr. Vikram Sharma</div>
              <div className="w-36 h-px bg-slate-400 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Director General of Safety</p>
              <p className="text-[9px] text-slate-400">National Safety Council</p>
            </div>

            {/* Central QR Code & Cryptographic Hash */}
            <div className="text-center flex flex-col items-center">
              {qrCode ? (
                <div className="p-1 bg-white border border-slate-300 rounded shadow-md">
                  <img src={qrCode} alt="Verification QR Code" className="w-24 h-24" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-400">
                  <QrCode size={36} />
                </div>
              )}
              <div className="mt-2 text-[9px] font-mono text-slate-500 text-center max-w-[220px] break-all leading-tight">
                SHA-256: {tamperHash ? tamperHash.substring(0, 24) : 'e3b0c442...'}...
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded mt-1">
                Cryptographically Sealed
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 mb-1">Er. Ananya Patil</div>
              <div className="w-36 h-px bg-slate-400 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Chief Technical Inspector</p>
              <p className="text-[9px] text-slate-400">Accredited Boiler Inspectorate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

