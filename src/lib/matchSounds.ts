/**
 * Match Animation Sound Manager
 * 
 * Specialized audio management for the cinematic matchmaking animation.
 * Handles autoplay restrictions, mobile compatibility, and smooth fades.
 */

import { Howl, Howler } from "howler";

// ============================================
// Types
// ============================================

export type MatchSoundName = 
  | "cosmicAmbience"
  | "deepBell"
  | "whoosh"
  | "divineChime"
  | "lightBurst"
  | "heartbeat";

interface SoundInstance {
  howl: Howl;
  isLoaded: boolean;
  loadError: boolean;
}

// ============================================
// Sound URLs (using free CDN sounds for demo)
// Replace with your own sounds in /public/sounds/
// ============================================

const SOUND_SOURCES: Record<MatchSoundName, string[]> = {
  // Deep ambient space drone - loops continuously
  cosmicAmbience: [
    "/sounds/cosmic-ambience.mp3",
    "/sounds/cosmic-ambience.ogg",
  ],
  // Deep resonant bell for match start
  deepBell: [
    "/sounds/deep-bell.mp3",
    "/sounds/deep-bell.ogg",
  ],
  // Swoosh/whoosh for card movement
  whoosh: [
    "/sounds/whoosh.mp3",
    "/sounds/whoosh.ogg",
  ],
  // Bright divine chime for reveal
  divineChime: [
    "/sounds/divine-chime.mp3",
    "/sounds/divine-chime.ogg",
  ],
  // Bright flash sound
  lightBurst: [
    "/sounds/light-burst.mp3",
    "/sounds/light-burst.ogg",
  ],
  // Subtle heartbeat for tension
  heartbeat: [
    "/sounds/heartbeat.mp3",
    "/sounds/heartbeat.ogg",
  ],
};

// ============================================
// Match Sound Manager Class
// ============================================

class MatchSoundManager {
  private sounds: Map<MatchSoundName, SoundInstance> = new Map();
  private isInitialized: boolean = false;
  private isUnlocked: boolean = false;
  private isMuted: boolean = false;
  private masterVolume: number = 0.7;
  private fadeTimers: Map<MatchSoundName, NodeJS.Timeout> = new Map();
  private useFallback: boolean = false;

  // Audio context for fallback sounds
  private audioContext: AudioContext | null = null;

  /**
   * Initialize all sounds for the match animation.
   * Should be called once, ideally after user interaction.
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    // Check for reduced motion preference
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        this.isMuted = true;
      }
    }

    // Initialize Howler settings
    Howler.autoUnlock = true;
    Howler.html5PoolSize = 10;

    // Create Howl instances for each sound
    const loadPromises: Promise<void>[] = [];

    (Object.entries(SOUND_SOURCES) as [MatchSoundName, string[]][]).forEach(
      ([name, sources]) => {
        const isAmbience = name === "cosmicAmbience";
        const isHeartbeat = name === "heartbeat";

        const howl = new Howl({
          src: sources,
          volume: this.getDefaultVolume(name),
          loop: isAmbience || isHeartbeat,
          preload: true,
          html5: isAmbience, // Use HTML5 for long audio to stream
          onloaderror: (_id, error) => {
            console.warn(`Failed to load sound "${name}":`, error);
            const instance = this.sounds.get(name);
            if (instance) {
              instance.loadError = true;
            }
            // Enable fallback mode
            this.useFallback = true;
          },
          onload: () => {
            const instance = this.sounds.get(name);
            if (instance) {
              instance.isLoaded = true;
            }
          },
        });

        this.sounds.set(name, {
          howl,
          isLoaded: false,
          loadError: false,
        });

        // Create load promise
        loadPromises.push(
          new Promise<void>((resolve) => {
            howl.once("load", () => resolve());
            howl.once("loaderror", () => resolve()); // Resolve anyway to not block
          })
        );
      }
    );

    // Wait for all sounds to load (with timeout)
    await Promise.race([
      Promise.all(loadPromises),
      new Promise<void>((resolve) => setTimeout(resolve, 5000)), // 5s timeout
    ]);

    this.isInitialized = true;
  }

  /**
   * Get default volume for each sound type.
   */
  private getDefaultVolume(name: MatchSoundName): number {
    const volumes: Record<MatchSoundName, number> = {
      cosmicAmbience: 0.15,
      deepBell: 0.5,
      whoosh: 0.35,
      divineChime: 0.45,
      lightBurst: 0.4,
      heartbeat: 0.2,
    };
    return volumes[name];
  }

  /**
   * Unlock audio context (required for mobile autoplay).
   * Call this on first user interaction.
   */
  unlock(): void {
    if (this.isUnlocked) return;

    // Resume Howler's audio context
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }

    // Create Web Audio context for fallback
    try {
      this.audioContext = new (window.AudioContext || 
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
    } catch (e) {
      console.warn("Web Audio API not available");
    }

    this.isUnlocked = true;
  }

  /**
   * Check if audio is unlocked and ready.
   */
  isReady(): boolean {
    return this.isInitialized && this.isUnlocked;
  }

  /**
   * Play a sound with optional fade-in.
   */
  play(
    name: MatchSoundName,
    options: { fadeIn?: number; volume?: number } = {}
  ): number | undefined {
    if (this.isMuted) return;

    const instance = this.sounds.get(name);
    
    // Use fallback if sound failed to load
    if (!instance || instance.loadError) {
      return this.playFallback(name);
    }

    if (!instance.isLoaded) {
      console.warn(`Sound "${name}" not loaded yet`);
      return;
    }

    const { fadeIn = 0, volume } = options;
    const targetVolume = volume ?? this.getDefaultVolume(name);

    if (fadeIn > 0) {
      instance.howl.volume(0);
      const id = instance.howl.play();
      instance.howl.fade(0, targetVolume * this.masterVolume, fadeIn, id);
      return id;
    }

    instance.howl.volume(targetVolume * this.masterVolume);
    return instance.howl.play();
  }

  /**
   * Stop a sound with optional fade-out.
   */
  stop(name: MatchSoundName, fadeOut: number = 0): void {
    const instance = this.sounds.get(name);
    if (!instance || !instance.isLoaded) return;

    // Clear any existing fade timer
    const existingTimer = this.fadeTimers.get(name);
    if (existingTimer) {
      clearTimeout(existingTimer);
      this.fadeTimers.delete(name);
    }

    if (fadeOut > 0) {
      const currentVolume = instance.howl.volume() as number;
      instance.howl.fade(currentVolume, 0, fadeOut);
      
      // Stop after fade completes
      const timer = setTimeout(() => {
        instance.howl.stop();
        this.fadeTimers.delete(name);
      }, fadeOut);
      
      this.fadeTimers.set(name, timer);
    } else {
      instance.howl.stop();
    }
  }

  /**
   * Stop all sounds.
   */
  stopAll(fadeOut: number = 500): void {
    this.sounds.forEach((_, name) => {
      this.stop(name, fadeOut);
    });
  }

  /**
   * Fade volume of a playing sound.
   */
  fade(
    name: MatchSoundName,
    from: number,
    to: number,
    duration: number
  ): void {
    const instance = this.sounds.get(name);
    if (!instance || !instance.isLoaded) return;

    instance.howl.fade(
      from * this.masterVolume,
      to * this.masterVolume,
      duration
    );
  }

  /**
   * Set master volume.
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.masterVolume);
  }

  /**
   * Mute all sounds.
   */
  mute(): void {
    this.isMuted = true;
    Howler.mute(true);
  }

  /**
   * Unmute all sounds.
   */
  unmute(): void {
    this.isMuted = false;
    Howler.mute(false);
  }

  /**
   * Toggle mute state.
   */
  toggleMute(): boolean {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this.isMuted;
  }

  /**
   * Check if muted.
   */
  isSoundMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play fallback sound using Web Audio API.
   * Used when Howler fails to load external files.
   */
  private playFallback(name: MatchSoundName): number | undefined {
    if (!this.audioContext || this.isMuted) return;

    try {
      const now = this.audioContext.currentTime;

      switch (name) {
        case "deepBell":
          this.playBellFallback(now);
          break;
        case "divineChime":
          this.playChimeFallback(now);
          break;
        case "whoosh":
          this.playWhooshFallback(now);
          break;
        case "lightBurst":
          this.playBurstFallback(now);
          break;
        default:
          // No fallback for ambient/heartbeat
          break;
      }
    } catch (e) {
      console.warn("Fallback sound failed:", e);
    }

    return undefined;
  }

  /**
   * Generate deep bell using oscillators.
   */
  private playBellFallback(now: number): void {
    if (!this.audioContext) return;

    const frequencies = [220, 440, 660]; // A3, A4, E5
    const volumes = [0.3, 0.2, 0.1];
    const decays = [2.5, 2, 1.5];

    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(volumes[i] * this.masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + decays[i]);
      
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      
      osc.start(now);
      osc.stop(now + decays[i]);
    });
  }

  /**
   * Generate divine chime using oscillators.
   */
  private playChimeFallback(now: number): void {
    if (!this.audioContext) return;

    const frequencies = [1047, 1319, 1568, 2093]; // C6, E6, G6, C7
    
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15 * this.masterVolume, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5 + i * 0.1);
      
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      
      osc.start(now);
      osc.stop(now + 2);
    });
  }

  /**
   * Generate whoosh using filtered noise.
   */
  private playWhooshFallback(now: number): void {
    if (!this.audioContext) return;

    // Create noise buffer
    const bufferSize = this.audioContext.sampleRate * 0.5;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    filter.Q.value = 1;

    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2 * this.masterVolume, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);

    noise.start(now);
    noise.stop(now + 0.5);
  }

  /**
   * Generate light burst sound.
   */
  private playBurstFallback(now: number): void {
    if (!this.audioContext) return;

    // Short bright burst
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    
    gain.gain.setValueAtTime(0.3 * this.masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Cleanup - call when component unmounts.
   */
  destroy(): void {
    this.stopAll(0);
    this.fadeTimers.forEach((timer) => clearTimeout(timer));
    this.fadeTimers.clear();
    this.sounds.forEach((instance) => instance.howl.unload());
    this.sounds.clear();
    this.isInitialized = false;
  }
}

// ============================================
// Singleton Export
// ============================================

export const matchSoundManager = new MatchSoundManager();

// ============================================
// React Hook for Match Sounds
// ============================================

import { useEffect, useCallback, useRef } from "react";

export function useMatchSounds() {
  const isInitializedRef = useRef(false);

  // Initialize on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      matchSoundManager.init();
      isInitializedRef.current = true;
    }

    return () => {
      // Don't destroy on unmount - sounds may still be playing
    };
  }, []);

  // Unlock audio on first interaction
  const unlockAudio = useCallback(() => {
    matchSoundManager.unlock();
  }, []);

  // Play sound
  const play = useCallback(
    (name: MatchSoundName, options?: { fadeIn?: number; volume?: number }) => {
      return matchSoundManager.play(name, options);
    },
    []
  );

  // Stop sound
  const stop = useCallback((name: MatchSoundName, fadeOut?: number) => {
    matchSoundManager.stop(name, fadeOut);
  }, []);

  // Stop all sounds
  const stopAll = useCallback((fadeOut?: number) => {
    matchSoundManager.stopAll(fadeOut);
  }, []);

  // Fade sound
  const fade = useCallback(
    (name: MatchSoundName, from: number, to: number, duration: number) => {
      matchSoundManager.fade(name, from, to, duration);
    },
    []
  );

  // Toggle mute
  const toggleMute = useCallback(() => {
    return matchSoundManager.toggleMute();
  }, []);

  // Check if muted
  const isMuted = useCallback(() => {
    return matchSoundManager.isSoundMuted();
  }, []);

  return {
    unlockAudio,
    play,
    stop,
    stopAll,
    fade,
    toggleMute,
    isMuted,
    isReady: () => matchSoundManager.isReady(),
  };
}

export default matchSoundManager;
