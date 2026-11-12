import { KEYBOARD_60_LAYOUT } from '@/constants/keyboardLayout';

export function mapCharToTarget(char) {
  if (char === undefined || char === null) {
    return { code: '', label: '', finger: '', isShift: false };
  }
  if (char === ' ') {
    return { code: 'Space', label: 'SPACE', finger: 'THUMB', isShift: false };
  }
  if (char === '\n') {
    return { code: 'Enter', label: 'ENTER ↵', finger: 'RP', isShift: false };
  }
  if (char === ';') {
    return { code: 'Semicolon', label: ';', finger: 'RP', isShift: false };
  }
  if (char === ':') {
    return { code: 'Semicolon', label: ';', finger: 'RP', isShift: true };
  }

  const upper = char.toUpperCase();
  const isShift = char >= 'A' && char <= 'Z' && char === upper;

  for (const row of KEYBOARD_60_LAYOUT) {
    for (const key of row) {
      if (key.label === upper || key.label === char || key.shiftLabel === char) {
        return { code: key.code, label: key.label, finger: key.finger, isShift };
      }
    }
  }

  return { code: `Key${upper}`, label: upper, finger: 'LP', isShift };
}
