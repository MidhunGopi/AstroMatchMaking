/**
 * Howler.js Sound Management
 * 
 * Centralized audio management for the application.
 * Preload sounds and manage playback with consistent volume and settings.
 */

import { Howl, Howler } from "howler";

// ============================================
// Types
// ============================================

export interface SoundConfig {
  src: string[];
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}

export type SoundName = 
  | "click"
  | "hover"
  | "success"
  | "error"
  | "notification"
  | "transition"
  | "ambient";

// ============================================
// Sound Configuration
// ============================================

/**
 * Define all sounds used in the application.
 * Add audio files to the public/sounds directory.
 * 
 * Note: Sound files are not included - add your own audio files
 * to /public/sounds/ directory matching these paths.
 */
const soundConfigs: Record<SoundName, SoundConfig> = {
  click: {
    src: ["/sounds/click.mp3", "/sounds/click.webm"],
    volume: 0.5,
  },
  hover: {
    src: ["/sounds/hover.mp3", "/sounds/hover.webm"],
    volume: 0.3,
  },
  success: {
    src: ["/sounds/success.mp3", "/sounds/success.webm"],
    volume: 0.6,
  },
  error: {
    src: ["/sounds/error.mp3", "/sounds/error.webm"],
    volume: 0.5,
  },
  notification: {
    src: ["/sounds/notification.mp3", "/sounds/notification.webm"],
    volume: 0.5,
  },
  transition: {
    src: ["/sounds/transition.mp3", "/sounds/transition.webm"],
    volume: 0.4,
  },
  ambient: {
    src: ["/sounds/ambient.mp3", "/sounds/ambient.webm"],
    volume: 0.2,
    loop: true,
  },
};

// ============================================
// Sound Manager Class
// ============================================

class SoundManager {
  private sounds: Map<SoundName, Howl> = new Map();
  private isMuted: boolean = false;
  private masterVolume: number = 1;
  private isInitialized: boolean = false;

  /**
   * Initialize and preload all sounds.
   * Call this once when the app starts.
   */
  init(): void {
    if (this.isInitialized) return;

    // Check if user prefers reduced motion
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      
      if (prefersReducedMotion) {
        this.isMuted = true;
      }
    }

    // Preload all sounds
    Object.entries(soundConfigs).forEach(([name, config]) => {
      const howl = new Howl({
        src: config.src,
        volume: config.volume ?? 0.5,
        loop: config.loop ?? false,
        preload: config.preload ?? true,
      });

      this.sounds.set(name as SoundName, howl);
    });

    this.isInitialized = true;
  }

  /**
   * Play a sound by name.
   */
  play(name: SoundName): number | undefined {
    if (this.isMuted) return;

    const sound = this.sounds.get(name);
    if (sound) {
      return sound.play();
    }

    console.warn(`Sound "${name}" not found`);
    return undefined;
  }

  /**
   * Stop a sound by name.
   */
  stop(name: SoundName): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.stop();
    }
  }

  /**
   * Stop all sounds.
   */
  stopAll(): void {
    this.sounds.forEach((sound) => sound.stop());
  }

  /**
   * Pause a sound by name.
   */
  pause(name: SoundName): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
    }
  }

  /**
   * Set the volume for a specific sound.
   */
  setVolume(name: SoundName, volume: number): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.volume(Math.max(0, Math.min(1, volume)));
    }
  }

  /**
   * Set the master volume for all sounds.
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.masterVolume);
  }

  /**
   * Get the current master volume.
   */
  getMasterVolume(): number {
    return this.masterVolume;
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
   * Check if sounds are muted.
   */
  getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Clean up and unload all sounds.
   */
  destroy(): void {
    this.sounds.forEach((sound) => sound.unload());
    this.sounds.clear();
    this.isInitialized = false;
  }
}

// ============================================
// Singleton Export
// ============================================

export const soundManager = new SoundManager();

// ============================================
// Convenience Functions
// ============================================

/**
 * Play a UI click sound.
 */
export const playClick = () => soundManager.play("click");

/**
 * Play a UI hover sound.
 */
export const playHover = () => soundManager.play("hover");

/**
 * Play a success sound.
 */
export const playSuccess = () => soundManager.play("success");

/**
 * Play an error sound.
 */
export const playError = () => soundManager.play("error");

/**
 * Play a notification sound.
 */
export const playNotification = () => soundManager.play("notification");
