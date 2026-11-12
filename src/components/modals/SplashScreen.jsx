import React, { useEffect } from 'react';
import { Keyboard, Flame, Zap, ShieldCheck, ArrowRight, Volume2 } from 'lucide-react';

export default function SplashScreen({ onStart }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F5' || e.key === 'F12' || (e.ctrlKey && e.key === 'r')) return;
      onStart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="fixed inset-0 z-50 bg-[#07080d] flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/15 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/15 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[300px] bg-emerald-500/10 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full my-auto text-center space-y-5 sm:space-y-8 bg-slate-900/85 border border-slate-700/60 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase">
          <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-center">Modular Typing Curriculum · 12 Lessons</span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              NASEER
            </span>
            <span className="text-slate-100">TYPING</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              MASTER
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-base md:text-lg max-w-lg mx-auto font-light leading-relaxed px-2">
            Professional touch-typing curriculum with key drills, word drills, and paragraph drills across modular lessons.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-left">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Keyboard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mb-1" />
            <div className="text-[11px] sm:text-xs font-semibold text-white">12 Lessons</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Modular folders</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mb-1" />
            <div className="text-[11px] sm:text-xs font-semibold text-white">3 Drill Modes</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Key, Word, Text</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1" />
            <div className="text-[11px] sm:text-xs font-semibold text-white">Switch Sound</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Synthesized audio</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mb-1" />
            <div className="text-[11px] sm:text-xs font-semibold text-white">Progress Save</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Profile tracking</div>
          </div>
        </div>

        <div className="pt-2 sm:pt-4 flex flex-col items-center gap-2 sm:gap-3">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer group"
          >
            <span>START TYPING LESSON</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[10px] sm:text-xs text-slate-400 tracking-wider">
            — or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 font-mono text-cyan-400 text-[10px] sm:text-xs shadow">ANY KEY</kbd> to begin —
          </span>
        </div>
      </div>
    </div>
  );
}
