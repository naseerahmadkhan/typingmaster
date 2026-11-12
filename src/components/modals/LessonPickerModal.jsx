import React from 'react';
import { LESSONS } from '@/lessons';
import { Sparkles, ArrowRight, Target } from 'lucide-react';

export default function LessonPickerModal({
  currentLessonId,
  studentName,
  onSelectLesson,
  isClosable = false,
  onClose
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#07080d]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
      <div className="relative z-10 max-w-4xl w-full my-auto bg-slate-900/90 border border-slate-700/80 p-5 sm:p-8 rounded-3xl shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Lesson Selection
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Which Lesson Do You Want to Start?</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select a lesson from the curriculum below. You will then choose between Key Drill, Word Drill, or Paragraph Drill.
            </p>
          </div>

          {isClosable && (
            <button
              onClick={onClose}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition"
            >
              Back to Drill
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[58vh] overflow-y-auto pr-1">
          {LESSONS.map((lesson) => {
            const isSelected = lesson.id === currentLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-150 flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-500/20 via-slate-900/80 to-emerald-500/20 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300">
                      Lesson {lesson.id}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {lesson.badge || 'Standard'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {lesson.title}
                  </h3>

                  <div className="text-[11px] font-mono text-cyan-400/90 mt-0.5">
                    Keys: <span className="text-white">{lesson.keys}</span>
                  </div>

                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Target className="w-3 h-3 text-cyan-400" />
                    <span>Key</span>
                    <span>·</span>
                    <span>Word</span>
                    <span>·</span>
                    <span>Para</span>
                  </div>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <span>Student: <strong className="text-slate-300">{studentName || 'Guest'}</strong></span>
          <span className="text-emerald-400/90">Tip: Start with Lesson 1 to master the foundational home row anchors.</span>
        </div>
      </div>
    </div>
  );
}
