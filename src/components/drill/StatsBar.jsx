import React from 'react';

export default function StatsBar({ stats = {} }) {
  const speed = stats.grossWPM ?? stats.wpm ?? 0;
  const accuracy = stats.accuracy ?? 100;
  const mistakes = stats.errorCount ?? stats.errors ?? 0;
  const elapsed = stats.elapsedSeconds ?? 0;
  const progress = stats.progress ?? 0;

  const minutes = Math.floor(elapsed / 60);
  const seconds = (elapsed % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 2x2 Primary Metric Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Speed</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">{speed}</span>
            <span className="text-[10px] text-cyan-400 font-semibold font-mono">WPM</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Accuracy</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">{accuracy}</span>
            <span className="text-[10px] text-emerald-400 font-semibold font-mono">%</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Mistakes</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-xl font-black ${mistakes > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {mistakes}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">typos</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Time</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">{minutes}:{seconds}</span>
            <span className="text-[10px] text-slate-400 font-mono">min</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span className="uppercase tracking-wider">Completion</span>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
