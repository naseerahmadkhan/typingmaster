# Naseer Typing Master

A modern, high-fidelity React typing tutor inspired by classic desktop typing software, featuring a dark obsidian aesthetic, Web Audio API mechanical switch synthesis, and an interactive 60% RGB mechanical keyboard.

---

## Features

### 1. Structured 12-Lesson Course Hub
- **TypingMaster-Inspired Dashboard**: Horizontal lesson navigation tabs (`1` – `12`), numbered sub-modules (`1.1`, `1.2`, `1.3`), estimated drill durations, and visual completion checkmarks.
- **Persistent Progress Tracking**: Automatically saves student profiles, active lessons, completed drills, and historical WPM/accuracy metrics in `localStorage`.
- **Custom Drill Imports**: Import custom `.txt` word lists and paragraphs directly inside any lesson module.

### 2. Three Specialized Drill Modes
- **Key Drill**: Renders a centered, 2-column grid of 10 tactile 3D mechanical keycaps per row with active emerald/cyan elevation and recessed completed states.
- **Word Drill**: Features an anchored right-aligned vanishing word stream with a stationary `▶` play pointer that consumes typed letters smoothly without horizontal layout shifting.
- **Paragraph Drill**: Split-pane 3-row paginated layout displaying reference lines on top and live typed output below, supporting free-flow typing, `Backspace` corrections, and whole-word red underlining for typos.

### 3. 60% RGB Gaming Mechanical Keyboard
- **Animated RGB Lighting Modes**: Switch live between `WAVE` (diagonal spectrum sweep), `CYBER` (dual-zone cyan/magenta), `BREATHE`, and `REACTIVE` lighting.
- **Tactile & Visual Guidance**: Displays per-key finger assignment badges (`LP`, `LR`, `LM`, `LI`, `THUMB`, `RI`, `RM`, `RR`, `RP`), home-row homing bars (`F` / `J`), pulsing target-key beacons, and reactive press/mistake animations.

### 4. Web Audio Mechanical Sound Engine
- **Procedural Switch Synthesis**: Synthesizes realistic mechanical switch acoustics (`Blue` clicky, `Brown` tactile, `Red` linear) with subtle pitch randomization for natural typing feedback, alongside audio mute controls.

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Icons**: Lucide React
- **Audio**: Native Web Audio API (`AudioContext`)
- **Storage**: Browser `localStorage`

---

## Project Structure

```text
src/
├── components/
│   ├── common/          # Top header bar & controls
│   ├── course/          # CourseDashboard (1–12 lesson hub & sidebar)
│   ├── drill/           # TextStreamViewer, StatsBar, NavigationTabs, FileSubBar
│   ├── keyboard/        # 60% RGB MechanicalKeyboard & finger legend
│   └── modals/          # SplashScreen, NamePromptModal, CompletionModal
├── constants/
│   └── keyboardLayout.js # Finger mappings & key metadata
├── hooks/
│   └── useTypingEngine.js # Core keystroke validation, WPM/accuracy & timer engine
├── lessons/             # Structured lesson modules & raw .txt drills
├── services/
│   ├── audioEngine.js   # Web Audio API mechanical switch synthesizer
│   └── storageService.js # LocalStorage persistence layer
├── App.jsx              # Main workspace & modal orchestration
└── index.css            # Tailwind directives & RGB keyframe animations