import React from 'react';
import { RotateCcw, Target, Type, TextQuote, AlignLeft } from 'lucide-react';

export default function NavigationTabs({ activeTab, onTabChange, onRestart }) {
  const tabs = [
    { id: 'key', label: '1. Key Drill', icon: Target, desc: 'Key rhythm & muscle memory' },
    { id: 'word', label: '2. Word Drill', icon: Type, desc: 'Target key vocabulary' },
    { id: 'sentence', label: '3. Sentence Drill', icon: TextQuote, desc: 'Sentence flow & cadence' },
    { id: 'paragraph', label: '4. Paragraph Drill', icon: AlignLeft, desc: 'Multiline flowing text' },
  ];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full px-3 py-2 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-tight truncate">{tab.label}</div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{tab.desc}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
      >
        <RotateCcw className="w-3 h-3 text-cyan-400" />
        <span>Restart Drill</span>
      </button>
    </div>
  );
}
