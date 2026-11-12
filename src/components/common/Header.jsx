import React from 'react';
import { Keyboard, User, Volume2, VolumeX, Hand, Layers } from 'lucide-react';

export default function Header({
  studentName,
  activeLesson,
  switchType,
  onSwitchChange,
  isMuted,
  onToggleMute,
  showFingerGuide,
  onToggleFingerGuide,
  onOpenProfile,
  onOpenLessonMenu,
}) {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-3 sm:px-6 md:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1.5px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Keyboard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5">
            <span className="text-cyan-400">NASEER</span>
            <span className="text-white">TYPING MASTER</span>
          </div>
          <button
            onClick={onOpenLessonMenu}
            className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1 hover:underline cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate max-w-[140px] sm:max-w-none">{activeLesson.title}</span>
            <Layers className="w-3 h-3 text-cyan-400 ml-0.5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <button
          onClick={onOpenLessonMenu}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-[11px] sm:text-xs font-mono transition"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Change Lesson</span>
          <span className="sm:hidden font-semibold">Lessons</span>
        </button>

        <button
          onClick={onOpenProfile}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-xs font-mono transition group"
          title="Change Student Profile"
        >
          <div className="w-5 h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-300 font-semibold group-hover:text-white hidden md:inline truncate max-w-[100px]">
            {studentName || 'Student'}
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {[
            { id: 'blue', label: 'Blue', dot: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' },
            { id: 'brown', label: 'Brown', dot: 'bg-amber-600 shadow-[0_0_8px_#d97706]' },
            { id: 'red', label: 'Red', dot: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' },
          ].map((sw) => (
            <button
              key={sw.id}
              onClick={() => onSwitchChange(sw.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                switchType === sw.id
                  ? 'bg-slate-800 text-white font-semibold shadow-inner'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${sw.dot}`} />
              {sw.label}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleMute}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition"
          title={isMuted ? 'Unmute' : 'Mute switches'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={onToggleFingerGuide}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
            showFingerGuide
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
              : 'bg-slate-800/80 border-slate-700 text-slate-400'
          }`}
        >
          <Hand className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Finger Guide</span>
        </button>
      </div>
    </header>
  );
}
