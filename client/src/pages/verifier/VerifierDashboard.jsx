import React, { useState } from 'react';
import { 
  ScanLine, 
  ShieldCheck, 
  Search, 
  Camera, 
  FileCheck2, 
  AlertTriangle,
  Building,
  CheckCircle2
} from 'lucide-react';
import VerifyCertificate from '../public/VerifyCertificate';

export default function VerifierDashboard({ onSelectCertId }) {
  return (
    <div className="space-y-6">
      {/* Auditor Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/40 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center shrink-0">
              <ScanLine size={28} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                OFFICIAL AUDITOR TERMINAL
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                Field Inspection & QR Verification Station
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Authorized for real-time cryptographic validation of plant operator certifications under Factories Act & ISO 45001.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live QR Verification & Scanner */}
      <VerifyCertificate />
    </div>
  );
}

