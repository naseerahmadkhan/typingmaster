class AudioEngine {
  constructor() {
    this.ctx = null;
    this.switchType = 'blue';
    this.isMuted = false;

    // MP3 Buffer state
    this.audioBuffer = null;
    this.isLoadingMp3 = false;
    this.mp3Failed = false;
    this.mp3Url = '/sounds/click.mp3';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.loadMp3File(this.mp3Url);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  async loadMp3File(url) {
    if (this.audioBuffer || this.isLoadingMp3 || this.mp3Failed || !this.ctx) return;
    this.isLoadingMp3 = true;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (err) {
      this.mp3Failed = true;
    } finally {
      this.isLoadingMp3 = false;
    }
  }

  setSwitchType(type) {
    this.switchType = type;
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // 1. Natural Pitch & Frequency Modulated MP3 Playback
    if (this.audioBuffer) {
      try {
        const t = this.ctx.currentTime;
        const source = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        const gainNode = this.ctx.createGain();

        // 1. Natural pitch shift: varies frequency ±8% randomly per stroke (0.92 to 1.08)
        const pitchShift = 0.92 + Math.random() * 0.16;
        source.playbackRate.setValueAtTime(pitchShift, t);

        // 2. Frequency tone shaping: shifts keycap timbre (dark thud vs sharp clack)
        filter.type = 'lowpass';
        const randomCutoff = 3500 + Math.random() * 2500; // 3.5kHz to 6.0kHz
        filter.frequency.setValueAtTime(randomCutoff, t);

        // 3. Humanized strike force: slight volume variation (0.75 to 0.95)
        const randomVolume = 0.75 + Math.random() * 0.20;
        gainNode.gain.setValueAtTime(randomVolume, t);

        source.buffer = this.audioBuffer;

        // Routing: source -> filter -> gain -> speakers
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        source.start(0);
        return;
      } catch (e) {
        // Fall through to synthesizer on runtime buffer error
      }
    }

    // 2. Fallback: Run synthetic Web Audio API code if click.mp3 is unavailable
    this.playSyntheticClick();
  }

  playSyntheticClick() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';

    if (this.switchType === 'blue') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2600, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.045);

      filter.frequency.setValueAtTime(3200, t);
      filter.Q.setValueAtTime(4, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      this.playTransient(3800, 0.015, 0.25);
    } else if (this.switchType === 'brown') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.065);

      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(2.2, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);

      filter.frequency.setValueAtTime(650, t);
      filter.Q.setValueAtTime(1.5, t);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.085);
    }

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  playTransient(freq, dur, vol) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + dur);
  }

  playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.linearRampToValueAtTime(95, t + 0.12);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.13);
  }
}

export const audioEngine = new AudioEngine();