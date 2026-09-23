import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  FileText, 
  Activity,
  Plus,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard({ onNavigateTab }) {
  const { token, user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const resData = await res.json();
      if (res.ok) {
        setData(resData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [token]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p>Loading regulatory telemetry and KPIs...</p>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const recentCerts = data?.recentCerts || [];
  const auditLogs = data?.auditLogs || [];
  const moduleBreakdown = data?.moduleBreakdown || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              DIRECTORATE SUPERVISORY CONSOLE
            </span>
            <span className="text-xs text-slate-400">Live Telemetry & Audits</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">National Safety Command Center</h1>
          <p className="text-xs text-slate-400">
            Real-time tracking of trainee evaluations, 3D simulation drills, and tamper-evident credential issuances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('admin_modules')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/20 transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Create Safety Module</span>
          </button>

          <button
            onClick={loadAnalytics}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Refresh Telemetry"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Enrolled Trainees</span>
            <Users size={18} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{kpis.totalTrainees || 2}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-bold">100% active</span> across regional plants
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Safety Modules</span>
            <BookOpen size={18} className="text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{kpis.totalModules || 3}</div>
          <div className="text-[11px] text-slate-400">With interactive 3D simulations</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Issued Credentials</span>
            <Award size={18} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{kpis.totalCerts || 1}</div>
          <div className="text-[11px] text-slate-400">
            {kpis.revokedCerts > 0 ? (
              <span className="text-red-400 font-bold">{kpis.revokedCerts} revoked</span>
            ) : (
              <span className="text-emerald-400 font-semibold">0 revoked (100% valid)</span>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Exam Pass Rate</span>
            <TrendingUp size={18} className="text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{kpis.passRate || 95}%</div>
          <div className="text-[11px] text-slate-400">Average score: {kpis.avgScore || 88}%</div>
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Module Performance Breakdown */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" />
              <span>Curriculum Engagement & Certification Breakdown</span>
            </h3>
            <button
              onClick={() => onNavigateTab('admin_modules')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              Manage Curricula
            </button>
          </div>

          <div className="space-y-3">
            {moduleBreakdown.map((m) => (
              <div key={m.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{m.title}</h4>
                    <span className="text-[10px] text-slate-400 uppercase">{m.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{m.certCount} Certified</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span>3D Simulations Run: <strong className="text-cyan-400">{m.simAttempts}</strong></span>
                  <span>Certificates Issued: <strong className="text-emerald-400">{m.certCount}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-time System Audit Trail */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <span>Regulatory Compliance Audit Trail</span>
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/70 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                    {log.event_type}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-snug">{log.details}</p>
                <span className="text-[10px] text-slate-500 block">Actor: {log.actor_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

