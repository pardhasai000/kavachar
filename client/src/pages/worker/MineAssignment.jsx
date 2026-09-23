import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations, ASSIGNMENT_QUESTIONS } from '../../utils/translations';
import { useAuth } from '../../context/AuthContext';

export default function MineAssignment({ selectedLang, selectedMine, onCertGenerated }) {
  const { user, token } = useAuth();
  const t = translations[selectedLang] || translations.en;
  const questions = ASSIGNMENT_QUESTIONS[selectedLang] || ASSIGNMENT_QUESTIONS.en;

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (qId, optionIdx) => {
    if (result) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    let correct = 0;
    const review = [];

    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) correct++;
      review.push({
        ...q,
        isCorrect,
        userAnswer: answers[q.id]
      });
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= 80;

    // Call backend to persist submission & issue official DGMS certificate with QR code!
    let certData = null;
    try {
      const res = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId: 'mod_boiler_01', // maps to primary hazard track
          answers: {
            ...answers,
            mineId: selectedMine?.id,
            mineName: selectedMine?.name,
            language: selectedLang
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        certData = data.certificate;
      }
    } catch (e) {
      console.error(e);
    }

    setResult({
      passed,
      percentage,
      correctCount: correct,
      totalCount: questions.length,
      review,
      certificate: certData
    });

    if (passed) {
      confetti({ particleCount: 130, spread: 90 });
    }
    setSubmitting(false);
  };

  const getMineName = () => {
    if (!selectedMine) return 'Jharia Coalfield';
    if (selectedLang === 'hi') return selectedMine.nameHi;
    if (selectedLang === 'sat') return selectedMine.nameSat;
    return selectedMine.name;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              DGMS MINE SAFETY ACCREDITATION
            </span>
            <span className="text-xs text-slate-400 font-mono">Colliery: {getMineName()}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {t.assignmentTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.assignmentSubtitle}
          </p>
        </div>
      </div>

      {/* If Result Available */}
      {result ? (
        <div className="py-4 space-y-6">
          <div className={`p-6 rounded-2xl border text-center ${
            result.passed
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/30 border-red-500/40 text-red-200'
          }`}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 shadow-lg"
                 style={{ backgroundColor: result.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
              {result.passed ? <Award size={36} className="text-emerald-400" /> : <XCircle size={36} className="text-red-400" />}
            </div>

            <h3 className="text-2xl font-black">
              {result.passed ? t.passedTitle : t.failedTitle}
            </h3>

            <div className="flex items-center justify-center gap-6 mt-4 font-mono">
              <div>
                <span className="text-xs text-slate-400 block uppercase">{t.scoreLabel}</span>
                <span className="text-3xl font-extrabold text-white">{result.percentage}%</span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div>
                <span className="text-xs text-slate-400 block uppercase">Correct</span>
                <span className="text-3xl font-extrabold text-white">{result.correctCount} / {result.totalCount}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {result.passed && (
                <button
                  onClick={() => onCertGenerated({
                    ...result.certificate,
                    mineName: getMineName(),
                    user_name: user?.name || 'Rajesh Kumar (Miner)',
                    score: result.percentage,
                    lang: selectedLang
                  })}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/20 flex items-center gap-2 cursor-pointer transition"
                >
                  <FileCheck2 size={18} />
                  <span>{t.viewCertBtn}</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {!result.passed && (
                <button
                  onClick={() => {
                    setResult(null);
                    setAnswers({});
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition"
                >
                  <RotateCcw size={15} />
                  <span>{t.retryBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Review Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={14} className="text-cyan-400" />
              <span>Question Performance Breakdown:</span>
            </h4>

            {result.review.map((q, idx) => (
              <div key={q.id} className={`p-4 rounded-xl border text-xs ${
                q.isCorrect ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-red-950/10 border-red-500/30'
              }`}>
                <div className="flex items-start gap-2.5">
                  {q.isCorrect ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /> : <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-bold text-white text-sm">{idx + 1}. {q.question}</p>
                    <p className="text-slate-400 mt-1">
                      <strong className="text-slate-300">SOP Note:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Questions Display */
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const selectedOpt = answers[q.id];
            return (
              <div key={q.id} className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Question {idx + 1} of {questions.length}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {q.question}
                </h3>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 cursor-pointer text-xs ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length < questions.length}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer transition"
            >
              <FileCheck2 size={16} />
              <span>{submitting ? 'Evaluating...' : t.submitAssignment}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

