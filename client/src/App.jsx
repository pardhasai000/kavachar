import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import LanguageSelect from './pages/onboarding/LanguageSelect';
import MineSelect from './pages/onboarding/MineSelect';
import MineWorkerPortal from './pages/worker/MineWorkerPortal';
import MineAdminDashboard from './pages/admin/MineAdminDashboard';
import VerifyCertificate from './pages/public/VerifyCertificate';
import { MINES_CATALOG } from './utils/translations';
import { ShieldCheck, ChevronRight, Languages, Building2, HardHat, UserCheck, QrCode } from 'lucide-react';

function MiningApp() {
  const { user, demoLogin } = useAuth();

  // 1. Language State: 'en' | 'hi' | 'sat'
  const [selectedLang, setSelectedLang] = useState(() => localStorage.getItem('ps41_lang') || 'en');
  
  // 2. Mine State: defaults to Jharia Coalfield
  const [selectedMine, setSelectedMine] = useState(() => {
    const saved = localStorage.getItem('ps41_mine_id');
    return MINES_CATALOG.find(m => m.id === saved) || MINES_CATALOG[0];
  });

  // 3. Workflow Stage: 'onboarding_lang' | 'onboarding_mine' | 'portal' | 'verify'
  const [currentStage, setCurrentStage] = useState(() => {
    const hasLang = localStorage.getItem('ps41_lang');
    const hasMine = localStorage.getItem('ps41_mine_id');
    if (!hasLang) return 'onboarding_lang';
    if (!hasMine) return 'onboarding_mine';
    return 'portal';
  });

  // 4. Active Portal: 'worker' | 'admin'
  const [activePortal, setActivePortal] = useState('worker');
  const [verifyCertId, setVerifyCertId] = useState('');

  // Handle URL path /verify/:certId
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/verify/')) {
      const id = path.replace('/verify/', '');
      if (id) {
        setVerifyCertId(id);
        setCurrentStage('verify');
      }
    }
  }, []);

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem('ps41_lang', lang);
  };

  const handleSelectMine = (mine) => {
    setSelectedMine(mine);
    localStorage.setItem('ps41_mine_id', mine.id);
  };

  const handleEnterPortal = (role) => {
    setActivePortal(role);
    if (role === 'admin') {
      demoLogin('usr_admin_1');
    } else {
      demoLogin('usr_worker_1');
    }
    setCurrentStage('portal');
  };

  const handleSwitchPortal = (portal) => {
    setActivePortal(portal);
    setCurrentStage('portal');
    if (portal === 'admin') {
      demoLogin('usr_admin_1');
    } else {
      demoLogin('usr_worker_1');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar
          currentStage={currentStage}
          selectedLang={selectedLang}
          onSelectLang={handleSelectLang}
          selectedMine={selectedMine}
          onSwitchMine={() => setCurrentStage('onboarding_mine')}
          activePortal={currentStage === 'portal' ? activePortal : null}
          onSwitchPortal={handleSwitchPortal}
          onOpenQRScanner={() => setCurrentStage('verify')}
        />

        {/* Stepper Flow Header Bar */}
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-400">
              <span>PS-41 Mining Safety Flow:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
              {/* Step 1: Language */}
              <button
                onClick={() => setCurrentStage('onboarding_lang')}
                className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 cursor-pointer ${
                  currentStage === 'onboarding_lang'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Languages size={12} />
                <span>1. Language ({selectedLang.toUpperCase()})</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />

              {/* Step 2: Mine Selection */}
              <button
                onClick={() => setCurrentStage('onboarding_mine')}
                className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 cursor-pointer ${
                  currentStage === 'onboarding_mine'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Building2 size={12} />
                <span>2. Select Mine</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />

              {/* Step 3: Worker Panel */}
              <button
                onClick={() => handleSwitchPortal('worker')}
                className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 cursor-pointer ${
                  currentStage === 'portal' && activePortal === 'worker'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <HardHat size={12} />
                <span>3. Worker Panel (Gas & Fire 3D)</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />

              {/* Step 4: Admin Panel */}
              <button
                onClick={() => handleSwitchPortal('admin')}
                className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 cursor-pointer ${
                  currentStage === 'portal' && activePortal === 'admin'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <UserCheck size={12} />
                <span>4. Admin Panel</span>
              </button>
              <ChevronRight size={12} className="text-slate-600" />

              {/* Step 5: QR Verification */}
              <button
                onClick={() => setCurrentStage('verify')}
                className={`px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 cursor-pointer ${
                  currentStage === 'verify'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <QrCode size={12} />
                <span>5. QR Verification</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Main Stage View */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stage 1: Select Language */}
          {currentStage === 'onboarding_lang' && (
            <LanguageSelect
              selectedLang={selectedLang}
              onSelectLang={handleSelectLang}
              onContinue={() => setCurrentStage('onboarding_mine')}
            />
          )}

          {/* Stage 2: Select Mine */}
          {currentStage === 'onboarding_mine' && (
            <MineSelect
              selectedLang={selectedLang}
              selectedMine={selectedMine}
              onSelectMine={handleSelectMine}
              onBackToLang={() => setCurrentStage('onboarding_lang')}
              onEnterPortal={handleEnterPortal}
            />
          )}

          {/* Stage 3: Active Portal View */}
          {currentStage === 'portal' && activePortal === 'worker' && (
            <MineWorkerPortal
              selectedLang={selectedLang}
              selectedMine={selectedMine}
              onSwitchMine={() => setCurrentStage('onboarding_mine')}
              onSwitchLang={() => setCurrentStage('onboarding_lang')}
              onVerifyClick={(certId) => {
                setVerifyCertId(certId);
                setCurrentStage('verify');
              }}
            />
          )}

          {currentStage === 'portal' && activePortal === 'admin' && (
            <MineAdminDashboard
              selectedLang={selectedLang}
              onVerifyClick={(certId) => {
                setVerifyCertId(certId);
                setCurrentStage('verify');
              }}
            />
          )}

          {/* Stage 4: QR Verification Portal */}
          {currentStage === 'verify' && (
            <div className="space-y-4">
              <button
                onClick={() => setCurrentStage('portal')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                ← Back to Portal
              </button>
              <VerifyCertificate initialCertId={verifyCertId} />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span className="font-semibold text-white">PS-41 Directorate General of Mines Safety (DGMS)</span>
            <span>• Coal Mines Regulations (CMR 2017)</span>
          </div>
          <div>
            <span>English • हिंदी (Hindi) • ᱥᱟᱱᱛᱟᱲᱤ (Santali) • SHA-256 Tamper-Proof Cryptography</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MiningApp />
    </AuthProvider>
  );
}
