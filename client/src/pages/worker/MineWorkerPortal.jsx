import React, { useState } from 'react';
import { 
  Building2, 
  Wind, 
  Flame, 
  FileCheck2, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HardHat,
  Play
} from 'lucide-react';
import MineSimulations from './MineSimulations';
import MineAssignment from './MineAssignment';
import MineCertificate from './MineCertificate';
import { translations } from '../../utils/translations';
import { useAuth } from '../../context/AuthContext';

export default function MineWorkerPortal({ 
  selectedLang, 
  selectedMine, 
  onSwitchMine, 
  onSwitchLang,
  onVerifyClick 
}) {
  const { user } = useAuth();
  const t = translations[selectedLang] || translations.en;

  // Active subtab: 'overview' | 'gas' | 'fire' | 'assignment' | 'certificate'
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [clearedDrills, setClearedDrills] = useState({ gas: false, fire: false });
  const [earnedCertificate, setEarnedCertificate] = useState(null);

  const handleDrillDone = (type) => {
    setClearedDrills(prev => ({ ...prev, [type]: true }));
  };

  const getMineName = () => {
    if (!selectedMine) return 'Jharia Coalfield';
    if (selectedLang === 'hi') return selectedMine.nameHi;
    if (selectedLang === 'sat') return selectedMine.nameSat;
    return selectedMine.name;
  };

  return (
    <div className="space-y-6">
      {/* Top Colliery & Navigation Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-600/20">
            <HardHat size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {t.workerRole}
              </span>
              <span className="text-xs text-slate-400">ID: {user?.employee_id || 'WRK-4107'}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
              {getMineName()}
            </h2>
          </div>
        </div>

        {/* Change Mine / Language controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onSwitchMine}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <Building2 size={13} />
            <span>{t.switchMine}</span>
          </button>

          <button
            onClick={onSwitchLang}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            <span>{t.switchLang}</span>
          </button>
        </div>
      </div>

      {/* Workflow Tabs (Overview -> Gas Leak -> Fire Explosion -> Assignment -> Certificate) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer shrink-0 ${
            activeSubTab === 'overview'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {t.navOverview}
        </button>

        <button
          onClick={() => setActiveSubTab('gas')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeSubTab === 'gas'
              ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Wind size={14} />
          <span>1. {t.navGasLeak}</span>
          {clearedDrills.gas && <CheckCircle2 size={13} className="text-emerald-300" />}
        </button>

        <button
          onClick={() => setActiveSubTab('fire')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeSubTab === 'fire'
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Flame size={14} />
          <span>2. {t.navFireExplosion}</span>
          {clearedDrills.fire && <CheckCircle2 size={13} className="text-emerald-300" />}
        </button>

        <button
          onClick={() => setActiveSubTab('assignment')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeSubTab === 'assignment'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 size={14} />
          <span>3. {t.navAssignment}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('certificate')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeSubTab === 'certificate'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Award size={14} />
          <span>4. {t.navCertificate}</span>
        </button>
      </div>

      {/* Subtab 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-blue-950/50 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-2xl font-black text-white">
              Underground Safety Competency Track
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Under Coal Mines Regulations (CMR 2017) and DGMS directives, every miner at <strong>{getMineName()}</strong> must complete the interactive 3D simulations of <strong>Gas Inrush</strong> and <strong>Fire & Coal Dust Explosion</strong> before taking the qualifying examination.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveSubTab('gas')}
                className="px-5 py-2.5 rounded-xl bg-lime-600 hover:bg-lime-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-lime-600/20 transition cursor-pointer"
              >
                <Wind size={15} />
                <span>Start 3D Gas Leak Drill</span>
              </button>

              <button
                onClick={() => setActiveSubTab('fire')}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-600/20 transition cursor-pointer"
              >
                <Flame size={15} />
                <span>Start 3D Fire & Explosion Drill</span>
              </button>
            </div>
          </div>

          {/* Cards for Gas and Fire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Gas Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400">
                    <Wind size={20} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    clearedDrills.gas ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {clearedDrills.gas ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{t.gasLeakTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identify Methane inrush and Carbon Monoxide toxic build-up using the Methanometer. Don the SCSR oxygen apparatus within 60s and deploy ventilation curtains.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('gas')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-lime-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Play size={14} />
                <span>Enter 3D Gas Drill</span>
              </button>
            </div>

            {/* Fire Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Flame size={20} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    clearedDrills.fire ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {clearedDrills.fire ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{t.fireTitle}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Suppress spontaneous coal combustion and arrest coal dust explosion shockwaves using overhead stone-dust barriers, foam cannons, and refuge chambers.
                </p>
              </div>

              <button
                onClick={() => setActiveSubTab('fire')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Play size={14} />
                <span>Enter 3D Fire Drill</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Gas Leak 3D Simulation */}
      {activeSubTab === 'gas' && (
        <MineSimulations
          selectedLang={selectedLang}
          selectedMine={selectedMine}
          activeDrill="gas"
          onDrillComplete={(drill) => handleDrillDone(drill)}
          onNavigateToAssignment={() => setActiveSubTab('assignment')}
        />
      )}

      {/* Subtab 3: Fire & Explosion 3D Simulation */}
      {activeSubTab === 'fire' && (
        <MineSimulations
          selectedLang={selectedLang}
          selectedMine={selectedMine}
          activeDrill="fire"
          onDrillComplete={(drill) => handleDrillDone(drill)}
          onNavigateToAssignment={() => setActiveSubTab('assignment')}
        />
      )}

      {/* Subtab 4: Multilingual Competency Assignment */}
      {activeSubTab === 'assignment' && (
        <MineAssignment
          selectedLang={selectedLang}
          selectedMine={selectedMine}
          onCertGenerated={(cert) => {
            setEarnedCertificate(cert);
            setActiveSubTab('certificate');
          }}
        />
      )}

      {/* Subtab 5: DGMS Certificate */}
      {activeSubTab === 'certificate' && (
        <MineCertificate
          certificate={earnedCertificate}
          selectedLang={selectedLang}
          selectedMine={selectedMine}
          onVerifyClick={onVerifyClick}
        />
      )}
    </div>
  );
}

