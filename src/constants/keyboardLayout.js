export const KEYBOARD_60_LAYOUT = [
  // Number row
  [
    { code: "Backquote", label: "`", shiftLabel: "~", width: "w-10 md:w-12", finger: "LP" },
    { code: "Digit1", label: "1", shiftLabel: "!", width: "w-10 md:w-12", finger: "LP" },
    { code: "Digit2", label: "2", shiftLabel: "@", width: "w-10 md:w-12", finger: "LR" },
    { code: "Digit3", label: "3", shiftLabel: "#", width: "w-10 md:w-12", finger: "LM" },
    { code: "Digit4", label: "4", shiftLabel: "$", width: "w-10 md:w-12", finger: "LI" },
    { code: "Digit5", label: "5", shiftLabel: "%", width: "w-10 md:w-12", finger: "LI" },
    { code: "Digit6", label: "6", shiftLabel: "^", width: "w-10 md:w-12", finger: "RI" },
    { code: "Digit7", label: "7", shiftLabel: "&", width: "w-10 md:w-12", finger: "RI" },
    { code: "Digit8", label: "8", shiftLabel: "*", width: "w-10 md:w-12", finger: "RM" },
    { code: "Digit9", label: "9", shiftLabel: "(", width: "w-10 md:w-12", finger: "RR" },
    { code: "Digit0", label: "0", shiftLabel: ")", width: "w-10 md:w-12", finger: "RP" },
    { code: "Minus", label: "-", shiftLabel: "_", width: "w-10 md:w-12", finger: "RP" },
    { code: "Equal", label: "=", shiftLabel: "+", width: "w-10 md:w-12", finger: "RP" },
    { code: "Backspace", label: "BACKSPACE", width: "flex-1 min-w-[70px]", finger: "RP", isSpecial: true }
  ],
  // QWERTY row
  [
    { code: "Tab", label: "TAB", width: "w-14 md:w-16", finger: "LP", isSpecial: true },
    { code: "KeyQ", label: "Q", width: "w-10 md:w-12", finger: "LP" },
    { code: "KeyW", label: "W", width: "w-10 md:w-12", finger: "LR" },
    { code: "KeyE", label: "E", width: "w-10 md:w-12", finger: "LM" },
    { code: "KeyR", label: "R", width: "w-10 md:w-12", finger: "LI" },
    { code: "KeyT", label: "T", width: "w-10 md:w-12", finger: "LI" },
    { code: "KeyY", label: "Y", width: "w-10 md:w-12", finger: "RI" },
    { code: "KeyU", label: "U", width: "w-10 md:w-12", finger: "RI" },
    { code: "KeyI", label: "I", width: "w-10 md:w-12", finger: "RM" },
    { code: "KeyO", label: "O", width: "w-10 md:w-12", finger: "RR" },
    { code: "KeyP", label: "P", width: "w-10 md:w-12", finger: "RP" },
    { code: "BracketLeft", label: "[", shiftLabel: "{", width: "w-10 md:w-12", finger: "RP" },
    { code: "BracketRight", label: "]", shiftLabel: "}", width: "w-10 md:w-12", finger: "RP" },
    { code: "Backslash", label: "\\", shiftLabel: "|", width: "flex-1 min-w-[50px]", finger: "RP" }
  ],
  // Home row (ASDF JKL;)
  [
    { code: "CapsLock", label: "CAPS", width: "w-16 md:w-20", finger: "LP", isSpecial: true },
    { code: "KeyA", label: "A", width: "w-10 md:w-12", finger: "LP", isHomeRow: true },
    { code: "KeyS", label: "S", width: "w-10 md:w-12", finger: "LR", isHomeRow: true },
    { code: "KeyD", label: "D", width: "w-10 md:w-12", finger: "LM", isHomeRow: true },
    { code: "KeyF", label: "F", width: "w-10 md:w-12", finger: "LI", isHomeRow: true, hasBump: true },
    { code: "KeyG", label: "G", width: "w-10 md:w-12", finger: "LI" },
    { code: "KeyH", label: "H", width: "w-10 md:w-12", finger: "RI" },
    { code: "KeyJ", label: "J", width: "w-10 md:w-12", finger: "RI", isHomeRow: true, hasBump: true },
    { code: "KeyK", label: "K", width: "w-10 md:w-12", finger: "RM", isHomeRow: true },
    { code: "KeyL", label: "L", width: "w-10 md:w-12", finger: "RR", isHomeRow: true },
    { code: "Semicolon", label: ";", shiftLabel: ":", width: "w-10 md:w-12", finger: "RP", isHomeRow: true },
    { code: "Quote", label: "'", shiftLabel: '"', width: "w-10 md:w-12", finger: "RP" },
    { code: "Enter", label: "ENTER", width: "flex-1 min-w-[80px]", finger: "RP", isSpecial: true }
  ],
  // Bottom Alpha row
  [
    { code: "ShiftLeft", label: "SHIFT", width: "w-20 md:w-24", finger: "LP", isSpecial: true },
    { code: "KeyZ", label: "Z", width: "w-10 md:w-12", finger: "LP" },
    { code: "KeyX", label: "X", width: "w-10 md:w-12", finger: "LR" },
    { code: "KeyC", label: "C", width: "w-10 md:w-12", finger: "LM" },
    { code: "KeyV", label: "V", width: "w-10 md:w-12", finger: "LI" },
    { code: "KeyB", label: "B", width: "w-10 md:w-12", finger: "LI" },
    { code: "KeyN", label: "N", width: "w-10 md:w-12", finger: "RI" },
    { code: "KeyM", label: "M", width: "w-10 md:w-12", finger: "RI" },
    { code: "Comma", label: ",", shiftLabel: "<", width: "w-10 md:w-12", finger: "RM" },
    { code: "Period", label: ".", shiftLabel: ">", width: "w-10 md:w-12", finger: "RR" },
    { code: "Slash", label: "/", shiftLabel: "?", width: "w-10 md:w-12", finger: "RP" },
    { code: "ShiftRight", label: "SHIFT", width: "flex-1 min-w-[90px]", finger: "RP", isSpecial: true }
  ],
  // Space row
  [
    { code: "ControlLeft", label: "CTRL", width: "w-12 md:w-14", finger: "LP", isSpecial: true },
    { code: "AltLeft", label: "ALT", width: "w-12 md:w-14", finger: "LT", isSpecial: true },
    { code: "Space", label: "SPACE", width: "flex-1 min-w-[240px] md:min-w-[320px]", finger: "THUMB" },
    { code: "AltRight", label: "ALT", width: "w-12 md:w-14", finger: "RT", isSpecial: true },
    { code: "ControlRight", label: "CTRL", width: "w-12 md:w-14", finger: "RP", isSpecial: true }
  ]
];

export const FINGER_INFO = {
  LP: { name: "Left Pinky", color: "text-rose-400 border-rose-500/40 bg-rose-500/10" },
  LR: { name: "Left Ring", color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  LM: { name: "Left Middle", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
  LI: { name: "Left Index", color: "text-sky-400 border-sky-500/40 bg-sky-500/10" },
  RI: { name: "Right Index", color: "text-blue-400 border-blue-500/40 bg-blue-500/10" },
  RM: { name: "Right Middle", color: "text-purple-400 border-purple-500/40 bg-purple-500/10" },
  RR: { name: "Right Ring", color: "text-pink-400 border-pink-500/40 bg-pink-500/10" },
  RP: { name: "Right Pinky", color: "text-rose-400 border-rose-500/40 bg-rose-500/10" },
  THUMB: { name: "Thumb", color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" }
};
