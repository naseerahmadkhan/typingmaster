import React from 'react';
import { Award, RotateCcw, ChevronRight, Layers } from 'lucide-react';

export default function CompletionModal({
  stats,
  studentName,
  activeLesson,
  onRestart,
  onNextDrill,
  onChooseLesson
}) {
  const { grossWPM, accuracy, errorCount } = stats;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">DRILL COMPLETED!</h2>
          <p className="text-slate-400 text-xs mt-1">
            Great job, <strong className="text-emerald-400">{studentName || 'Student'}</strong> in <span className="text-cyan-400">{activeLesson.title}</span>!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <div className="text-[11px] text-slate-400 font-mono">SPEED</div>
            <div className="text-xl font-black text-white mt-0.5">
              {grossWPM} <span className="text-xs text-cyan-400 font-normal">WPM</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">ACCURACY</div>
            <div className="text-xl font-black text-white mt-0.5">{accuracy}%</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-mono">TYPOS</div>
            <div className="text-xl font-black text-rose-400 mt-0.5">{errorCount}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <button
              onClick={onRestart}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-600 transition flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repeat Drill</span>
            </button>
            <button
              onClick={onNextDrill}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm hover:scale-[1.02]"
            >
              <span>Next Drill</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onChooseLesson}
            className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-mono transition flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Another Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
}
