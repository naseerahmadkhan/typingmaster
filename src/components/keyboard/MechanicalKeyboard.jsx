import React, { useState } from 'react';
import { KEYBOARD_60_ROWS, FINGER_INFO, RGB_MODES } from '@/constants/keyboardLayout';

export default function MechanicalKeyboard({
  targetChar,
  pressedKey,
  lastMistakeKey,
  showFingerGuide = true,
  activeLesson,
}) {
  const [rgbModeIdx, setRgbModeIdx] = useState(0);
  const rgbMode = RGB_MODES[rgbModeIdx];

  const cycleRgbMode = () => {
    setRgbModeIdx((prev) => (prev + 1) % RGB_MODES.length);
  };

  const targetCharStr = targetChar?.char || '';
  const needsShift = Boolean(targetChar?.shift);

  const isTargetKey = (key) => {
    if (!targetCharStr) return false;
    if (key.isShift && needsShift) return true;
    if (targetCharStr === 'Enter' && key.id === 'Enter') return true;
    if (targetCharStr === ' ' && key.id === ' ') return true;
    const lower = targetCharStr.toLowerCase();
    return key.id.toLowerCase() === lower || key.shift === targetCharStr;
  };

  const isKeyPressed = (key) => {
    if (!pressedKey) return false;
    const lower = pressedKey.toLowerCase();
    return key.id.toLowerCase() === lower || (key.shift && key.shift.toLowerCase() === lower);
  };

  const isKeyMistake = (key) => {
    if (!lastMistakeKey) return false;
    const lower = lastMistakeKey.toLowerCase();
    return key.id.toLowerCase() === lower || (key.shift && key.shift.toLowerCase() === lower);
  };

  return (
    <div className="relative w-full max-w-[740px] mx-auto p-[1.5px] rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 animate-rgb-chassis shadow-[0_8px_28px_rgba(0,0,0,0.85),0_0_18px_rgba(6,182,212,0.18)]">
      <div className="w-full rounded-[15px] bg-[#090d16]/95 backdrop-blur-md p-2 sm:p-2.5 flex flex-col gap-1.5">
        
        {/* Chassis Header Bar */}
        <div className="flex items-center justify-between px-1.5 pb-0.5 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-slate-300 font-bold tracking-wider">60% RGB MECHANICAL</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={cycleRgbMode}
              title="Switch RGB lighting preset"
              className="px-2 py-0.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-[9px] font-bold tracking-widest transition cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.2)]"
            >
              RGB: {rgbMode}
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-bold tracking-widest hidden sm:inline">
              {activeLesson?.keys?.toUpperCase() || 'ASDF JKL;'}
            </span>
          </div>
        </div>

        {/* 60% Keycap Rows */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {KEYBOARD_60_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center gap-1 sm:gap-1.5 w-full">
              {row.map((key, colIdx) => {
                const active = isTargetKey(key);
                const pressed = isKeyPressed(key);
                const mistake = isKeyMistake(key);
                const waveDelay = `${rowIdx * 110 + colIdx * 65}ms`;

                let idleClass = 'border-slate-800 shadow-[0_3px_0_#070b14]';
                if (rgbMode === 'WAVE') {
                  idleClass = 'animate-rgb-wave';
                } else if (rgbMode === 'BREATHE') {
                  idleClass = 'animate-rgb-breathe';
                } else if (rgbMode === 'CYBER') {
                  idleClass =
                    colIdx < 7
                      ? 'border-cyan-500/45 shadow-[0_3px_0_#070b14,0_0_8px_rgba(6,182,212,0.2)]'
                      : 'border-fuchsia-500/45 shadow-[0_3px_0_#070b14,0_0_8px_rgba(217,70,239,0.2)]';
                }

                let keyStyle = `bg-gradient-to-b from-[#171f30] to-[#0e131f] text-slate-100 ${idleClass}`;

                if (mistake) {
                  keyStyle =
                    'bg-gradient-to-b from-rose-500 to-rose-700 border-rose-200 text-white translate-y-[2px] shadow-[0_1px_0_#881337,0_0_18px_rgba(244,63,94,0.85)] z-20';
                } else if (pressed) {
                  keyStyle =
                    'bg-gradient-to-b from-cyan-400 to-blue-600 border-cyan-100 text-slate-950 translate-y-[2px] shadow-[0_1px_0_#1e3a8a,0_0_20px_rgba(56,189,248,0.9)] z-20';
                } else if (active) {
                  keyStyle =
                    'bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 border-emerald-200 text-slate-950 font-black animate-target-beacon z-10';
                }

                return (
                  <div
                    key={key.id}
                    style={!active && !pressed && !mistake ? { animationDelay: waveDelay } : undefined}
                    className={`relative h-8 sm:h-9 ${key.w} rounded-lg border transition-transform duration-75 flex flex-col items-center justify-center select-none ${keyStyle}`}
                  >
                    {/* Finger Badge Indicator */}
                    {showFingerGuide && key.finger && (
                      <span
                        className={`absolute -top-1.5 px-1 py-[0.5px] rounded-full text-[7px] font-mono font-bold border leading-none backdrop-blur-sm ${
                          active || pressed
                            ? 'bg-slate-950 text-emerald-300 border-emerald-300/60'
                            : FINGER_INFO[key.finger]?.color || 'text-slate-400 border-slate-700 bg-slate-900'
                        }`}
                      >
                        {key.finger}
                      </span>
                    )}

                    {/* Shift Label */}
                    {key.shift && (
                      <span
                        className={`absolute top-1 right-1.5 text-[8px] font-mono ${
                          active || pressed ? 'text-slate-900 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {key.shift}
                      </span>
                    )}

                    {/* Key Cap Label */}
                    <span
                      className={`font-mono font-bold tracking-wider ${
                        key.label.length > 1 ? 'text-[9px] sm:text-[10px]' : 'text-xs sm:text-sm'
                      } ${active || pressed ? 'text-slate-950' : 'drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'}`}
                    >
                      {key.label}
                    </span>

                    {/* Tactile Homing Bars (F & J) and Home Row Dots */}
                    {key.bump && (
                      <span
                        className={`w-3 h-[1.5px] rounded-full mt-0.5 ${
                          active || pressed ? 'bg-slate-950' : 'bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.85)]'
                        }`}
                      />
                    )}
                    {key.home && !key.bump && (
                      <span
                        className={`w-1 h-1 rounded-full mt-0.5 ${
                          active || pressed ? 'bg-slate-950' : 'bg-emerald-400/80 shadow-[0_0_5px_rgba(52,211,153,0.8)]'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Finger Guide Legend */}
        {showFingerGuide && (
          <div className="flex flex-wrap items-center justify-center gap-1 pt-1 mt-0.5 border-t border-slate-800/80 text-[9px] font-mono">
            <span className="text-slate-500 mr-0.5">FINGERS:</span>
            {Object.entries(FINGER_INFO)
              .filter(([code]) => code !== 'LT' && code !== 'RT')
              .map(([code, info]) => (
                <span
                  key={code}
                  className={`px-1.5 py-[1px] rounded-full border ${info.color}`}
                >
                  {code}: {info.name}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
