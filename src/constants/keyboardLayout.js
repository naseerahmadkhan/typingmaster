/**
 * ANSI 60% mechanical keyboard layout definition, finger color bindings, and RGB presets.
 */

export const FINGER_INFO = {
  LP: { name: 'Left Pinky', color: 'text-rose-400 border-rose-500/40 bg-rose-500/10' },
  LR: { name: 'Left Ring', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  LM: { name: 'Left Middle', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  LI: { name: 'Left Index', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  THUMB: { name: 'Thumb', color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' },
  RI: { name: 'Right Index', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  RM: { name: 'Right Middle', color: 'text-violet-400 border-violet-500/40 bg-violet-500/10' },
  RR: { name: 'Right Ring', color: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10' },
  RP: { name: 'Right Pinky', color: 'text-pink-400 border-pink-500/40 bg-pink-500/10' },
  LT: { name: 'Thumb', color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' },
  RT: { name: 'Thumb', color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' },
};

export const RGB_MODES = ['WAVE', 'CYBER', 'BREATHE', 'REACTIVE'];

export const KEYBOARD_60_ROWS = [
  // Number row
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
  // Top alpha row (QWERTY)
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
  // Home row (ASDF JKL;)
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
  // Bottom alpha row (ZXCV BNM)
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
  // Bottom modifier & spacebar row
  [
    { id: 'ControlLeft', label: 'CTRL', finger: 'LP', w: 'w-12 sm:w-13' },
    { id: 'AltLeft', label: 'ALT', finger: 'LT', w: 'w-12 sm:w-13' },
    { id: ' ', label: 'SPACE', finger: 'THUMB', w: 'flex-1 min-w-[190px]' },
    { id: 'AltRight', label: 'ALT', finger: 'RT', w: 'w-12 sm:w-13' },
    { id: 'ControlRight', label: 'CTRL', finger: 'RP', w: 'w-12 sm:w-13' },
  ],
];
