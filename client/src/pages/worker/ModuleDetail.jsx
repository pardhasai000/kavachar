import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Box, 
  Award, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import ARSimulation from './ARSimulation';
import AssessmentTest from './AssessmentTest';
import { useAuth } from '../../context/AuthContext';

export default function ModuleDetail({ moduleId, onBack, onViewCert }) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sop'); // 'sop' | 'sim' | 'exam'

  useEffect(() => {
    async function loadModule() {
      try {
        const res = await fetch(`/api/modules/${moduleId}`, {
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
    }
    loadModule();
  }, [moduleId, token]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p>Loading course modules...</p>
      </div>
    );
  }

  if (!data || !data.module) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
        <p>Module not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-xs">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { module, simulation, userProgress } = data;
  const isSimPassed = userProgress?.simRecord?.passed;
  const isExamPassed = userProgress?.examRecord?.passed;

  return (
    <div className="space-y-6">
      {/* Top Navigation & Module Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Back to All Modules"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {module.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">Standard: ISO 45001</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{module.title}</h1>
          </div>
        </div>

        {/* Milestone Steps Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sop')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'sop' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>1. Safety SOP</span>
          </button>

          <button
            onClick={() => setActiveTab('sim')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'sim' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box size={14} />
            <span>2. 3D / AR Simulation</span>
            {isSimPassed && <CheckCircle2 size={13} className="text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'exam' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award size={14} />
            <span>3. Examination</span>
            {isExamPassed && <CheckCircle2 size={13} className="text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Tab 1: SOP Protocol & Theory */}
      {activeTab === 'sop' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-400" />
              <span>Standard Operating Procedures (SOP Document)</span>
            </h2>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4 whitespace-pre-line leading-relaxed font-sans">
              {module.sop_content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveTab('sim')}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition cursor-pointer"
              >
                <span>Proceed to 3D Simulation Drill</span>
                <Box size={14} />
              </button>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Curriculum Requirements
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-semibold text-white">{module.duration}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Simulation Passing Mark:</span>
                  <span className="font-semibold text-cyan-400">80% Precision</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Exam Passing Criteria:</span>
                  <span className="font-semibold text-amber-400">80% Minimum</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Credential Issued:</span>
                  <span className="font-semibold text-emerald-400">Cryptographic Seal</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-2 text-xs text-amber-200">
              <div className="font-bold flex items-center gap-2 text-amber-400">
                <AlertTriangle size={15} />
                <span>Statutory Compliance Notice</span>
              </div>
              <p className="leading-relaxed">
                Under the National Factories Act and OSHA guidelines, trainees must practice in the AR simulation environment prior to taking the standardized exam.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 3D / AR Simulation */}
      {activeTab === 'sim' && (
        <ARSimulation
          moduleId={module.id}
          onComplete={(simResult) => {
            setActiveTab('exam');
          }}
        />
      )}

      {/* Tab 3: Competency Exam */}
      {activeTab === 'exam' && (
        <AssessmentTest
          moduleId={module.id}
          onCertIssued={(cert) => {
            onViewCert(cert.id);
          }}
        />
      )}
    </div>
  );
}

