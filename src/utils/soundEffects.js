// Web Audio API Synthesizer for instant interactive sound FX without external dependencies

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.isTuneLooping = false;
    this.tuneTimer = null;
    this.activeTuneNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopHappyBirthdayTune();
    }
    return this.muted;
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playSparkle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.06);
      osc.stop(this.ctx.currentTime + i * 0.06 + 0.25);
    });
  }

  playBlowCandle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.4);
  }

  playCakeCut() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Gentle noise slice effect (knife cutting cake frosting) without clashing pitched synth tones
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.18);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.18);
  }

  // Single-instance continuous looping Happy Birthday melody
  startHappyBirthdayTune() {
    if (this.muted) return;
    
    // If tune is already playing, do not start a second overlapping loop!
    if (this.isTuneLooping) {
      return;
    }

    this.stopHappyBirthdayTune();
    this.init();
    if (!this.ctx) return;

    this.isTuneLooping = true;
    this.playFullMelodyLoop();
  }

  stopHappyBirthdayTune() {
    this.isTuneLooping = false;
    if (this.tuneTimer) {
      clearTimeout(this.tuneTimer);
      this.tuneTimer = null;
    }

    if (this.activeTuneNodes && this.ctx) {
      const now = this.ctx.currentTime;
      this.activeTuneNodes.forEach((node) => {
        try {
          if (node.gain) {
            node.gain.gain.cancelScheduledValues(now);
            node.gain.gain.setValueAtTime(node.gain.gain.value, now);
            node.gain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
          }
          if (node.osc) {
            node.osc.stop(now + 0.05);
          }
        } catch (e) {
          // ignore already stopped nodes
        }
      });
      this.activeTuneNodes = [];
    }
  }

  playFullMelodyLoop() {
    if (!this.isTuneLooping || this.muted || !this.ctx) return;

    // Full 4-phrase Happy Birthday melody definition
    const melody = [
      // Phrase 1: Happy Birthday to You
      { note: 392.00, duration: 0.35 }, // G4
      { note: 392.00, duration: 0.35 }, // G4
      { note: 440.00, duration: 0.65 }, // A4
      { note: 392.00, duration: 0.65 }, // G4
      { note: 523.25, duration: 0.65 }, // C5
      { note: 493.88, duration: 1.10 }, // B4

      // Phrase 2: Happy Birthday to You
      { note: 392.00, duration: 0.35 }, // G4
      { note: 392.00, duration: 0.35 }, // G4
      { note: 440.00, duration: 0.65 }, // A4
      { note: 392.00, duration: 0.65 }, // G4
      { note: 587.33, duration: 0.65 }, // D5
      { note: 523.25, duration: 1.10 }, // C5

      // Phrase 3: Happy Birthday Dear Penguuu
      { note: 392.00, duration: 0.35 }, // G4
      { note: 392.00, duration: 0.35 }, // G4
      { note: 783.99, duration: 0.65 }, // G5
      { note: 659.25, duration: 0.65 }, // E5
      { note: 523.25, duration: 0.65 }, // C5
      { note: 493.88, duration: 0.65 }, // B4
      { note: 440.00, duration: 1.20 }, // A4

      // Phrase 4: Happy Birthday to You
      { note: 698.46, duration: 0.35 }, // F5
      { note: 698.46, duration: 0.35 }, // F5
      { note: 659.25, duration: 0.65 }, // E5
      { note: 523.25, duration: 0.65 }, // C5
      { note: 587.33, duration: 0.65 }, // D5
      { note: 523.25, duration: 1.30 }, // C5
    ];

    let timeOffset = 0;
    this.activeTuneNodes = [];

    melody.forEach((item) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, this.ctx.currentTime + timeOffset);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + timeOffset + item.duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + timeOffset);
      osc.stop(this.ctx.currentTime + timeOffset + item.duration);

      this.activeTuneNodes.push({ osc, gain });
      timeOffset += item.duration + 0.08;
    });

    // Schedule next loop iteration if still on page
    const totalDurationMs = (timeOffset + 0.5) * 1000;
    this.tuneTimer = setTimeout(() => {
      if (this.isTuneLooping) {
        this.playFullMelodyLoop();
      }
    }, totalDurationMs);
  }

  playHappyBirthdayTune() {
    this.startHappyBirthdayTune();
  }

  playFirework() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Launch noise whoosh followed by burst
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    // Burst pop
    setTimeout(() => {
      this.playSparkle();
    }, 200);
  }

  playPartyHorn() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(450, now + 0.15);
    osc.frequency.linearRampToValueAtTime(400, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0.2, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }
}

export const sounds = new SoundEffects();

