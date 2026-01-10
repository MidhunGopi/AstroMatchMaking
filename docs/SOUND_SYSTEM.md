# Match Animation Sound System

This document explains the Howler.js-based sound system integrated into the matchmaking animation.

## Sound Files Required

Place these audio files in `/public/sounds/`:

| Sound | Filename | Purpose |
|-------|----------|---------|
| Cosmic Ambience | `cosmic-ambience.mp3` | Looping background space drone |
| Deep Bell | `deep-bell.mp3` | Resonant bell on light rays |
| Whoosh | `whoosh.mp3` | Swoosh effect for card movement |
| Divine Chime | `divine-chime.mp3` | Bright chime on match reveal |
| Light Burst | `light-burst.mp3` | Flash/impact sound |
| Heartbeat | `heartbeat.mp3` | Optional tension building |

> **Fallback**: If files are missing, the system uses Web Audio API to generate procedural sounds.

---

## Usage in Animation Component

```tsx
import { MatchAnimation } from "@/components/animations/MatchAnimation";

<MatchAnimation
  matchResult={result}
  enableSound={true}  // Enable/disable sound
  onComplete={() => console.log("Done")}
/>
```

---

## Using the Sound Hook Directly

```tsx
import { useMatchSounds } from "@/lib/matchSounds";

function MyComponent() {
  const { play, stop, fade, toggleMute, unlockAudio } = useMatchSounds();

  // Unlock audio on first interaction (required for mobile)
  const handleClick = () => {
    unlockAudio();
    play("deepBell");
  };

  // Play with fade-in
  const startAmbience = () => {
    play("cosmicAmbience", { fadeIn: 2000, volume: 0.15 });
  };

  // Stop with fade-out
  const stopAmbience = () => {
    stop("cosmicAmbience", 1000); // 1 second fade
  };

  // Fade volume of playing sound
  const quietenAmbience = () => {
    fade("cosmicAmbience", 0.15, 0.05, 500);
  };

  return (
    <button onClick={handleClick}>Play Bell</button>
  );
}
```

---

## Sound Schedule in Animation

| Time | Sound | Action |
|------|-------|--------|
| 0ms | `cosmicAmbience` | Start with 2s fade-in |
| 2800ms | `deepBell` | Bell on light rays appear |
| 3500ms | `whoosh` | First whoosh on orbit start |
| 7000ms | `whoosh` | Second whoosh on merge |
| 8000ms | `cosmicAmbience` | Begin fade-out |
| 8500ms | `lightBurst` | Flash sound |
| 9500ms | `divineChime` | Chime on reveal |
| 10500ms | `cosmicAmbience` | Stop completely |

---

## Mobile Autoplay Handling

Mobile browsers block autoplay until user interaction. The system handles this:

1. **Auto-unlock**: Howler.js `autoUnlock` is enabled
2. **Interaction trigger**: Animation container captures click/touch
3. **Fallback**: If sounds fail to load, Web Audio API generates them

```tsx
// The animation automatically unlocks on interaction
<motion.div
  onClick={handleUserInteraction}
  onTouchStart={handleUserInteraction}
>
```

---

## API Reference

### `useMatchSounds()`

| Method | Signature | Description |
|--------|-----------|-------------|
| `play` | `(name, options?) => id` | Play a sound |
| `stop` | `(name, fadeOut?) => void` | Stop a sound |
| `stopAll` | `(fadeOut?) => void` | Stop all sounds |
| `fade` | `(name, from, to, duration) => void` | Fade volume |
| `toggleMute` | `() => boolean` | Toggle mute state |
| `isMuted` | `() => boolean` | Check mute state |
| `unlockAudio` | `() => void` | Unlock for mobile |
| `isReady` | `() => boolean` | Check if initialized |

### Play Options

```typescript
interface PlayOptions {
  fadeIn?: number;  // Fade-in duration in ms
  volume?: number;  // Override default volume (0-1)
}
```

---

## Performance Tips

1. **HTML5 streaming** for long audio (ambience uses `html5: true`)
2. **Preload sounds** on component mount
3. **Cleanup** sounds on unmount with `stopAll()`
4. **Lazy loading** - sounds load in background, don't block UI
5. **Fallback** - procedural sounds add no file weight

---

## Recommended Free Sound Sources

- [Freesound.org](https://freesound.org) - Creative Commons sounds
- [Zapsplat](https://www.zapsplat.com) - Free SFX library
- [Mixkit](https://mixkit.co/free-sound-effects/) - Free sound effects
