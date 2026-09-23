import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Award, 
  Timer, 
  ArrowRight, 
  AlertCircle,
  FileCheck2,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export default function AssessmentTest({ moduleId = 'mod_boiler_01', onCertIssued }) {
  const { token, user } = useAuth();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load questions
  useEffect(() => {
    async function loadExam() {
      try {
        const res = await fetch(`/api/assessments/${moduleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setAssessment(data.assessment);
          setTimeLeft((data.assessment.time_limit_mins || 10) * 60);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, [moduleId, token]);

  // Timer countdown
  useEffect(() => {
    if (!assessment || result) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [assessment, result]);

  const handleSelectOption = (questionId, optionIndex) => {
    if (result) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          moduleId,
          answers
        })
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        if (data.passed) {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
        }
      } else {
        alert(data.error || 'Failed to submit exam');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p>Loading examination module questions...</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
        <AlertCircle size={32} className="mx-auto mb-2 text-amber-400" />
        <p>No assessment questions found for this module.</p>
      </div>
    );
  }

  const questions = assessment.questions || [];
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      {/* Exam Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              NATIONAL COMPETENCY EXAMINATION
            </span>
            <span className="text-xs text-slate-400">Pass Criteria: {assessment.passing_percentage}%</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">{assessment.title}</h2>
        </div>

        {/* Countdown Timer */}
        {!result && (
          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-200">
            <Timer size={16} className={timeLeft < 120 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />
            <span className="text-xs font-semibold text-slate-400">Time Left:</span>
            <span className={`font-mono font-bold text-sm ${timeLeft < 120 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {/* When Exam is Completed: Result Banner */}
      {result ? (
        <div className="py-6 space-y-6">
          <div className={`p-6 rounded-2xl border text-center ${
            result.passed
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/30 border-red-500/40 text-red-200'
          }`}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 shadow-lg"
                 style={{ backgroundColor: result.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
              {result.passed ? (
                <Award size={36} className="text-emerald-400" />
              ) : (
                <XCircle size={36} className="text-red-400" />
              )}
            </div>

            <h3 className="text-2xl font-black">
              {result.passed ? 'EXAMINATION PASSED!' : 'EXAMINATION NOT PASSED'}
            </h3>

            <p className="text-sm mt-1 text-slate-300 max-w-md mx-auto">
              {result.passed
                ? 'Congratulations! You demonstrated mastery in safety protocols. An official verifiable certificate with cryptographic SHA-256 seal has been issued.'
                : 'Your score was below the mandatory safety passing threshold. Review the incorrect answers below and retry.'}
            </p>

            <div className="flex items-center justify-center gap-6 mt-4 font-mono">
              <div className="text-center">
                <span className="text-xs text-slate-400 block uppercase">Final Score</span>
                <span className="text-3xl font-extrabold text-white">{result.percentage}%</span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="text-center">
                <span className="text-xs text-slate-400 block uppercase">Correct Answers</span>
                <span className="text-3xl font-extrabold text-white">{result.correctCount} / {result.totalQuestions}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {result.passed && result.certificate && (
                <button
                  onClick={() => onCertIssued(result.certificate)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <FileCheck2 size={18} />
                  <span>View & Download Official Certificate</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {!result.passed && (
                <button
                  onClick={() => {
                    setResult(null);
                    setAnswers({});
                    setTimeLeft(600);
                    setCurrentIndex(0);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition"
                >
                  <RotateCcw size={16} />
                  <span>Retake Examination</span>
                </button>
              )}
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle size={16} className="text-cyan-400" />
              <span>Performance Breakdown & Explanations:</span>
            </h4>

            {result.review.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border ${
                  item.isCorrect
                    ? 'bg-emerald-950/15 border-emerald-500/30'
                    : 'bg-red-950/15 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {item.isCorrect ? (
                      <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {idx + 1}. {item.question}
                      </p>
                      <div className="mt-2 text-xs space-y-1">
                        <p className={item.isCorrect ? 'text-emerald-300' : 'text-red-300'}>
                          <span className="font-bold">Your answer:</span> {item.selectedAnswer !== null ? item.options[item.selectedAnswer] : 'Not answered'}
                        </p>
                        {!item.isCorrect && (
                          <p className="text-emerald-400">
                            <span className="font-bold">Correct answer:</span> {item.options[item.correctAnswer]}
                          </p>
                        )}
                        <p className="text-slate-400 pt-1 border-t border-slate-800">
                          <span className="text-slate-300 font-semibold">Regulatory SOP Note:</span> {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Active Question Display */
        <div className="py-6">
          {/* Question Index Dots */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                      isCurrent
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                        : isAnswered
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-slate-400">
              {answeredCount} of {questions.length} answered
            </span>
          </div>

          {/* Current Question */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-6">
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Previous Question
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <FileCheck2 size={16} />
                  <span>{submitting ? 'Submitting & Grading...' : 'Submit Final Assessment'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

