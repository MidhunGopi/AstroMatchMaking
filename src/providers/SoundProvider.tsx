"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { soundManager, SoundName } from "@/lib/sounds";

// ============================================
// Types
// ============================================

interface SoundContextValue {
  /** Whether sounds are muted */
  isMuted: boolean;
  /** Toggle mute state */
  toggleMute: () => void;
  /** Mute all sounds */
  mute: () => void;
  /** Unmute all sounds */
  unmute: () => void;
  /** Play a sound by name */
  play: (name: SoundName) => void;
  /** Stop a sound by name */
  stop: (name: SoundName) => void;
  /** Stop all sounds */
  stopAll: () => void;
  /** Master volume (0-1) */
  volume: number;
  /** Set master volume */
  setVolume: (volume: number) => void;
  /** Whether the sound system is initialized */
  isInitialized: boolean;
}

// ============================================
// Context
// ============================================

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [volume, setVolumeState] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize sound manager on mount
  useEffect(() => {
    // Only initialize after user interaction (to comply with browser autoplay policies)
    const initOnInteraction = () => {
      if (!isInitialized) {
        soundManager.init();
        setIsInitialized(true);
        setIsMuted(soundManager.getIsMuted());
        
        // Remove listeners after first interaction
        document.removeEventListener("click", initOnInteraction);
        document.removeEventListener("keydown", initOnInteraction);
        document.removeEventListener("touchstart", initOnInteraction);
      }
    };

    document.addEventListener("click", initOnInteraction);
    document.addEventListener("keydown", initOnInteraction);
    document.addEventListener("touchstart", initOnInteraction);

    return () => {
      document.removeEventListener("click", initOnInteraction);
      document.removeEventListener("keydown", initOnInteraction);
      document.removeEventListener("touchstart", initOnInteraction);
    };
  }, [isInitialized]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundManager.destroy();
    };
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  }, []);

  const mute = useCallback(() => {
    soundManager.mute();
    setIsMuted(true);
  }, []);

  const unmute = useCallback(() => {
    soundManager.unmute();
    setIsMuted(false);
  }, []);

  const play = useCallback((name: SoundName) => {
    if (isInitialized) {
      soundManager.play(name);
    }
  }, [isInitialized]);

  const stop = useCallback((name: SoundName) => {
    soundManager.stop(name);
  }, []);

  const stopAll = useCallback(() => {
    soundManager.stopAll();
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    soundManager.setMasterVolume(newVolume);
    setVolumeState(newVolume);
  }, []);

  const value: SoundContextValue = {
    isMuted,
    toggleMute,
    mute,
    unmute,
    play,
    stop,
    stopAll,
    volume,
    setVolume,
    isInitialized,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

/**
 * Hook to access sound functionality.
 * Must be used within a SoundProvider.
 */
export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);
  
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  
  return context;
}
