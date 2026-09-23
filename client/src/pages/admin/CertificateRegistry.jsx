import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  Lock, 
  Unlock,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CertificateRegistry({ onViewCert, onVerifyClick }) {
  const { token, user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCerts();
  }, [token]);

  const handleRevoke = async (id) => {
    if (!window.confirm('Are you sure you want to revoke this certificate? Its QR code will flag as REVOKED on the public auditor portal.')) return;
    try {
      const res = await fetch(`/api/certificates/${id}/revoke`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        loadCerts();
      }
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
      if (res.ok) {
        loadCerts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCerts = certificates.filter(c =>
    (c.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.cert_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.module_title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              NATIONAL CREDENTIAL REGISTRY & AUDIT
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Master Certification Ledger</h1>
          <p className="text-xs text-slate-400">
            Cryptographically sealed certificates with public QR verification and regulatory revocation controls.
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

      {/* Filter / Search */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
        <Search className="text-slate-400 ml-2" size={16} />
        <input
          type="text"
          placeholder="Filter by Trainee Name, Certificate Number, or Module Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Ledger Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p>Loading certificate ledger...</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Certificate Number</th>
                <th className="p-4">Trainee / Recipient</th>
                <th className="p-4">Curriculum Module</th>
                <th className="p-4 text-center">Score</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredCerts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-cyan-400">
                    {c.cert_number}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">{c.user_name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{c.employee_id}</div>
                  </td>
                  <td className="p-4 text-slate-300 max-w-xs truncate">{c.module_title}</td>
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
                        onClick={() => onViewCert(c)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        title="View Certificate"
                      >
                        <FileText size={14} />
                      </button>

                      <button
                        onClick={() => onVerifyClick(c.id)}
                        className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 border border-cyan-800/40 transition cursor-pointer"
                        title="Simulate Public QR Verification"
                      >
                        <ExternalLink size={14} />
                      </button>

                      {user?.role === 'admin' && (
                        c.status === 'valid' ? (
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
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

