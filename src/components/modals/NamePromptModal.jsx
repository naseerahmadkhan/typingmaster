import React, { useState } from 'react';
import { UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function NamePromptModal({ defaultName, onSave, isClosable = false, onClose }) {
  const [inputVal, setInputVal] = useState(defaultName || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setError('Please enter your name to track your progress');
      return;
    }
    onSave(inputVal.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-[#0d121c] border border-slate-700/80 p-6 md:p-8 rounded-3xl shadow-2xl text-left space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">STUDENT PROFILE</h2>
            <p className="text-slate-400 text-xs">Enter your name to track and save lesson progress</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">YOUR FULL NAME</label>
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Alex Mercer"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-600 transition"
            />
            {error && <p className="text-rose-400 text-xs mt-1 font-mono">{error}</p>}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Your typing records (WPM, Accuracy, and Error rates) will be linked to this student profile.</span>
          </div>

          <div className="flex gap-2 pt-2">
            {isClosable && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
