import React, { useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Building2, 
  QrCode,
  Calendar,
  Languages
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { translations } from '../../utils/translations';

export default function MineCertificate({ certificate, selectedLang, selectedMine, onVerifyClick }) {
  const t = translations[selectedLang] || translations.en;
  const certRef = useRef(null);

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
      pdf.save(`DGMS-Mine-Safety-Certificate-${certificate?.cert_number || '2026'}.pdf`);
    } catch (e) {
      window.print();
    }
  };

  const minerName = certificate?.user_name || 'Rajesh Kumar';
  const certNumber = certificate?.cert_number || 'DGMS-CMR-2026-JH-9410';
  const mineName = certificate?.mineName || selectedMine?.name || 'Jharia Underground Coalfield Pit #4';
  const score = certificate?.score || 100;
  const issueDate = certificate?.issue_date || new Date().toISOString().split('T')[0];
  const qrCode = certificate?.qr_code;
  const certId = certificate?.id || 'c7e849b2-38b4-4b51-9318-7a523b499182';
  const tamperHash = certificate?.tamper_hash || '3fa85f6457174e14be2340578864703a9f';

  const getLangLabel = () => {
    if (selectedLang === 'hi') return 'हिंदी (Hindi)';
    if (selectedLang === 'sat') return 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)';
    return 'English';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & PDF Download */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            DGMS STATUTORY MINING CREDENTIAL VALID
          </span>
          <span className="text-xs text-slate-400 font-mono">({certNumber})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition cursor-pointer"
          >
            <Download size={14} />
            <span>{t.downloadPdf}</span>
          </button>

          <button
            onClick={() => onVerifyClick(certId)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>{t.verifyPublicly}</span>
          </button>
        </div>
      </div>

      {/* Printable DGMS Certificate Frame */}
      <div className="flex justify-center">
        <div
          ref={certRef}
          className="w-full max-w-4xl bg-[#fffefc] text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl border-8 border-double border-amber-950/40 relative overflow-hidden select-none font-serif"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.04) 0%, transparent 80%)'
          }}
        >
          {/* Border security guilloche */}
          <div className="absolute inset-2 border-2 border-amber-900/30 pointer-events-none rounded"></div>
          <div className="absolute inset-3 border border-amber-800/20 pointer-events-none rounded"></div>

          {/* Watermark Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <ShieldCheck size={480} className="text-amber-950" />
          </div>

          {/* Header */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-amber-900/10 border-2 border-amber-900 flex items-center justify-center shadow-md">
                <ShieldCheck size={28} className="text-amber-950" />
              </div>
            </div>

            <h4 className="text-[11px] uppercase tracking-[0.3em] font-sans font-black text-amber-950/90">
              Government of Jharkhand • Department of Mines & Geology
            </h4>
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-600 mt-0.5">
              Directorate General of Mines Safety (DGMS) • Dhanbad, Jharkhand
            </h5>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 uppercase tracking-wider font-serif">
              Colliery Disaster Safety Credential
            </h1>
            <p className="text-[11px] font-sans font-semibold text-slate-600 uppercase tracking-widest mt-1">
              {t.certSub} • Government of Jharkhand State Mining Compliance
            </p>
            <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-amber-900 to-transparent mx-auto mt-3"></div>
          </div>

          {/* Body */}
          <div className="text-center mt-7 relative z-10 font-sans">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              {t.certBody1}
            </p>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif text-amber-950 underline decoration-amber-800/30 underline-offset-8">
              {minerName}
            </h2>

            <p className="text-xs text-slate-700 mt-3 max-w-2xl mx-auto leading-relaxed">
              {t.certBody2}
            </p>

            <div className="mt-4 inline-block px-5 py-2.5 bg-amber-500/10 border border-amber-800/30 rounded-xl">
              <div className="flex items-center gap-2 justify-center font-bold text-slate-900 text-sm sm:text-base">
                <Building2 size={18} className="text-amber-900" />
                <span>{mineName}</span>
              </div>
              <div className="flex items-center gap-3 justify-center text-[11px] text-slate-600 mt-1">
                <span>Training Language: <strong className="text-amber-950 font-bold">{getLangLabel()}</strong></span>
                <span>•</span>
                <span>Standard: <strong>Coal Mines Regulations 2017</strong></span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Competency Score: <strong className="text-amber-950">{score}%</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Date: <strong>{issueDate}</strong>
              </span>
              <span className="px-3 py-1 bg-slate-100 rounded border border-slate-200">
                Disaster Drills: <strong>Gas Leak & Fire Explosion</strong>
              </span>
            </div>
          </div>

          {/* Signatures & Dynamic QR */}
          <div className="mt-8 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10 font-sans">
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 mb-1">Dr. V. K. Sharma</div>
              <div className="w-36 h-px bg-slate-400 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Director General of Mines Safety</p>
              <p className="text-[9px] text-slate-400">DGMS Headquarters, Dhanbad</p>
            </div>

            <div className="text-center flex flex-col items-center">
              {qrCode ? (
                <div className="p-1 bg-white border border-slate-300 rounded shadow-md">
                  <img src={qrCode} alt="DGMS QR Code" className="w-24 h-24" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-400">
                  <QrCode size={36} />
                </div>
              )}
              <div className="mt-2 text-[8px] font-mono text-slate-500 max-w-[220px] break-all leading-tight">
                SHA-256: {tamperHash.substring(0, 20)}...
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-1">
                Cryptographically Sealed
              </span>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 mb-1">Er. Ananya Patil</div>
              <div className="w-36 h-px bg-slate-400 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Colliery Safety Agent</p>
              <p className="text-[9px] text-slate-400">{mineName.split(' ')[0]} Area Office</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

