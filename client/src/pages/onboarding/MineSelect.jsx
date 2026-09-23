import React from 'react';
import { 
  Building2, 
  MapPin, 
  AlertTriangle, 
  Check, 
  ArrowRight, 
  Layers, 
  HardHat, 
  UserCheck,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { translations, MINES_CATALOG } from '../../utils/translations';

export default function MineSelect({ selectedLang, selectedMine, onSelectMine, onBackToLang, onEnterPortal }) {
  const t = translations[selectedLang] || translations.en;

  const getMineName = (mine) => {
    if (selectedLang === 'hi') return mine.nameHi;
    if (selectedLang === 'sat') return mine.nameSat;
    return mine.name;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onBackToLang}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer bg-slate-900 px-3 py-1 rounded-full border border-slate-800"
          >
            <ArrowLeft size={13} />
            <span>{t.switchLang}</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.selectMineTitle}
        </h1>

        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          {t.selectMineSubtitle}
        </p>
      </div>

      {/* Mine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {MINES_CATALOG.map((mine) => {
          const isSelected = selectedMine?.id === mine.id;
          return (
            <div
              key={mine.id}
              onClick={() => onSelectMine(mine)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/40'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {getMineName(mine)}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{mine.company}</p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-700'
                  }`}>
                    {isSelected && <Check size={12} />}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={13} className="text-slate-500 shrink-0" />
                  <span>{mine.location}</span>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      {t.depth}
                    </span>
                    <span className="font-mono font-bold text-slate-200">{mine.depth}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      {t.riskLevel}
                    </span>
                    <span className="font-bold text-amber-400">{mine.hazardRating}</span>
                  </div>
                </div>

                {/* Primary Hazard */}
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40 text-[11px] text-red-300 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>{t.hazardType}:</strong> {mine.hazardType}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 3: Choose Panel Access */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider text-center">
          {t.selectRoleTitle} ({getMineName(selectedMine)})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onEnterPortal('worker')}
            className="p-5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-left shadow-lg shadow-cyan-600/20 transition cursor-pointer flex items-start gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-black/20 shrink-0">
              <HardHat size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold flex items-center gap-1.5">
                <span>{t.workerRole}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </h4>
              <p className="text-xs text-cyan-100/80 font-normal mt-1 leading-snug">
                {t.workerRoleDesc}
              </p>
            </div>
          </button>

          <button
            onClick={() => onEnterPortal('admin')}
            className="p-5 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-left shadow-lg shadow-purple-700/20 transition cursor-pointer flex items-start gap-3.5 group"
          >
            <div className="p-2.5 rounded-xl bg-black/20 shrink-0">
              <UserCheck size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold flex items-center gap-1.5">
                <span>{t.adminRole}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </h4>
              <p className="text-xs text-purple-100/80 font-normal mt-1 leading-snug">
                {t.adminRoleDesc}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

