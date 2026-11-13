import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';
import { FINGER_INFO } from '../constants/keyboardLayout';

const KEY_TO_FINGER = {
  '`': 'LP', '1': 'LP', 'q': 'LP', 'a': 'LP', 'z': 'LP',
  '2': 'LR', 'w': 'LR', 's': 'LR', 'x': 'LR',
  '3': 'LM', 'e': 'LM', 'd': 'LM', 'c': 'LM',
  '4': 'LI', '5': 'LI', 'r': 'LI', 't': 'LI', 'f': 'LI', 'g': 'LI', 'v': 'LI', 'b': 'LI',
  ' ': 'THUMB',
  '6': 'RI', '7': 'RI', 'y': 'RI', 'u': 'RI', 'h': 'RI', 'j': 'RI', 'n': 'RI', 'm': 'RI',
  '8': 'RM', 'i': 'RM', 'k': 'RM', ',': 'RM',
  '9': 'RR', 'o': 'RR', 'l': 'RR', '.': 'RR',
  '0': 'RP', '-': 'RP', '=': 'RP', 'p': 'RP', '[': 'RP', ']': 'RP', '\\': 'RP', ';': 'RP', "'": 'RP', '/': 'RP',
};

export function useTypingEngine({
  text,
  isEnabled,
  studentName,
  lessonId,
  drillType,
  onFinished,
}) {
  const [charIndex, setCharIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const [lastMistakeKey, setLastMistakeKey] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const textScrollContainerRef = useRef(null);
  const activeCharRef = useRef(null);
  const isParagraphMode = drillType === 'paragraph';

  // Synchronize state when text or drill type changes during render (avoids cascading effect renders)
  const [prevDrill, setPrevDrill] = useState({ text, drillType });
  if (prevDrill.text !== text || prevDrill.drillType !== drillType) {
    setPrevDrill({ text, drillType });
    setCharIndex(0);
    setTypedChars([]);
    setIsFinished(false);
    setPressedKey(null);
    setLastMistakeKey(null);
    setStartTime(null);
    setTotalKeystrokes(0);
    setErrorCount(0);
    setElapsedSeconds(0);
  }

  const resetDrill = useCallback(() => {
    setCharIndex(0);
    setTypedChars([]);
    setIsFinished(false);
    setPressedKey(null);
    setLastMistakeKey(null);
    setStartTime(null);
    setTotalKeystrokes(0);
    setErrorCount(0);
    setElapsedSeconds(0);
    if (textScrollContainerRef.current) {
      textScrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  // Update timer every 250ms while active
  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 250);
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  // Derive target key info and finger recommendations
  const targetKeyInfo = useMemo(() => {
    if (!text || charIndex >= text.length) {
      return { char: '', label: 'DONE', finger: null, shift: false };
    }
    const ch = text[charIndex];
    if (ch === '\n') {
      return { char: 'Enter', label: 'ENTER ↵', finger: 'RP', shift: false };
    }
    if (ch === ' ') {
      return { char: ' ', label: 'SPACE', finger: 'THUMB', shift: false };
    }
    const lower = ch.toLowerCase();
    const isShift = ch !== lower && /[A-Z!@#$%^&*()_+{}|:"<>?~]/.test(ch);
    const finger = KEY_TO_FINGER[lower] || 'RI';
    return {
      char: ch,
      label: ch.toUpperCase(),
      finger,
      fingerName: FINGER_INFO[finger]?.name || '',
      shift: isShift,
    };
  }, [text, charIndex]);

  useEffect(() => {
    if (!isEnabled || isFinished || !text) return;

    const handleKeyDown = (e) => {
      // Ignore standalone modifiers
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        return;
      }

      // Prevent default page scroll actions
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Backspace') {
        e.preventDefault();
      }

      const visualKey = e.key === ' ' ? ' ' : e.key === 'Enter' ? 'Enter' : e.key.toLowerCase();
      setPressedKey(visualKey);
      setTimeout(() => setPressedKey(null), 130);

      // Paragraph mode allows backspacing mistakes on the current line
      if (isParagraphMode && e.key === 'Backspace') {
        if (charIndex > 0 && text[charIndex - 1] !== '\n') {
          audioEngine.playClick();
          setCharIndex((prev) => prev - 1);
          setTypedChars((prev) => prev.slice(0, -1));
          setLastMistakeKey(null);
        }
        return;
      }

      let inputChar = e.key;
      if (e.key === 'Enter') inputChar = '\n';
      if (inputChar.length !== 1) return;

      const now = startTime || Date.now();
      if (!startTime) setStartTime(now);

      const expectedChar = text[charIndex];
      const isCorrect = inputChar === expectedChar;

      setTotalKeystrokes((prev) => prev + 1);

      if (isParagraphMode) {
        // Enforce newline matching strictly to prevent line drift
        if (expectedChar === '\n' && inputChar !== '\n') {
          audioEngine.playError();
          setErrorCount((prev) => prev + 1);
          setLastMistakeKey(visualKey);
          return;
        }

        if (inputChar === '\n' && expectedChar !== '\n') {
          audioEngine.playError();
          setErrorCount((prev) => prev + 1);
          return;
        }

        if (isCorrect) {
          audioEngine.playClick();
          setLastMistakeKey(null);
        } else {
          audioEngine.playError();
          setErrorCount((prev) => prev + 1);
          setLastMistakeKey(visualKey);
        }

        const nextIdx = charIndex + 1;
        setTypedChars((prev) => [...prev, inputChar]);
        setCharIndex(nextIdx);

        if (nextIdx >= text.length) {
          finishDrill(now, nextIdx, isCorrect ? errorCount : errorCount + 1);
        }
      } else {
        // Strict mode: Key and Word drills require the exact key before advancing
        if (isCorrect) {
          audioEngine.playClick();
          setLastMistakeKey(null);
          const nextIdx = charIndex + 1;
          setCharIndex(nextIdx);

          if (nextIdx >= text.length) {
            finishDrill(now, nextIdx, errorCount);
          }
        } else {
          audioEngine.playError();
          setErrorCount((prev) => prev + 1);
          setLastMistakeKey(visualKey);
        }
      }
    };

    const finishDrill = (startedAt, finalCharCount, finalErrors) => {
      setIsFinished(true);
      const durationSec = Math.max(1, (Date.now() - startedAt) / 1000);
      const wpm = Math.round(finalCharCount / 5 / (durationSec / 60));
      const accuracy = Math.max(
        0,
        Math.round(((finalCharCount - finalErrors) / Math.max(1, finalCharCount + finalErrors)) * 100)
      );

      storageService.recordDrillResult({
        studentName,
        lessonId,
        drillType,
        wpm,
        accuracy,
        errors: finalErrors,
        durationSec: Math.round(durationSec),
      });

      if (onFinished) onFinished();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isEnabled,
    isFinished,
    text,
    charIndex,
    startTime,
    errorCount,
    isParagraphMode,
    studentName,
    lessonId,
    drillType,
    onFinished,
  ]);

  const stats = useMemo(() => {
    const mins = Math.max(1 / 60, elapsedSeconds / 60);
    const wpm = startTime ? Math.round(charIndex / 5 / mins) : 0;
    const accuracy =
      totalKeystrokes > 0
        ? Math.max(0, Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100))
        : 100;
    const progress = text.length > 0 ? Math.min(100, Math.round((charIndex / text.length) * 100)) : 0;

    return {
      wpm,
      grossWPM: wpm,
      accuracy,
      errors: errorCount,
      errorCount,
      elapsedSeconds,
      progress,
    };
  }, [charIndex, totalKeystrokes, errorCount, elapsedSeconds, startTime, text.length]);

  return {
    charIndex,
    typedChars,
    isFinished,
    pressedKey,
    lastMistakeKey,
    targetKeyInfo,
    stats,
    textScrollContainerRef,
    activeCharRef,
    resetDrill,
  };
}
