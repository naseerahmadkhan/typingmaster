import React, { useMemo } from 'react';
import { FINGER_INFO } from '@/constants/keyboardLayout';

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
  const isSentenceDrill = activeTab === 'sentence';
  const isParagraphDrill = activeTab === 'paragraph';

  // Renders a single mechanical keycap in Key Drill mode
  const renderMechanicalCap = (char, index) => {
    const isTyped = index < charIndex;
    const isCurrent = index === charIndex;

    if (char === '\n') {
      return (
        <span
          key={index}
          ref={isCurrent ? activeCharRef : null}
          className={`inline-flex items-center justify-center w-16 sm:w-20 h-9 sm:h-10 rounded-lg border font-mono text-[11px] font-bold tracking-wide transition-all duration-100 select-none shrink-0 ${
            isCurrent
              ? 'bg-gradient-to-b from-emerald-400 to-emerald-500 border-emerald-200 text-slate-950 shadow-[0_3px_0_#047857,0_0_18px_rgba(52,211,153,0.75)] -translate-y-0.5 scale-105 z-10'
              : isTyped
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400/80 shadow-[0_1px_0_#064e3b] translate-y-[1px]'
              : 'bg-gradient-to-b from-[#1e2738] to-[#141b29] border-slate-700/90 text-slate-400 shadow-[0_3px_0_#090d16]'
          }`}
        >
          Enter ↵
        </span>
      );
    }

    const isSpace = char === ' ';

    return (
      <span
        key={index}
        ref={isCurrent ? activeCharRef : null}
        className={`inline-flex items-center justify-center rounded-lg border font-mono font-bold transition-all duration-100 select-none shrink-0 ${
          isSpace
            ? 'w-16 sm:w-20 h-9 sm:h-10 text-[11px] tracking-wider'
            : 'w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg'
        } ${
          isCurrent
            ? 'bg-gradient-to-b from-emerald-400 to-emerald-500 border-emerald-200 text-slate-950 shadow-[0_3px_0_#047857,0_0_18px_rgba(56,189,248,0.75)] -translate-y-0.5 scale-105 z-10'
            : isTyped
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400 shadow-[0_1px_0_#064e3b] translate-y-[1px]'
            : 'bg-gradient-to-b from-[#1e2738] to-[#141b29] border-slate-700/90 text-slate-200 shadow-[0_3px_0_#090d16]'
        }`}
      >
        {isSpace ? 'Space' : char}
      </span>
    );
  };

  // Group characters into strict rows of 10 keycaps each, paginated in 5-row blocks (for Key Drill)
  const keyCapPageData = useMemo(() => {
    if (!isKeyDrill) return null;
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

  // Group characters into lines with global indices (for Word, Sentence & Paragraph Drills)
  const textLines = useMemo(() => {
    if (isKeyDrill) return [];
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

  // Compute active single line for Sentence Drill
  const sentenceLineData = useMemo(() => {
    if (!isSentenceDrill || textLines.length === 0) return null;

    let activeLineIdx = textLines.findIndex(
      (line) => charIndex >= line.startIdx && charIndex <= line.endIdx
    );
    if (activeLineIdx === -1) {
      activeLineIdx = textLines.length - 1;
    }

    const activeLine = textLines[activeLineIdx];
    let activeWordEnd = activeLine.endIdx;
    for (let j = charIndex; j <= activeLine.endIdx; j++) {
      if (text[j] === ' ' || text[j] === '\n') {
        activeWordEnd = j - 1;
        break;
      }
    }

    return {
      activeLine,
      activeLineIdx,
      totalLines: textLines.length,
      activeWordEnd,
    };
  }, [isSentenceDrill, textLines, charIndex, text]);

  // Compute the active 3-row page for Paragraph Drill
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

    // Determine exact start and end character boundaries of the active word
    let wordStart = charIndex;
    let wordEnd = charIndex;
    if (charIndex < text.length && text[charIndex] !== ' ' && text[charIndex] !== '\n') {
      while (wordStart > 0 && text[wordStart - 1] !== ' ' && text[wordStart - 1] !== '\n') {
        wordStart--;
      }
      while (wordEnd < text.length - 1 && text[wordEnd + 1] !== ' ' && text[wordEnd + 1] !== '\n') {
        wordEnd++;
      }
    }

    return {
      pageLines,
      pageIndex,
      totalPages: Math.ceil(textLines.length / 3),
      wordStart,
      wordEnd,
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
          {sentenceLineData && (
            <span className="text-cyan-400">
              SENTENCE {sentenceLineData.activeLineIdx + 1} / {sentenceLineData.totalLines}
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

      {/* Dynamic Body */}
      <div
        ref={containerRef}
        onWheel={(e) => e.preventDefault()}
        className={`flex-1 overflow-hidden select-none cursor-default transition-all ${
          isKeyDrill
            ? 'pt-2 px-2'
            : isWordDrill
            ? 'flex flex-col items-center gap-5 pt-4 px-4 font-mono'
            : isSentenceDrill
            ? 'flex items-center justify-center px-6 font-mono'
            : 'flex flex-col justify-between py-2 px-4 sm:px-8 font-mono'
        }`}
      >
        {/* MODE 1: KEY DRILL (Paginated 5-Row x 10-Keycap Mechanical Grid) */}
        {isKeyDrill && keyCapPageData && (
          <div className="w-fit mx-auto flex flex-col gap-2.5">
            {keyCapPageData.pageRows.map((row, rowIdx) => (
              <div
                key={keyCapPageData.pageIndex * 5 + rowIdx}
                className="flex items-center justify-start gap-1.5 sm:gap-2 shrink-0"
              >
                {row.map(({ char, index }, idxInRow) => (
                  <React.Fragment key={index}>
                    {renderMechanicalCap(char, index)}
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
        )}

        {/* MODE 2: WORD DRILL (Original Unchanged Word Drill) */}
        {isWordDrill && (
          <div className="w-fit mx-auto flex flex-col gap-5">
            {textLines.map((line, lineIdx) => {
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
                          <span
                            aria-hidden="true"
                            className="text-cyan-400 text-base sm:text-lg mr-1.5 select-none"
                          >
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
        )}

        {/* MODE 3: SENTENCE DRILL (Single-Line Centered Vanishing Sentence Stream) */}
        {isSentenceDrill && sentenceLineData && (
          <div className="w-fit max-w-full mx-auto flex items-center justify-end text-2xl sm:text-4xl tracking-wide whitespace-nowrap">
            {sentenceLineData.activeLine.items.map(({ char, index }) => {
              if (index < charIndex) return null;

              const isCurrent = index === charIndex;
              const isInActiveWord = index <= sentenceLineData.activeWordEnd;

              if (char === '\n') {
                return (
                  <span
                    key={index}
                    ref={isCurrent ? activeCharRef : null}
                    className={`inline-flex items-center ml-2 px-2 py-0.5 rounded font-mono text-lg transition-all ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_16px_rgba(6,182,212,0.8)] animate-pulse'
                        : 'text-emerald-400/75'
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
                    className={`inline-flex items-center justify-center w-5 sm:w-7 transition-all ${
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
                      : 'text-emerald-400/75'
                  }`}
                >
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="text-cyan-400 text-base sm:text-xl mr-1.5 select-none"
                    >
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
        )}

        {/* MODE 4: PARAGRAPH DRILL (Top 3-Row Reference + Horizontal Divider + Bottom Live Typing Area) */}
        {isParagraphDrill && paragraphPageData && (
          <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center gap-2.5 py-0.5">
            {/* TOP PANE: 3 Reference Rows */}
            <div className="space-y-1 text-base sm:text-lg leading-snug tracking-wide">
              {paragraphPageData.pageLines.map((line, lIdx) => (
                <div key={lIdx} className="min-h-[1.5rem] whitespace-pre-wrap">
                  {line.items.map(({ char, index }) => {
                    const isTyped = index < charIndex;
                    const isCurrent = index === charIndex;
                    const isInCurrentWord =
                      charIndex < text.length &&
                      text[charIndex] !== ' ' &&
                      text[charIndex] !== '\n' &&
                      index >= paragraphPageData.wordStart &&
                      index <= paragraphPageData.wordEnd;

                    // Determine if the word containing `index` has any mistyped characters
                    let wStart = index;
                    let wEnd = index;
                    if (char !== ' ' && char !== '\n') {
                      while (wStart > 0 && text[wStart - 1] !== ' ' && text[wStart - 1] !== '\n') {
                        wStart--;
                      }
                      while (wEnd < text.length - 1 && text[wEnd + 1] !== ' ' && text[wEnd + 1] !== '\n') {
                        wEnd++;
                      }
                    }

                    let wordHasError = false;
                    if (char !== ' ' && char !== '\n') {
                      for (let k = wStart; k <= wEnd; k++) {
                        if (k < charIndex && typedChars[k] !== text[k]) {
                          wordHasError = true;
                          break;
                        }
                      }
                    }

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

            {/* HORIZONTAL DIVIDER LINE */}
            <div className="w-full border-t border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.25)] my-0.5" />

            {/* BOTTOM PANE: User's Live Typed Output with Whole-Word Red Underline on Errors */}
            <div className="space-y-1 text-base sm:text-lg leading-snug tracking-wide min-h-[4.75rem]">
              {paragraphPageData.pageLines.map((line, lIdx) => {
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

                      // Check if the whole word containing `index` matches expected text
                      let wStart = index;
                      let wEnd = index;
                      if (char !== ' ') {
                        while (wStart > 0 && text[wStart - 1] !== ' ' && text[wStart - 1] !== '\n') {
                          wStart--;
                        }
                        while (wEnd < text.length - 1 && text[wEnd + 1] !== ' ' && text[wEnd + 1] !== '\n') {
                          wEnd++;
                        }
                      }

                      let wholeWordWrong = false;
                      if (char !== ' ') {
                        for (let k = wStart; k <= wEnd; k++) {
                          if (k < charIndex && typedChars[k] !== text[k]) {
                            wholeWordWrong = true;
                            break;
                          }
                        }
                      }

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
        )}
      </div>
    </div>
  );
}