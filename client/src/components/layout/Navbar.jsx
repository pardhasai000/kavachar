import React from 'react';
import { 
  Shield, 
  Building2, 
  Languages, 
  HardHat, 
  UserCheck, 
  QrCode, 
  LayoutDashboard,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { translations, MINES_CATALOG } from '../../utils/translations';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ 
  currentStage, 
  selectedLang, 
  onSelectLang, 
  selectedMine, 
  onSwitchMine, 
  activePortal, 
  onSwitchPortal, 
  onOpenQRScanner 
}) {
  const { user } = useAuth();
  const t = translations[selectedLang] || translations.en;

  const getMineShortName = () => {
    if (!selectedMine) return 'Select Mine';
    if (selectedLang === 'hi') return selectedMine.nameHi.split(' ')[0];
    if (selectedLang === 'sat') return selectedMine.nameSat.split(' ')[0];
    return selectedMine.name.split(' ')[0];
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
      {/* Top Banner: Stage & Selection Bar */}
      <div className="bg-slate-900/80 px-4 py-1.5 border-b border-slate-800/60 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">Kavach AR • DGMS Mine Safety:</span>
          <span className="hidden sm:inline">Trilingual Industrial Hazard Simulator</span>
        </div>

        {/* Global Controls: Language & Mine Pills */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown / Pills */}
          <div className="flex items-center bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-800 text-[11px]">
            <Languages size={12} className="text-cyan-400 mr-1.5" />
            <button
              onClick={() => onSelectLang('en')}
              className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
                selectedLang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
                selectedLang === 'hi' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onSelectLang('sat')}
              className={`px-1.5 py-0.5 rounded font-bold transition cursor-pointer ${
                selectedLang === 'sat' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ᱥᱟᱱᱛᱟᱲᱤ
            </button>
          </div>

          {/* Mine Switcher Pill */}
          {selectedMine && (
            <button
              onClick={onSwitchMine}
              className="flex items-center gap-1 bg-slate-800/90 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-200 text-xs font-semibold border border-slate-700/60 transition cursor-pointer"
            >
              <Building2 size={12} className="text-amber-400" />
              <span>{getMineShortName()}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => onSwitchPortal(activePortal || 'worker')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white tracking-tight">Kavach AR</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                  DGMS MINE SAFETY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Underground Fire Explosion & Gas Leak Simulation</p>
            </div>
          </div>

          {/* Portal Switcher & Action Tabs */}
          <nav className="flex items-center gap-2">
            {/* Worker Portal Button */}
            <button
              onClick={() => onSwitchPortal('worker')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activePortal === 'worker'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <HardHat size={15} />
              <span>{t.workerRole.split('(')[0].trim()}</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => onSwitchPortal('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activePortal === 'admin'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck size={15} />
              <span>{t.adminRole.split('(')[0].trim()}</span>
            </button>

            {/* QR Scanner */}
            <button
              onClick={onOpenQRScanner}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Verify QR Code"
            >
              <QrCode size={15} />
              <span className="hidden sm:inline">Verify QR</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
