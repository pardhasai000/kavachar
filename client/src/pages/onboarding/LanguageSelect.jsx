import React from 'react';
import { Languages, Check, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { translations } from '../../utils/translations';

export default function LanguageSelect({ selectedLang, onSelectLang, onContinue }) {
  const t = translations[selectedLang] || translations.en;

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English (UK / IN)',
      badge: 'Mining Standard',
      icon: '🇬🇧',
      desc: 'Technical terminology, standard DGMS safety regulations and protocols.'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी (Hindi)',
      badge: 'राष्ट्रीय भाषा',
      icon: '🇮🇳',
      desc: 'भारत के प्रमुख कोयला क्षेत्रों (झरिया, सिंगरौली, कोरबा) में व्यापक रूप से प्रयुक्त।'
    },
    {
      code: 'sat',
      name: 'Santali',
      nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki / Santhali)',
      badge: 'ᱠᱷᱟᱫᱟᱱ ᱯᱟᱹᱨᱥᱤ',
      icon: '⛏️',
      desc: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ, ᱳᱰᱤᱥᱟ ᱟᱨ ᱯᱚᱪᱷᱤᱢ ᱵᱟᱝᱞᱟ ᱨᱤᱱ ᱠᱩᱭᱞᱟᱹ ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱨᱮᱱᱤᱝ᱾'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Platform Banner */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Shield size={14} />
          <span>Kavach AR • Directorate General of Mines Safety (DGMS)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {t.selectLanguageTitle}
        </h1>

        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          {t.selectLanguageSubtitle}
        </p>
      </div>

      {/* Language Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {languages.map((lang) => {
          const isSelected = selectedLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/40'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{lang.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {lang.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition">
                  {lang.name}
                </h3>
                <h4 className="text-sm font-semibold text-cyan-400/90 mt-0.5 font-sans">
                  {lang.nativeName}
                </h4>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {lang.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {isSelected ? 'Selected' : 'Select'}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-700'
                }`}>
                  {isSelected && <Check size={14} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue CTA */}
      <div className="text-center">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 mx-auto transition cursor-pointer"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

