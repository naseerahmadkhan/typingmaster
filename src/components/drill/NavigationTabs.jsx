import React from 'react';
import { RotateCcw, Target, Type, MessageSquareText, AlignLeft } from 'lucide-react';

export default function NavigationTabs({ activeTab, onTabChange, onRestart }) {
  const tabs = [
    { id: 'key', label: 'Key Drill', desc: 'Key rhythm & muscle memory', icon: Target },
    { id: 'word', label: 'Word Drill', desc: 'Target key vocabulary', icon: Type },
    { id: 'sentence', label: 'Sentence Drill', desc: 'Single-line sentence flow', icon: MessageSquareText },
    { id: 'paragraph', label: 'Paragraph Drill', desc: 'Multiline flowing text', icon: AlignLeft },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition cursor-pointer ${
              isActive
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div className="min-w-0">
              <div className="text-xs font-bold leading-tight">
                {idx + 1}. {tab.label}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{tab.desc}</div>
            </div>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onRestart}
        className="mt-1 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Restart Drill
      </button>
    </div>
  );
}