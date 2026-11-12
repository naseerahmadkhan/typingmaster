import React from 'react';

export default function KeyCap({
  keyData,
  isTarget,
  isCurrentlyPressed,
  isMistake,
  showFingerGuide,
}) {
  const { label, shiftLabel, width, finger, isHomeRow, hasBump } = keyData;

  let keyBg = 'bg-[#18202f] border-slate-700/70 text-slate-200 shadow-[0_2px_0_#0a0e17]';
  let haloGlow = '';

  if (isMistake) {
    keyBg = 'bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_#f43f5e] translate-y-[1px]';
  } else if (isCurrentlyPressed) {
    keyBg = 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold shadow-[0_0_15px_#10b981] translate-y-[2px]';
  } else if (isTarget) {
    keyBg = 'bg-gradient-to-b from-emerald-500 to-teal-600 border-emerald-300 text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.7)] animate-pulse';
    haloGlow = 'ring-1 ring-emerald-400 ring-offset-1 ring-offset-slate-950';
  } else if (isHomeRow) {
    keyBg = 'bg-[#1c2637] border-cyan-800/40 text-cyan-100 shadow-[0_2px_0_#0d141e]';
  }

  return (
    <div
      className={`
        relative h-8 md:h-9 rounded-md border flex flex-col items-center justify-center font-mono
        pointer-events-none cursor-default transition-all duration-75 select-none
        ${width} ${keyBg} ${haloGlow}
      `}
    >
      <span className={`text-[10px] md:text-[11px] font-bold leading-none ${isTarget || isCurrentlyPressed ? 'text-slate-950' : ''}`}>
        {label}
      </span>

      {shiftLabel && (
        <span className="absolute top-0.5 right-1 text-[7px] text-slate-400 opacity-60">
          {shiftLabel}
        </span>
      )}

      {hasBump && (
        <div className="absolute bottom-0.5 w-3 h-0.5 rounded-full bg-slate-400/80 shadow" />
      )}

      {isHomeRow && !hasBump && (
        <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-cyan-400/50" />
      )}

      {showFingerGuide && finger && !isTarget && !isCurrentlyPressed && (
        <span className="absolute -top-1.5 px-0.5 text-[6px] rounded bg-slate-900 border border-slate-700 text-slate-400 font-sans hidden sm:inline">
          {finger}
        </span>
      )}
    </div>
  );
}