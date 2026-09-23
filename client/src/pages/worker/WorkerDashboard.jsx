import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Box, 
  Award, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Zap, 
  Biohazard, 
  ShieldCheck, 
  ArrowRight,
  HardHat,
  ChevronRight,
  Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function WorkerDashboard({ onLaunchModule, onLaunchSimulation, onLaunchExam, onViewCert }) {
  const { user, token } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/modules', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setModules(data.modules || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame size={20} className="text-amber-400" />;
      case 'Zap': return <Zap size={20} className="text-yellow-400" />;
      case 'Biohazard': return <Biohazard size={20} className="text-emerald-400" />;
      default: return <ShieldCheck size={20} className="text-cyan-400" />;
    }
  };

  const completedSimsCount = modules.filter(m => m.userProgress?.simulationPassed).length;
  const certifiedCount = modules.filter(m => m.userProgress?.certificateIssued).length;

  return (
    <div className="space-y-6">
      {/* Welcome Trainee Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/40 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-cyan-500/10">
              <HardHat size={32} className="text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  TRAINEE & OPERATOR PORTAL
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {user?.employee_id || 'WRK-4107'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Welcome back, {user?.name || 'Trainee'}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Department: <span className="font-semibold text-white">{user?.department || 'Heavy Machinery Operations'}</span> • Safety Compliance Status: <span className="text-emerald-400 font-bold">Active</span>
              </p>
            </div>
          </div>

          {/* Quick Demo CTA */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onLaunchSimulation('mod_boiler_01')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Play size={16} />
              <span>Launch 3D Boiler Drill</span>
            </button>
          </div>
        </div>

        {/* Worker Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Curricula Assigned</span>
            <span className="text-xl font-black text-white mt-0.5 block">{modules.length} Courses</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">3D Drills Cleared</span>
            <span className="text-xl font-black text-cyan-400 mt-0.5 block">{completedSimsCount} / {modules.length}</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Certified Skills</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">{certifiedCount} Credentials</span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase block">Readiness Score</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">98% Compliant</span>
          </div>
        </div>
      </div>

      {/* Training Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-400" />
              <span>Safety Training Curricula (PS-41)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Each module requires reviewing the SOP, completing the interactive 3D/AR simulation, and clearing the certification exam.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading course modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modules.map((mod) => {
              const isSimDone = mod.userProgress?.simulationPassed;
              const isCertDone = mod.userProgress?.certificateIssued;

              return (
                <div
                  key={mod.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                        {getIcon(mod.icon)}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {mod.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition leading-snug">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {mod.duration}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-slate-300">Difficulty: {mod.difficulty}</span>
                    </div>

                    {/* Milestone Progress Indicators */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">3D Simulation:</span>
                        {isSimDone ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Passed ({mod.userProgress.simulationScore}%)
                          </span>
                        ) : (
                          <span className="text-amber-400 font-semibold">Pending Drill</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Certification Exam:</span>
                        {isCertDone ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Certified ({mod.userProgress.assessmentScore}%)
                          </span>
                        ) : (
                          <span className="text-slate-500 font-semibold">Locked until Drill</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
                    {isCertDone ? (
                      <button
                        onClick={() => onViewCert(mod.userProgress.certificateId)}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
                      >
                        <Award size={14} />
                        <span>View Official Certificate</span>
                      </button>
                    ) : isSimDone ? (
                      <button
                        onClick={() => onLaunchExam(mod.id)}
                        className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 transition cursor-pointer"
                      >
                        <Award size={14} />
                        <span>Take Certification Exam</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onLaunchSimulation(mod.id)}
                        className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 transition cursor-pointer"
                      >
                        <Box size={14} />
                        <span>Start 3D / AR Simulation</span>
                      </button>
                    )}

                    <button
                      onClick={() => onLaunchModule(mod.id)}
                      className="w-full py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 font-medium text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <BookOpen size={12} />
                      <span>Review SOP Protocol</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

