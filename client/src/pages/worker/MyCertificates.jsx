import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Download, ExternalLink, Calendar, FileText, QrCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MyCertificates({ onSelectCertificate, onVerifyClick }) {
  const { token, user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCerts() {
      try {
        const res = await fetch('/api/certificates/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setCertificates(data.certificates || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCerts();
  }, [token]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p>Loading your earned safety credentials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SAFETY WALLET & CREDENTIALS
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">My Technical Certifications</h1>
          <p className="text-xs text-slate-400">
            Official cryptographically verified credentials issued by PS-41 Industrial Directorate.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <Award size={40} className="mx-auto mb-3 text-slate-600" />
          <h3 className="text-base font-bold text-white">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Complete the 3D/AR industrial drill and score 80% or higher on the examination to receive your official credential.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-xl transition space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Award size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {cert.cert_number}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">{cert.module_title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Awarded to: {cert.user_name}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  cert.status === 'valid'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {cert.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Exam Score</span>
                  <span className="font-bold text-emerald-400">{cert.score}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Issued</span>
                  <span className="font-semibold text-slate-300">{cert.issue_date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Expires</span>
                  <span className="font-semibold text-slate-300">{cert.expiry_date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onSelectCertificate(cert)}
                  className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <FileText size={14} />
                  <span>View & Print</span>
                </button>

                <button
                  onClick={() => onVerifyClick(cert.id)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="Verify on Public Audit Portal"
                >
                  <QrCode size={14} />
                  <span>Verify</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

