// ─────────────────────────────────────────────────────────────
// audioEffects.js — Zero-Audio Implementation (Completely Silent)
// ─────────────────────────────────────────────────────────────

class SoundFX {
  constructor() {
    this.ctx = null;
    this.bgAudio = null;
    this.isMuted = true;
  }

  init() {}
  playStepSound() {}
  playChime() {}
  playLockClick() {}
  toggleMute() {
    return true;
  }
}

export const soundFX = new SoundFX();
