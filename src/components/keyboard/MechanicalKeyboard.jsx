import React, { useState } from 'react';
import { FINGER_INFO } from '@/constants/keyboardLayout';

const ROWS_60 = [
  [
    { id: '`', label: '`', shift: '~', finger: 'LP', w: 'w-9 sm:w-10' },
    { id: '1', label: '1', shift: '!', finger: 'LP', w: 'w-9 sm:w-10' },
    { id: '2', label: '2', shift: '@', finger: 'LR', w: 'w-9 sm:w-10' },
    { id: '3', label: '3', shift: '#', finger: 'LM', w: 'w-9 sm:w-10' },
    { id: '4', label: '4', shift: '$', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: '5', label: '5', shift: '%', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: '6', label: '6', shift: '^', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: '7', label: '7', shift: '&', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: '8', label: '8', shift: '*', finger: 'RM', w: 'w-9 sm:w-10' },
    { id: '9', label: '9', shift: '(', finger: 'RR', w: 'w-9 sm:w-10' },
    { id: '0', label: '0', shift: ')', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: '-', label: '-', shift: '_', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: '=', label: '=', shift: '+', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: 'Backspace', label: 'BACKSPACE', finger: 'RP', w: 'flex-1 min-w-[70px]' },
  ],
  [
    { id: 'Tab', label: 'TAB', finger: 'LP', w: 'w-13 sm:w-[58px]' },
    { id: 'q', label: 'Q', finger: 'LP', w: 'w-9 sm:w-10' },
    { id: 'w', label: 'W', finger: 'LR', w: 'w-9 sm:w-10' },
    { id: 'e', label: 'E', finger: 'LM', w: 'w-9 sm:w-10' },
    { id: 'r', label: 'R', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: 't', label: 'T', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: 'y', label: 'Y', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: 'u', label: 'U', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: 'i', label: 'I', finger: 'RM', w: 'w-9 sm:w-10' },
    { id: 'o', label: 'O', finger: 'RR', w: 'w-9 sm:w-10' },
    { id: 'p', label: 'P', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: '[', label: '[', shift: '{', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: ']', label: ']', shift: '}', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: '\\', label: '\\', shift: '|', finger: 'RP', w: 'flex-1 min-w-[54px]' },
  ],
  [
    { id: 'CapsLock', label: 'CAPS', finger: 'LP', w: 'w-[60px] sm:w-[68px]' },
    { id: 'a', label: 'A', finger: 'LP', w: 'w-9 sm:w-10', home: true },
    { id: 's', label: 'S', finger: 'LR', w: 'w-9 sm:w-10', home: true },
    { id: 'd', label: 'D', finger: 'LM', w: 'w-9 sm:w-10', home: true },
    { id: 'f', label: 'F', finger: 'LI', w: 'w-9 sm:w-10', home: true, bump: true },
    { id: 'g', label: 'G', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: 'h', label: 'H', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: 'j', label: 'J', finger: 'RI', w: 'w-9 sm:w-10', home: true, bump: true },
    { id: 'k', label: 'K', finger: 'RM', w: 'w-9 sm:w-10', home: true },
    { id: 'l', label: 'L', finger: 'RR', w: 'w-9 sm:w-10', home: true },
    { id: ';', label: ';', shift: ':', finger: 'RP', w: 'w-9 sm:w-10', home: true },
    { id: "'", label: "'", shift: '"', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: 'Enter', label: 'ENTER', finger: 'RP', w: 'flex-1 min-w-[74px]' },
  ],
  [
    { id: 'ShiftLeft', label: 'SHIFT', finger: 'LP', w: 'w-[78px] sm:w-[88px]', isShift: true },
    { id: 'z', label: 'Z', finger: 'LP', w: 'w-9 sm:w-10' },
    { id: 'x', label: 'X', finger: 'LR', w: 'w-9 sm:w-10' },
    { id: 'c', label: 'C', finger: 'LM', w: 'w-9 sm:w-10' },
    { id: 'v', label: 'V', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: 'b', label: 'B', finger: 'LI', w: 'w-9 sm:w-10' },
    { id: 'n', label: 'N', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: 'm', label: 'M', finger: 'RI', w: 'w-9 sm:w-10' },
    { id: ',', label: ',', shift: '<', finger: 'RM', w: 'w-9 sm:w-10' },
    { id: '.', label: '.', shift: '>', finger: 'RR', w: 'w-9 sm:w-10' },
    { id: '/', label: '/', shift: '?', finger: 'RP', w: 'w-9 sm:w-10' },
    { id: 'ShiftRight', label: 'SHIFT', finger: 'RP', w: 'flex-1 min-w-[88px]', isShift: true },
  ],
  [
    { id: 'ControlLeft', label: 'CTRL', finger: 'LP', w: 'w-12 sm:w-13' },
    { id: 'AltLeft', label: 'ALT', finger: 'LT', w: 'w-12 sm:w-13' },
    { id: ' ', label: 'SPACE', finger: 'THUMB', w: 'flex-1 min-w-[190px]' },
    { id: 'AltRight', label: 'ALT', finger: 'RT', w: 'w-12 sm:w-13' },
    { id: 'ControlRight', label: 'CTRL', finger: 'RP', w: 'w-12 sm:w-13' },
  ],
];

const RGB_MODES = ['WAVE', 'CYBER', 'BREATHE', 'REACTIVE'];

const FINGER_BADGE_COLORS = {
  LP: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
  LR: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  LM: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  LI: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
  RI: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  RM: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
  RR: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10',
  RP: 'text-pink-400 border-pink-500/40 bg-pink-500/10',
  THUMB: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
  LT: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
  RT: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
};

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

  const isTargetKey = (keyObj) => {
    if (!targetCharStr) return false;
    if (keyObj.isShift && needsShift) return true;
    if (targetCharStr === 'Enter' && keyObj.id === 'Enter') return true;
    if (targetCharStr === ' ' && keyObj.id === ' ') return true;
    const lowerTarget = targetCharStr.toLowerCase();
    return keyObj.id.toLowerCase() === lowerTarget || keyObj.shift === targetCharStr;
  };

  const isKeyPressed = (keyObj) => {
    if (!pressedKey) return false;
    const p = pressedKey.toLowerCase();
    return (
      keyObj.id.toLowerCase() === p ||
      (keyObj.shift && keyObj.shift.toLowerCase() === p)
    );
  };

  const isKeyMistake = (keyObj) => {
    if (!lastMistakeKey) return false;
    const m = lastMistakeKey.toLowerCase();
    return (
      keyObj.id.toLowerCase() === m ||
      (keyObj.shift && keyObj.shift.toLowerCase() === m)
    );
  };

  return (
    <div className="relative w-full max-w-[740px] mx-auto p-[1.5px] rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 animate-rgb-chassis shadow-[0_8px_28px_rgba(0,0,0,0.85),0_0_18px_rgba(6,182,212,0.18)]">
      {/* Compact Inner Dark Aluminum Chassis */}
      <div className="w-full rounded-[15px] bg-[#090d16]/95 backdrop-blur-md p-2 sm:p-2.5 flex flex-col gap-1.5">
        
        {/* Top Gaming Status Bar */}
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
              title="Click to cycle RGB lighting animation"
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

        {/* 5 Compact Key Rows */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {ROWS_60.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center gap-1 sm:gap-1.5 w-full">
              {row.map((keyObj, colIdx) => {
                const active = isTargetKey(keyObj);
                const pressed = isKeyPressed(keyObj);
                const mistake = isKeyMistake(keyObj);

                const waveDelay = `${rowIdx * 110 + colIdx * 65}ms`;

                let idleRgbClass = '';
                if (rgbMode === 'WAVE') {
                  idleRgbClass = 'animate-rgb-wave';
                } else if (rgbMode === 'BREATHE') {
                  idleRgbClass = 'animate-rgb-breathe';
                } else if (rgbMode === 'CYBER') {
                  idleRgbClass =
                    colIdx < 7
                      ? 'border-cyan-500/45 shadow-[0_3px_0_#070b14,0_0_8px_rgba(6,182,212,0.2)]'
                      : 'border-fuchsia-500/45 shadow-[0_3px_0_#070b14,0_0_8px_rgba(217,70,239,0.2)]';
                } else {
                  idleRgbClass = 'border-slate-800 shadow-[0_3px_0_#070b14]';
                }

                let keyVisualClass = `bg-gradient-to-b from-[#171f30] to-[#0e131f] text-slate-100 ${idleRgbClass}`;

                if (mistake) {
                  keyVisualClass =
                    'bg-gradient-to-b from-rose-500 to-rose-700 border-rose-200 text-white translate-y-[2px] shadow-[0_1px_0_#881337,0_0_18px_rgba(244,63,94,0.85)] z-20';
                } else if (pressed) {
                  keyVisualClass =
                    'bg-gradient-to-b from-cyan-400 to-blue-600 border-cyan-100 text-slate-950 translate-y-[2px] shadow-[0_1px_0_#1e3a8a,0_0_20px_rgba(56,189,248,0.9)] z-20';
                } else if (active) {
                  keyVisualClass =
                    'bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600 border-emerald-200 text-slate-950 font-black animate-target-beacon z-10';
                }

                return (
                  <div
                    key={keyObj.id}
                    style={!active && !pressed && !mistake ? { animationDelay: waveDelay } : undefined}
                    className={`relative h-8 sm:h-9 ${keyObj.w} rounded-lg border transition-transform duration-75 flex flex-col items-center justify-center select-none ${keyVisualClass}`}
                  >
                    {/* Top Finger Badge */}
                    {showFingerGuide && keyObj.finger && (
                      <span
                        className={`absolute -top-1.5 px-1 py-[0.5px] rounded-full text-[7px] font-mono font-bold border leading-none backdrop-blur-sm ${
                          active || pressed
                            ? 'bg-slate-950 text-emerald-300 border-emerald-300/60'
                            : FINGER_BADGE_COLORS[keyObj.finger] || 'text-slate-400 border-slate-700 bg-slate-900'
                        }`}
                      >
                        {keyObj.finger}
                      </span>
                    )}

                    {/* Shift Symbol */}
                    {keyObj.shift && (
                      <span
                        className={`absolute top-1 right-1.5 text-[8px] font-mono ${
                          active || pressed ? 'text-slate-900 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {keyObj.shift}
                      </span>
                    )}

                    {/* Main Illuminated Legend */}
                    <span
                      className={`font-mono font-bold tracking-wider ${
                        keyObj.label.length > 1 ? 'text-[9px] sm:text-[10px]' : 'text-xs sm:text-sm'
                      } ${
                        active || pressed
                          ? 'text-slate-950'
                          : 'drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
                      }`}
                    >
                      {keyObj.label}
                    </span>

                    {/* Home Row Dot & F/J Tactile Homing Bars */}
                    {keyObj.bump && (
                      <span
                        className={`w-3 h-[1.5px] rounded-full mt-0.5 ${
                          active || pressed
                            ? 'bg-slate-950'
                            : 'bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.85)]'
                        }`}
                      />
                    )}
                    {keyObj.home && !keyObj.bump && (
                      <span
                        className={`w-1 h-1 rounded-full mt-0.5 ${
                          active || pressed
                            ? 'bg-slate-950'
                            : 'bg-emerald-400/80 shadow-[0_0_5px_rgba(52,211,153,0.8)]'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Compact Single-Line Bottom Finger Legend */}
        {showFingerGuide && (
          <div className="flex flex-wrap items-center justify-center gap-1 pt-1 mt-0.5 border-t border-slate-800/80 text-[9px] font-mono">
            <span className="text-slate-500 mr-0.5">FINGERS:</span>
            {Object.entries(FINGER_INFO).map(([code, info]) => (
              <span
                key={code}
                className={`px-1.5 py-[1px] rounded-full border ${
                  FINGER_BADGE_COLORS[code] || 'text-slate-400 border-slate-700 bg-slate-900'
                }`}
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