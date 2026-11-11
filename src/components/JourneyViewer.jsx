import { useState, useEffect, useRef, useCallback } from 'react';
import TimestampController, { LANDMARKS } from './TimestampController';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync video duration and time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Ensure autoplay initiates
    video.play().catch(() => {
      // Autoplay with muted is allowed by all browsers
      video.muted = true;
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Controls
  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const handleSeek = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(video.duration || 57.21, targetTime));
    video.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const handleRewind5s = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, video.currentTime - 5);
    video.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  // Keyboard shortcuts (Space = Play/Pause, Left/Right = Seek 5s)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleRewind5s();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        const video = videoRef.current;
        if (video) {
          handleSeek(video.currentTime + 5);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleRewind5s, handleSeek]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-neutral-950 select-none flex items-center justify-center"
    >
      {/* 
        Responsive Container:
        - Mobile/Phone: w-full h-[100dvh] (fills the entire screen in full vertical size)
        - Laptop/Desktop (md:): 16:9 cinema aspect ratio centered
      */}
      <div
        className="relative overflow-hidden bg-black shadow-2xl flex items-center justify-center select-none w-full h-[100dvh] md:w-[min(100vw,calc(100vh*16/9))] md:h-[min(100vh,calc(100vw*9/16))] md:aspect-[16/9] md:max-w-[100vw] md:max-h-[100vh]"
      >
        {/* Continuous Autoplay Video: Full size object-cover on phone, object-contain on 16:9 laptop */}
        <video
          ref={videoRef}
          src="/journey_full_sequence.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover md:object-contain pointer-events-none"
        />

        {/* Timestamps & Playback Controller */}
        <TimestampController
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onRewind5s={handleRewind5s}
        />
      </div>
    </div>
  );
}
