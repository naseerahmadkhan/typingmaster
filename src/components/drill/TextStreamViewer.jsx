import React, { useMemo } from 'react';
import { FINGER_INFO } from '@/constants/keyboardLayout';

/**
 * Finds the start and end indices of the word containing the given index.
 */
function getWordBounds(text, index) {
  if (!text || index < 0 || index >= text.length) {
    return { start: index, end: index };
  }
  if (text[index] === ' ' || text[index] === '\n') {
    return { start: index, end: index };
  }

  let start = index;
  while (start > 0 && text[start - 1] !== ' ' && text[start - 1] !== '\n') {
    start--;
  }

  let end = index;
  while (end < text.length - 1 && text[end + 1] !== ' ' && text[end + 1] !== '\n') {
    end++;
  }

  return { start, end };
}

/**
 * Checks if any character in the specified index range was mistyped.
 */
function rangeHasError(text, typedChars, start, end, maxIndex) {
  const limit = Math.min(end, maxIndex - 1);
  for (let i = start; i <= limit; i++) {
    if (typedChars[i] !== undefined && typedChars[i] !== text[i]) {
      return true;
    }
  }
  return false;
}

export default function TextStreamViewer({
  text,
  charIndex,
  typedChars = [],
  targetKeyInfo,
  containerRef,
  activeCharRef,
  activeTab = 'key',
}) {
  const isKeyDrill = activeTab === 'key';
  const isWordDrill = activeTab === 'word';
  const isParagraphDrill = activeTab === 'paragraph';

  // Group characters into 10-cap rows, paginated in 5-row blocks
  const keyCapPageData = useMemo(() => {
    if (!isKeyDrill || !text) return null;
    const chars = text.split('').map((char, index) => ({ char, index }));
    const rows = [];
    for (let i = 0; i < chars.length; i += 10) {
      rows.push(chars.slice(i, i + 10));
    }

    const activeRowIdx = Math.min(rows.length - 1, Math.floor(charIndex / 10));
    const pageIndex = Math.max(0, Math.floor(activeRowIdx / 5));
    const pageRows = rows.slice(pageIndex * 5, pageIndex * 5 + 5);

    return {
      pageRows,
      pageIndex,
      totalPages: Math.max(1, Math.ceil(rows.length / 5)),
    };
  }, [text, isKeyDrill, charIndex]);

  // Split text into lines with start and end indices
  const textLines = useMemo(() => {
    if (isKeyDrill || !text) return [];
    const lines = [];
    let currentLine = [];
    let lineStartIdx = 0;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      currentLine.push({ char: ch, index: i });
      if (ch === '\n' || i === text.length - 1) {
        lines.push({
          items: currentLine,
          startIdx: lineStartIdx,
          endIdx: i,
        });
        currentLine = [];
        lineStartIdx = i + 1;
      }
    }
    return lines;
  }, [text, isKeyDrill]);

  // Paginate paragraph drills in 3-line blocks
  const paragraphPageData = useMemo(() => {
    if (!isParagraphDrill || textLines.length === 0) return null;

    let activeLineIdx = textLines.findIndex(
      (line) => charIndex >= line.startIdx && charIndex <= line.endIdx
    );
    if (activeLineIdx === -1) {
      activeLineIdx = textLines.length - 1;
    }

    const pageIndex = Math.floor(activeLineIdx / 3);
    const pageLines = textLines.slice(pageIndex * 3, pageIndex * 3 + 3);
    const activeBounds = getWordBounds(text, charIndex);

    return {
      pageLines,
      pageIndex,
      totalPages: Math.ceil(textLines.length / 3),
      wordStart: activeBounds.start,
      wordEnd: activeBounds.end,
    };
  }, [isParagraphDrill, textLines, charIndex, text]);

  return (
    <div className="relative h-full rounded-2xl bg-[#0c1017] border border-slate-800 p-3.5 sm:p-4 shadow-xl flex flex-col overflow-hidden">
      {/* Target Key Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800/80 text-xs font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">NEXT KEY:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow">
            {targetKeyInfo.label || 'DONE'}
          </span>
          {targetKeyInfo.finger && (
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              (use <strong className="text-white">{FINGER_INFO[targetKeyInfo.finger]?.name}</strong>)
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          {keyCapPageData && (
            <span className="text-cyan-400">
              BLOCK {keyCapPageData.pageIndex + 1} / {keyCapPageData.totalPages}
            </span>
          )}
          {paragraphPageData && (
            <span className="text-cyan-400">
              BLOCK {paragraphPageData.pageIndex + 1} / {paragraphPageData.totalPages}
            </span>
          )}
          <span>
            CHAR {charIndex} / {text.length}
          </span>
        </div>
      </div>

      {/* Drill Content Area */}
      <div
        ref={containerRef}
        onWheel={(e) => e.preventDefault()}
        className={`flex-1 overflow-hidden select-none cursor-default transition-all ${
          isKeyDrill
            ? 'pt-2 px-2'
            : isWordDrill
            ? 'flex flex-col items-center gap-5 pt-4 px-4 font-mono'
            : 'flex flex-col justify-between py-2 px-4 sm:px-8 font-mono'
        }`}
      >
        {isKeyDrill && keyCapPageData && (
          <KeyDrillView
            pageData={keyCapPageData}
            charIndex={charIndex}
            activeCharRef={activeCharRef}
          />
        )}

        {isWordDrill && (
          <WordDrillView
            lines={textLines}
            text={text}
            charIndex={charIndex}
            activeCharRef={activeCharRef}
          />
        )}

        {isParagraphDrill && paragraphPageData && (
          <ParagraphDrillView
            pageData={paragraphPageData}
            text={text}
            charIndex={charIndex}
            typedChars={typedChars}
            activeCharRef={activeCharRef}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Key Drill: Tactile 3D mechanical keycaps rendered in rows of 10.
 */
function KeyDrillView({ pageData, charIndex, activeCharRef }) {
  const renderCap = (char, index) => {
    const isTyped = index < charIndex;
    const isCurrent = index === charIndex;
    const isEnter = char === '\n';
    const isSpace = char === ' ';

    let sizeClasses = 'w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg';
    if (isEnter || isSpace) {
      sizeClasses = 'w-16 sm:w-20 h-9 sm:h-10 text-[11px] tracking-wider';
    }

    let styleClasses = 'bg-gradient-to-b from-[#1e2738] to-[#141b29] border-slate-700/90 text-slate-200 shadow-[0_3px_0_#090d16]';
    if (isCurrent) {
      styleClasses = 'bg-gradient-to-b from-emerald-400 to-emerald-500 border-emerald-200 text-slate-950 shadow-[0_3px_0_#047857,0_0_18px_rgba(52,211,153,0.75)] -translate-y-0.5 scale-105 z-10';
    } else if (isTyped) {
      styleClasses = 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400/80 shadow-[0_1px_0_#064e3b] translate-y-[1px]';
    }

    return (
      <span
        key={index}
        ref={isCurrent ? activeCharRef : null}
        className={`inline-flex items-center justify-center rounded-lg border font-mono font-bold transition-all duration-100 select-none shrink-0 ${sizeClasses} ${styleClasses}`}
      >
        {isEnter ? 'Enter ↵' : isSpace ? 'Space' : char}
      </span>
    );
  };

  return (
    <div className="w-fit mx-auto flex flex-col gap-2.5">
      {pageData.pageRows.map((row, rowIdx) => (
        <div
          key={pageData.pageIndex * 5 + rowIdx}
          className="flex items-center justify-start gap-1.5 sm:gap-2 shrink-0"
        >
          {row.map(({ char, index }, idxInRow) => (
            <React.Fragment key={index}>
              {renderCap(char, index)}
              {idxInRow === 4 && (
                <span
                  aria-hidden="true"
                  className="w-6 sm:w-10 h-6 flex items-center justify-center shrink-0"
                >
                  <span className="w-[1px] h-5 bg-slate-800/90 rounded-full" />
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Word Drill: Horizontal stream with a stationary pointer and smooth vanishing letters.
 */
function WordDrillView({ lines, text, charIndex, activeCharRef }) {
  return (
    <div className="w-fit mx-auto flex flex-col gap-5">
      {lines.map((line, lineIdx) => {
        const isLineCompleted = charIndex > line.endIdx;
        const isActiveLine = charIndex >= line.startIdx && charIndex <= line.endIdx;

        if (isLineCompleted) return null;

        let activeWordEnd = line.endIdx;
        if (isActiveLine) {
          for (let j = charIndex; j <= line.endIdx; j++) {
            if (text[j] === ' ' || text[j] === '\n') {
              activeWordEnd = j - 1;
              break;
            }
          }
        }

        return (
          <div
            key={lineIdx}
            className={`w-full flex items-center justify-end text-3xl sm:text-4xl tracking-wider transition-opacity duration-150 ${
              isActiveLine ? 'opacity-100' : 'opacity-35'
            }`}
          >
            {line.items.map(({ char, index }) => {
              if (index < charIndex) return null;

              const isCurrent = index === charIndex;
              const isInActiveWord = isActiveLine && index <= activeWordEnd;

              if (char === '\n') {
                return (
                  <span
                    key={index}
                    ref={isCurrent ? activeCharRef : null}
                    className={`inline-flex items-center ml-3 px-2 py-0.5 rounded font-mono text-base transition-all ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_16px_rgba(6,182,212,0.8)] animate-pulse'
                        : 'text-slate-600'
                    }`}
                  >
                    {isCurrent && <span className="mr-1 text-xs">▶</span>}↵
                  </span>
                );
              }

              if (char === ' ') {
                return (
                  <span
                    key={index}
                    ref={isCurrent ? activeCharRef : null}
                    className={`inline-flex items-center justify-center w-6 sm:w-8 transition-all ${
                      isCurrent ? 'text-cyan-400' : ''
                    }`}
                  >
                    {isCurrent ? (
                      <span className="inline-flex items-center text-cyan-400 font-mono text-xl border-b-2 border-cyan-400 pb-0.5 animate-pulse">
                        <span className="text-xs mr-0.5">▶</span>␣
                      </span>
                    ) : (
                      '\u00A0'
                    )}
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  ref={isCurrent ? activeCharRef : null}
                  className={`inline-flex items-center transition-colors duration-75 ${
                    isCurrent
                      ? 'text-cyan-400 font-semibold'
                      : isInActiveWord
                      ? 'text-cyan-400 font-normal'
                      : isActiveLine
                      ? 'text-emerald-400/75'
                      : 'text-slate-500'
                  }`}
                >
                  {isCurrent && (
                    <span aria-hidden="true" className="text-cyan-400 text-base sm:text-lg mr-1.5 select-none">
                      ▶
                    </span>
                  )}
                  <span
                    className={
                      isCurrent
                        ? 'underline decoration-cyan-400 decoration-[3px] underline-offset-[10px]'
                        : ''
                    }
                  >
                    {char}
                  </span>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Paragraph Drill: Split-pane layout with reference lines on top and live typing with typo highlighting below.
 */
function ParagraphDrillView({ pageData, text, charIndex, typedChars, activeCharRef }) {
  return (
    <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center gap-2.5 py-0.5">
      {/* Top Reference Text */}
      <div className="space-y-1 text-base sm:text-lg leading-snug tracking-wide">
        {pageData.pageLines.map((line, lIdx) => (
          <div key={lIdx} className="min-h-[1.5rem] whitespace-pre-wrap">
            {line.items.map(({ char, index }) => {
              const isTyped = index < charIndex;
              const isCurrent = index === charIndex;
              const isInCurrentWord =
                charIndex < text.length &&
                text[charIndex] !== ' ' &&
                text[charIndex] !== '\n' &&
                index >= pageData.wordStart &&
                index <= pageData.wordEnd;

              const bounds = getWordBounds(text, index);
              const wordHasError =
                char !== ' ' &&
                char !== '\n' &&
                rangeHasError(text, typedChars, bounds.start, bounds.end, charIndex);

              if (char === '\n') {
                return (
                  <span
                    key={index}
                    ref={isCurrent ? activeCharRef : null}
                    className={`inline-block ml-1 text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'text-cyan-400 underline decoration-cyan-400 decoration-2 underline-offset-4 animate-pulse'
                        : isTyped
                        ? 'text-emerald-400/70'
                        : 'text-slate-500'
                    }`}
                  >
                    ↵
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  ref={isCurrent ? activeCharRef : null}
                  className={`transition-colors duration-75 ${
                    isInCurrentWord
                      ? 'text-cyan-400 font-semibold underline decoration-cyan-400 decoration-2 underline-offset-4'
                      : isCurrent
                      ? 'bg-cyan-500/30 text-cyan-300 rounded px-0.5'
                      : isTyped && wordHasError
                      ? 'text-rose-400 underline decoration-rose-500/70 underline-offset-4'
                      : isTyped
                      ? 'text-emerald-400/75'
                      : 'text-slate-200'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="w-full border-t border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.25)] my-0.5" />

      {/* Bottom Live Typed Output */}
      <div className="space-y-1 text-base sm:text-lg leading-snug tracking-wide min-h-[4.75rem]">
        {pageData.pageLines.map((line, lIdx) => {
          if (charIndex < line.startIdx) {
            return <div key={lIdx} className="min-h-[1.5rem]" />;
          }

          const typedItemsInLine = line.items.filter(
            ({ char, index }) => index < charIndex && char !== '\n'
          );
          const isCursorOnThisLine =
            charIndex >= line.startIdx && charIndex <= line.endIdx;

          return (
            <div key={lIdx} className="min-h-[1.5rem] whitespace-pre-wrap text-slate-100">
              {typedItemsInLine.map(({ char, index }) => {
                const userChar = typedChars[index] ?? char;
                const bounds = getWordBounds(text, index);
                const wholeWordWrong =
                  char !== ' ' &&
                  rangeHasError(text, typedChars, bounds.start, bounds.end, charIndex);

                return (
                  <span
                    key={index}
                    className={
                      wholeWordWrong
                        ? 'text-rose-300 underline decoration-rose-500 decoration-2 underline-offset-4'
                        : userChar !== char
                        ? 'bg-rose-500/30 text-rose-300 rounded'
                        : 'text-slate-100'
                    }
                  >
                    {userChar}
                  </span>
                );
              })}
              {isCursorOnThisLine && (
                <span className="inline-block w-[2px] h-4 bg-cyan-400 align-middle ml-0.5 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
