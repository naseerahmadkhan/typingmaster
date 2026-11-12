import React from 'react';

export default function StatsBar({ stats }) {
  const { grossWPM, accuracy, progress, elapsedSeconds, errorCount } = stats;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 2x2 Primary Metric Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono">SPEED</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">{grossWPM}</span>
            <span className="text-[10px] text-cyan-400 font-semibold font-mono">WPM</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono">ACCURACY</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">{accuracy}</span>
            <span className="text-[10px] text-emerald-400 font-semibold font-mono">%</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono">MISTAKES</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className={`text-xl font-black ${errorCount > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {errorCount}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">typos</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono">TIME</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-white">
              {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">min</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span>COMPLETION</span>
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