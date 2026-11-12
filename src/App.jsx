import React, { useState, useMemo } from 'react';
import Header from './components/common/Header';
import MechanicalKeyboard from './components/keyboard/MechanicalKeyboard';
import StatsBar from './components/drill/StatsBar';
import TextStreamViewer from './components/drill/TextStreamViewer';
import NavigationTabs from './components/drill/NavigationTabs';
import SplashScreen from './components/modals/SplashScreen';
import NamePromptModal from './components/modals/NamePromptModal';
import CourseDashboard from './components/course/CourseDashboard';
import CompletionModal from './components/modals/CompletionModal';

import { useTypingEngine } from './hooks/useTypingEngine';
import { audioEngine } from './services/audioEngine';
import { storageService } from './services/storageService';
import { LESSONS, getLessonById } from './lessons';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [studentName, setStudentName] = useState(() => storageService.getStudentName());
  const [showNameModal, setShowNameModal] = useState(false);
  const [showCourseMenu, setShowCourseMenu] = useState(false);

  const [switchType, setSwitchType] = useState('blue');
  const [isMuted, setIsMuted] = useState(false);
  const [showFingerGuide, setShowFingerGuide] = useState(true);

  const [activeLessonId, setActiveLessonId] = useState(() => storageService.getActiveLessonId());
  const [activeTab, setActiveTab] = useState('key');
  const [wordFileIdx, setWordFileIdx] = useState(0);
  const [paragraphFileIdx, setParagraphFileIdx] = useState(0);
  const [completedDrills, setCompletedDrills] = useState(() => storageService.getCompletedDrills());

  const currentLesson = useMemo(() => getLessonById(activeLessonId), [activeLessonId]);

  const currentDrillText = useMemo(() => {
    let raw = '';
    if (activeTab === 'key') {
      raw = currentLesson.keyDrill || '';
    } else if (activeTab === 'word') {
      raw = currentLesson.wordDrills[wordFileIdx]?.text || '';
    } else if (activeTab === 'paragraph') {
      raw = currentLesson.paragraphDrills[paragraphFileIdx]?.text || '';
    }

    return raw
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0)
      .join('\n');
  }, [currentLesson, activeTab, wordFileIdx, paragraphFileIdx]);

  const activeFileIndex = activeTab === 'word' ? wordFileIdx : activeTab === 'paragraph' ? paragraphFileIdx : 0;

  const {
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
  } = useTypingEngine({
    text: currentDrillText,
    isEnabled: hasStarted && !showNameModal && !showCourseMenu,
    studentName,
    lessonId: activeLessonId,
    drillType: activeTab,
    onFinished: () => {
      const updated = storageService.markDrillCompleted(activeLessonId, activeTab, activeFileIndex);
      setCompletedDrills(updated);
    },
  });

  const handleSwitchChange = (type) => {
    setSwitchType(type);
    audioEngine.setSwitchType(type);
    audioEngine.playClick();
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMuted(next);
  };

  const handleStartFromSplash = () => {
    audioEngine.init();
    setHasStarted(true);
    if (!studentName) {
      setShowNameModal(true);
    } else {
      setShowCourseMenu(true);
    }
  };

  const handleSaveStudentName = (name) => {
    storageService.saveStudentName(name);
    setStudentName(name);
    setShowNameModal(false);
    setShowCourseMenu(true);
  };

  // Triggered when clicking any item (1.1 Key drill, 1.2 Word drill, etc.) in CourseDashboard
  const handleLaunchDrill = (lessonId, drillType, fileIdx = 0) => {
    setActiveLessonId(lessonId);
    storageService.saveActiveLessonId(lessonId);
    setActiveTab(drillType);
    if (drillType === 'word') setWordFileIdx(fileIdx);
    if (drillType === 'paragraph') setParagraphFileIdx(fileIdx);
    setShowCourseMenu(false);
    resetDrill();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetDrill();
  };

  const handleNextDrill = () => {
    if (activeTab === 'key') {
      handleTabChange('word');
    } else if (activeTab === 'word') {
      handleTabChange('paragraph');
    } else {
      if (activeLessonId < LESSONS.length) {
        handleLaunchDrill(activeLessonId + 1, 'key', 0);
      } else {
        setShowCourseMenu(true);
      }
    }
  };

  return (
    <main className="h-screen w-screen bg-[#07090e] text-slate-100 flex flex-col select-none overflow-hidden">
      {!hasStarted && <SplashScreen onStart={handleStartFromSplash} />}

      {showNameModal && (
        <NamePromptModal
          defaultName={studentName}
          isClosable={Boolean(studentName)}
          onClose={() => {
            setShowNameModal(false);
            setShowCourseMenu(true);
          }}
          onSave={handleSaveStudentName}
        />
      )}

      {/* TypingMaster-Style Course Hub (Numbers 1-12 at top, numbered sub-lessons, right sidebar) */}
      {showCourseMenu && (
        <CourseDashboard
          activeLessonId={activeLessonId}
          onSelectLessonTab={(id) => {
            setActiveLessonId(id);
            storageService.saveActiveLessonId(id);
          }}
          onStartDrill={handleLaunchDrill}
          completedDrills={completedDrills}
          studentName={studentName}
          onCloseToWorkspace={() => setShowCourseMenu(false)}
          onOpenProfile={() => {
            setShowCourseMenu(false);
            setShowNameModal(true);
          }}
        />
      )}

      <Header
        studentName={studentName}
        activeLesson={currentLesson}
        switchType={switchType}
        onSwitchChange={handleSwitchChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        showFingerGuide={showFingerGuide}
        onToggleFingerGuide={() => setShowFingerGuide(!showFingerGuide)}
        onOpenProfile={() => setShowNameModal(true)}
        onOpenLessonMenu={() => setShowCourseMenu(true)}
      />

      {/* Zero-Scroll Split Workspace */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto p-2 sm:p-3 flex gap-3 overflow-hidden">
        <div className="flex-1 flex flex-col gap-2.5 min-w-0 h-full overflow-hidden">
          <div className="flex-1 min-h-0">
            <TextStreamViewer
              text={currentDrillText}
              charIndex={charIndex}
              typedChars={typedChars}
              targetKeyInfo={targetKeyInfo}
              containerRef={textScrollContainerRef}
              activeCharRef={activeCharRef}
              activeTab={activeTab}
            />
          </div>

          <div className="shrink-0">
            <MechanicalKeyboard
              targetChar={targetKeyInfo}
              pressedKey={pressedKey}
              lastMistakeKey={lastMistakeKey}
              showFingerGuide={showFingerGuide}
              activeLesson={currentLesson}
            />
          </div>
        </div>

        {/* Right Sidebar Menu */}
        <div className="w-80 lg:w-96 shrink-0 flex flex-col gap-2.5 h-full overflow-y-auto pr-0.5">
          <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl flex flex-col gap-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold truncate">
                {currentLesson.title}
              </span>
              <button
                onClick={() => setShowCourseMenu(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-slate-200 transition cursor-pointer"
              >
                Course Menu
              </button>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              Target Keys: <strong className="text-white">{currentLesson.keys}</strong>
            </div>
            <div className="text-[11px] text-slate-400 leading-snug">
              {currentLesson.description}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-2.5 rounded-2xl shadow-lg">
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onRestart={resetDrill}
            />
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl shadow-lg flex-1 flex flex-col justify-start gap-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              Live Drill Metrics
            </div>
            <StatsBar stats={stats} />
          </div>
        </div>
      </div>

      {isFinished && (
        <CompletionModal
          stats={stats}
          studentName={studentName}
          activeLesson={currentLesson}
          onRestart={resetDrill}
          onNextDrill={handleNextDrill}
          onChooseLesson={() => setShowCourseMenu(true)}
        />
      )}
    </main>
  );
}