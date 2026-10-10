import { PlaylistItem } from '../types';

export class SoundEngine {
  private audioCtx: AudioContext | null = null;
  public isPlaying: boolean = false;
  public currentTrackIndex: number = 0;
  private synthInterval: any = null;
  private audioElement: HTMLAudioElement | null = null;
  public volume: number = 0.5;
  public mode: 'stream' | 'synth' = 'stream';
  public onStateChange: ((state: { isPlaying: boolean; currentTrackIndex: number; currentTrack?: PlaylistItem }) => void) | null = null;

  init(): void {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.volume = this.volume;
      this.audioElement.loop = false;

      this.audioElement.addEventListener('ended', () => {
        if (this.onStateChange) {
          // auto next track
        }
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn("Audio stream fallback to synth mode", e);
        this.mode = 'synth';
      });
    }
  }

  setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  private getFrequency(pitch: string): number {
    const notes: Record<string, number> = {
      "C4": 261.63, "C#4": 277.18, "Db4": 277.18, "D4": 293.66, "D#4": 311.13, "Eb4": 311.13, "E4": 329.63,
      "F4": 349.23, "F#4": 369.99, "Gb4": 369.99, "G4": 392.00, "G#4": 415.30, "Ab4": 415.30, "A4": 440.00,
      "A#4": 466.16, "Bb4": 466.16, "B4": 493.88,
      "C5": 523.25, "C#5": 554.37, "Db5": 554.37, "D5": 587.33, "D#5": 622.25, "Eb5": 622.25, "E5": 659.25,
      "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "Ab5": 830.61, "A5": 880.00, "Bb5": 932.33, "B5": 987.77
    };
    return notes[pitch] || 440;
  }

  playPianoTone(freq: number, duration: number = 1.0): void {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(1.5, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.25 * this.volume, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.12 * this.volume, now + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const osc2 = this.audioCtx.createOscillator();
    const gain2 = this.audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.06 * this.volume, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  playVinylScratch(): void {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const bufferSize = this.audioCtx.sampleRate * 0.35;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    const gain = this.audioCtx.createGain();
    gain.gain.value = 0.15 * this.volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);
    noise.start();
  }

  playTrack(trackList: PlaylistItem[], index: number): void {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.currentTrackIndex = (index + trackList.length) % trackList.length;
    const currentTrack = trackList[this.currentTrackIndex];
    this.isPlaying = true;

    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }

    if (currentTrack.audioUrl && this.mode === 'stream' && this.audioElement) {
      this.audioElement.src = currentTrack.audioUrl;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio autoplay notice:", err);
          this.playSynthMelody(currentTrack);
        });
      }
    } else {
      this.playSynthMelody(currentTrack);
    }

    if (this.onStateChange) {
      this.onStateChange({
        isPlaying: true,
        currentTrackIndex: this.currentTrackIndex,
        currentTrack
      });
    }
  }

  playSynthMelody(track: PlaylistItem): void {
    if (!track.notes || track.notes.length === 0) return;
    let noteIdx = 0;
    
    const playNext = () => {
      if (!this.isPlaying) return;
      const note = track.notes[noteIdx % track.notes.length];
      const freq = this.getFrequency(note.pitch);
      this.playPianoTone(freq, note.duration || 1.0);
      noteIdx++;
    };

    playNext();
    this.synthInterval = setInterval(playNext, 1100);
  }

  pause(): void {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.onStateChange) {
      this.onStateChange({ isPlaying: false, currentTrackIndex: this.currentTrackIndex });
    }
  }

  toggle(trackList: PlaylistItem[]): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playTrack(trackList, this.currentTrackIndex);
    }
  }
}

export const soundEngine = new SoundEngine();
