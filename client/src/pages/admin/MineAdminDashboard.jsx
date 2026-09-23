import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  Wind, 
  Flame, 
  Lock, 
  Unlock, 
  ExternalLink, 
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { translations, MINES_CATALOG } from '../../utils/translations';
import { useAuth } from '../../context/AuthContext';

export default function MineAdminDashboard({ selectedLang, onVerifyClick }) {
  const { token } = useAuth();
  const t = translations[selectedLang] || translations.en;

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilterMine, setSelectedFilterMine] = useState('all');

  const loadCerts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/certificates/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setCertificates(data.certificates || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCerts();
  }, [token]);

  const handleRevoke = async (id) => {
    if (!window.confirm('Revoke this miner safety certificate? It will immediately flag as REVOKED on the public auditor portal.')) return;
    try {
      const res = await fetch(`/api/certificates/${id}/revoke`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) loadCerts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleReinstate = async (id) => {
    try {
      const res = await fetch(`/api/certificates/${id}/reinstate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) loadCerts();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = certificates.filter(c => {
    if (selectedFilterMine === 'all') return true;
    return (c.module_title || '').toLowerCase().includes(selectedFilterMine.toLowerCase()) ||
           (c.user_name || '').toLowerCase().includes(selectedFilterMine.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              DGMS SAFETY SUPERVISORY CONSOLE
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">{t.adminDashboardTitle}</h1>
          <p className="text-xs text-slate-400">
            {t.adminSubtitle}
          </p>
        </div>

        <button
          onClick={loadCerts}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="Refresh Ledger"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-bold">
            <span>{t.totalMiners}</span>
            <Users size={18} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">48 Miners</div>
          <p className="text-[11px] text-slate-400">Across 4 major coalfields</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-bold">
            <span>Gas Leak Drills</span>
            <Wind size={18} className="text-lime-400" />
          </div>
          <div className="text-3xl font-black text-lime-400">42 Passed</div>
          <p className="text-[11px] text-slate-400">CH4 & CO protocol cleared</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-bold">
            <span>Fire & Explosion Drills</span>
            <Flame size={18} className="text-orange-400" />
          </div>
          <div className="text-3xl font-black text-orange-400">39 Passed</div>
          <p className="text-[11px] text-slate-400">Stone-dust & refuge chamber</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-bold">
            <span>{t.certsIssued}</span>
            <Award size={18} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{certificates.length}</div>
          <p className="text-[11px] text-slate-400">DGMS Verified with QR</p>
        </div>
      </div>

      {/* Language Adoption Breakdown Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Language & Tribal Workforce Adoption Telemetry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</span>
              <span className="text-[10px] text-slate-400">Jharkhand / Raniganj belt</span>
            </div>
            <span className="text-base font-black text-cyan-400">46% (22 Miners)</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">हिंदी (Hindi)</span>
              <span className="text-[10px] text-slate-400">Singrauli / Korba pits</span>
            </div>
            <span className="text-base font-black text-amber-400">38% (18 Miners)</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">English</span>
              <span className="text-[10px] text-slate-400">Supervisory staff</span>
            </div>
            <span className="text-base font-black text-purple-400">16% (8 Miners)</span>
          </div>
        </div>
      </div>

      {/* Filter by Mine */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2 text-xs">
          <Building2 size={16} className="text-slate-400" />
          <span className="font-semibold text-slate-300">Filter by Colliery:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setSelectedFilterMine('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedFilterMine === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Mines
          </button>

          {MINES_CATALOG.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedFilterMine(m.name.split(' ')[0])}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                selectedFilterMine === m.name.split(' ')[0]
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Master Certificate Registry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider">
            DGMS Issued Credential Master Ledger
          </h3>
          <span className="text-xs text-slate-400">{filtered.length} Records</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Certificate ID</th>
              <th className="p-4">Miner Name</th>
              <th className="p-4">Mine & Hazardous Track</th>
              <th className="p-4 text-center">Score</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-mono font-bold text-cyan-400">
                  {c.cert_number}
                </td>
                <td className="p-4">
                  <div className="font-bold text-white">{c.user_name}</div>
                  <div className="text-[10px] text-slate-400">{c.employee_id || 'DGMS-MINER'}</div>
                </td>
                <td className="p-4 max-w-xs truncate text-slate-300">
                  {c.module_title}
                </td>
                <td className="p-4 text-center font-bold text-emerald-400">{c.score}%</td>
                <td className="p-4 text-slate-400">{c.issue_date}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    c.status === 'valid'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onVerifyClick(c.id)}
                      className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 border border-cyan-800/40 transition cursor-pointer"
                      title="Verify QR"
                    >
                      <ExternalLink size={14} />
                    </button>

                    {c.status === 'valid' ? (
                      <button
                        onClick={() => handleRevoke(c.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition cursor-pointer"
                        title="Revoke Credential"
                      >
                        <Lock size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReinstate(c.id)}
                        className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/40 transition cursor-pointer"
                        title="Reinstate Credential"
                      >
                        <Unlock size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

