import React from 'react';
import { LESSONS, getLessonById } from '@/lessons';
import {
  CheckCircle2,
  Circle,
  Play,
  BookOpen,
  Gauge,
  UserCheck,
  BarChart3,
  X,
  Keyboard
} from 'lucide-react';

export default function CourseDashboard({
  activeLessonId,
  onSelectLessonTab,
  onStartDrill,
  completedDrills = {},
  studentName,
  onCloseToWorkspace,
  onOpenProfile,
}) {
  const currentLesson = getLessonById(activeLessonId);

  const wordCount = currentLesson.wordDrills?.length || 0;
  const sentenceDrills = currentLesson.sentenceDrills || [];
  const sentenceCount = sentenceDrills.length;

  // Build the structured numbered modules for the active lesson (Key, Word, Sentence, Paragraph)
  const lessonItems = [
    {
      num: `${currentLesson.id}.1`,
      type: 'key',
      fileIdx: 0,
      title: `Key drill (${currentLesson.keys})`,
      duration: '3 - 5 min.',
      isCompleted: Boolean(completedDrills[`${currentLesson.id}_key_0`]),
    },
    ...currentLesson.wordDrills.map((wd, idx) => ({
      num: `${currentLesson.id}.${idx + 2}`,
      type: 'word',
      fileIdx: idx,
      title: wd.name || `Word drill ${idx + 1}`,
      duration: '3 - 5 min.',
      isCompleted: Boolean(completedDrills[`${currentLesson.id}_word_${idx}`]),
    })),
    ...sentenceDrills.map((sd, idx) => ({
      num: `${currentLesson.id}.${wordCount + idx + 2}`,
      type: 'sentence',
      fileIdx: idx,
      title: sd.name || `Sentence drill ${idx + 1}`,
      duration: '3 - 5 min.',
      isCompleted: Boolean(completedDrills[`${currentLesson.id}_sentence_${idx}`]),
    })),
    ...currentLesson.paragraphDrills.map((pd, idx) => ({
      num: `${currentLesson.id}.${wordCount + sentenceCount + idx + 2}`,
      type: 'paragraph',
      fileIdx: idx,
      title: pd.name || `Paragraph drill ${idx + 1}`,
      duration: '3 - 5 min.',
      isCompleted: Boolean(completedDrills[`${currentLesson.id}_paragraph_${idx}`]),
    })),
  ];

  // Calculate overall course completion percentage
  const totalCompletedCount = Object.keys(completedDrills).length;
  const estimatedTotalDrills = LESSONS.length * 4;
  const courseProgressPct = Math.min(100, Math.round((totalCompletedCount / estimatedTotalDrills) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#07090e] text-slate-100 flex flex-col md:flex-row select-none overflow-hidden">
      
      {/* LEFT / MAIN COURSE CONTENT AREA */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 md:p-10 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto">
          
          {/* Top Course Title */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              Fast Touch Typing Course
            </h1>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Student: <strong className="text-cyan-400">{studentName || 'Guest'}</strong>
            </span>
          </div>

          {/* Horizontal Lesson Number Tabs (1 to 12) + Blue/Cyan Accent Line */}
          <div className="border-b-2 border-cyan-500 flex items-end gap-0.5 sm:gap-1 overflow-x-auto pb-0">
            {LESSONS.map((lesson) => {
              const isSelected = lesson.id === activeLessonId;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLessonTab(lesson.id)}
                  className={`px-3 sm:px-4 py-1.5 text-sm sm:text-base font-mono font-bold transition-all cursor-pointer rounded-t-md ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_-4px_15px_rgba(6,182,212,0.35)]'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {lesson.id}
                </button>
              );
            })}
          </div>

          {/* Centered Lesson Heading */}
          <div className="text-center my-7 sm:my-9">
            <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-wide">
              {currentLesson.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1.5">
              Target Keys: {currentLesson.keys}
            </p>
          </div>

          {/* Numbered Drill List (1.1, 1.2, 1.3...) */}
          <div className="max-w-xl mx-auto space-y-2.5">
            {lessonItems.map((item, index) => {
              // Highlight the first uncompleted item as the recommended next step
              const isRecommended =
                !item.isCompleted &&
                lessonItems.slice(0, index).every((prev) => prev.isCompleted);

              return (
                <button
                  key={`${item.type}_${item.fileIdx}`}
                  onClick={() => onStartDrill(currentLesson.id, item.type, item.fileIdx)}
                  className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-left transition-all group cursor-pointer ${
                    isRecommended
                      ? 'bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                      : 'hover:bg-slate-900/90 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Completion Circle / Checkmark */}
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle
                        className={`w-6 h-6 shrink-0 transition-colors ${
                          isRecommended
                            ? 'text-cyan-400'
                            : 'text-slate-600 group-hover:text-cyan-400'
                        }`}
                      />
                    )}

                    {/* Number & Clickable Underlined Link */}
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="text-sm font-mono font-bold text-slate-300 w-8 shrink-0">
                        {item.num}
                      </span>
                      <span className="text-sm sm:text-base text-cyan-400 group-hover:text-cyan-300 underline decoration-cyan-500/40 group-hover:decoration-cyan-300 underline-offset-4 truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* Estimated Duration */}
                  <span className="text-xs font-mono text-slate-400 shrink-0 ml-3">
                    {item.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floating "Next Lesson ->" Circular Play Button (Bottom-Right of Lesson Area) */}
          {activeLessonId < LESSONS.length && (
            <div className="max-w-xl mx-auto mt-6 flex justify-end">
              <button
                onClick={() => onSelectLessonTab(activeLessonId + 1)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
                title={`Jump to Lesson ${activeLessonId + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  Lesson {activeLessonId + 1}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Course Progress Footer Bar */}
        <div className="max-w-3xl w-full mx-auto mt-8 pt-4 border-t border-slate-800/90 bg-slate-900/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2 space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Course progress</span>
              <span className="text-cyan-400 font-bold">{courseProgressPct}%</span>
            </div>
            <div className="w-full h-3 rounded bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-sm transition-all duration-300"
                style={{ width: `${Math.max(4, courseProgressPct)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onStartDrill(currentLesson.id, 'key', 0)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition cursor-pointer"
            >
              Start Lesson {currentLesson.id}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT-HAND NAVIGATION SIDEBAR (Matching TypingMaster Reference) */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#0c1018] border-t md:border-t-0 md:border-l border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Top-Right Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onCloseToWorkspace}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition group cursor-pointer"
            >
              <span>Close</span>
              <span className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center transition">
                <X className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Vertical Sidebar Navigation Links */}
          <nav className="space-y-1.5" aria-label="Course navigation">
            <div
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-transparent border-l-4 border-cyan-400 text-white font-bold text-xs tracking-wider uppercase"
              aria-current="page"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>STUDYING</span>
            </div>

            <button
              onClick={onCloseToWorkspace}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
            >
              <Gauge className="w-4 h-4 text-slate-500" />
              <span>ACTIVE DRILL</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-slate-500" />
              <span>STUDENT PROFILE</span>
            </button>

            <button
              onClick={() => onStartDrill(currentLesson.id, 'paragraph', 0)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 text-xs font-semibold tracking-wider uppercase transition cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>TYPING TEST</span>
            </button>
          </nav>
        </div>

        {/* Bottom Brand Stamp */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Keyboard className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black tracking-wide text-white">
              NASEER <span className="text-cyan-400">TYPING</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500">Course Edition</div>
          </div>
        </div>
      </aside>
    </div>
  );
}