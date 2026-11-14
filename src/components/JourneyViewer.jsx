import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer({
  videoEnded = false,
  onVideoEnded,
  onVideoRestart,
  onScrollDownClick,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60.82);
  const [is2x, setIs2x] = useState(false);
  const [localEnded, setLocalEnded] = useState(false);

  const isEnded = videoEnded || localEnded;

  const longPressTimerRef = useRef(null);
  const isLongPressActiveRef = useRef(false);
  const pointerStartPosRef = useRef({ x: 0, y: 0 });
  const wasPausedBeforeLongPressRef = useRef(false);
  const preventClickRef = useRef(false);

  // Sync video duration and time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration) {
        setDuration(video.duration);
      }
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && video.currentTime >= video.duration - 0.6) {
        setLocalEnded(true);
        onVideoEnded?.();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Auto-play immediately & silently
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleSeekToLandmark = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(video.duration || 60.82, targetTime));
    video.currentTime = clamped;
    setCurrentTime(clamped);
    if (clamped < (video.duration || 60.82) - 1.5) {
      setLocalEnded(false);
      onVideoRestart?.();
      video.play().catch(() => {});
    }
  }, [onVideoRestart]);

  // Long-press detection to trigger 2x playback speed
  const handlePointerDown = useCallback((e) => {
    // Only primary button (left click or touch)
    if (e.button !== undefined && e.button !== 0) return;

    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
    isLongPressActiveRef.current = false;
    preventClickRef.current = false;

    const video = videoRef.current;
    if (!video) return;

    wasPausedBeforeLongPressRef.current = video.paused;

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Trigger 2x after holding down for 220ms
    longPressTimerRef.current = setTimeout(() => {
      isLongPressActiveRef.current = true;
      preventClickRef.current = true;
      setIs2x(true);
      if (videoRef.current) {
        videoRef.current.playbackRate = 2.0;
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    }, 220);
  }, []);

  const handlePointerMove = useCallback((e) => {
    // If moved more than 15px before long-press activates, cancel the timer
    if (!isLongPressActiveRef.current && longPressTimerRef.current) {
      const dx = Math.abs(e.clientX - pointerStartPosRef.current.x);
      const dy = Math.abs(e.clientY - pointerStartPosRef.current.y);
      if (dx > 15 || dy > 15) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (isLongPressActiveRef.current) {
      isLongPressActiveRef.current = false;
      setIs2x(false);
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.0;
        if (wasPausedBeforeLongPressRef.current) {
          videoRef.current.pause();
        }
      }
      // Swallow trailing click event after long press
      preventClickRef.current = true;
      setTimeout(() => {
        preventClickRef.current = false;
      }, 150);
    }
  }, []);

  const handlePointerCancel = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (isLongPressActiveRef.current) {
      isLongPressActiveRef.current = false;
      setIs2x(false);
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.0;
        if (wasPausedBeforeLongPressRef.current) {
          videoRef.current.pause();
        }
      }
    }
    preventClickRef.current = false;
  }, []);

  // Seamless invisible tap/click to pause and resume playback
  const togglePlay = useCallback(() => {
    if (preventClickRef.current) {
      preventClickRef.current = false;
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlay();
    }
  }, [togglePlay]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
      onClick={togglePlay}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Toggle playback"
      style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
      className="relative w-full h-full overflow-hidden bg-black select-none flex items-center justify-center cursor-pointer outline-none"
    >
      {/* Minimal Clickable Top Progress Line & Timestamps */}
      <JourneyHeader
        currentTime={currentTime}
        duration={duration}
        onSeekToLandmark={handleSeekToLandmark}
      />

      {/* Discreet 2x Speed Badge - smoothly visible only while long-pressing */}
      {is2x && (
        <div className="absolute top-12 md:top-14 inset-x-0 z-50 flex items-center justify-center pointer-events-none transition-all">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl font-mono text-xs tracking-wider">
            <svg className="w-3.5 h-3.5 fill-current text-white/90" viewBox="0 0 24 24">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
            </svg>
            <span className="font-bold">2× Speed</span>
          </div>
        </div>
      )}

      {/* Main 1080p HD Video */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/journey_full_sequence.mp4?v=pont_des_arts_v9"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onEnded={() => {
            setLocalEnded(true);
            onVideoEnded?.();
          }}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Modern, Attractive Floating Scroll to Connect Prompt - Available at any time */}
      <div className="absolute bottom-5 md:bottom-7 z-50 flex items-center justify-center pointer-events-auto select-none">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onScrollDownClick?.();
          }}
          className="flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 hover:border-pink-300/60 text-white shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group hover:scale-105"
          title="Scroll down to connect"
        >
          <span className="text-xs md:text-sm font-curly font-bold tracking-wide text-pink-200 group-hover:text-white transition-colors drop-shadow">
            scroll to connect
          </span>
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-300 group-hover:text-white group-hover:translate-y-0.5 transition-all animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
