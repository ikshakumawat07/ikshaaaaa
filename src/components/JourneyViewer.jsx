import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);

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
      const cur = video.currentTime;
      setCurrentTime(cur);

      // Keep ambient background in sync
      if (bgVideoRef.current && Math.abs(bgVideoRef.current.currentTime - cur) > 0.4) {
        bgVideoRef.current.currentTime = cur;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Auto-play immediately
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleSeekToLandmark = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(video.duration || 57.21, targetTime));
    video.currentTime = clamped;
    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = clamped;
    }
    setCurrentTime(clamped);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-black select-none flex items-center justify-center"
    >
      {/* 
        Ambient Scene Glow on Mobile: 
        Fills the vertical phone screen with dynamic scene colors/lighting (no dead black space)
      */}
      <video
        ref={bgVideoRef}
        src="/journey_full_sequence.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none md:hidden"
      />

      {/* 
        Fully Device-Compatible Frame:
        - Mobile: Full width, object-contain ensures 100% of text and scenes are completely visible & uncropped
        - Laptop/Desktop: Centered 16:9 cinema widescreen frame
      */}
      <div
        className="relative z-10 overflow-hidden flex flex-col items-center justify-center select-none w-full h-full md:aspect-[16/9] md:w-[min(100vw,calc(100vh*16/9))] md:h-[min(100vh,calc(100vw*9/16))] md:max-w-[100vw] md:max-h-[100vh]"
      >
        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 
          Main 1080p Full HD Video:
          - object-contain: 100% text compatibility on every phone and laptop
          - Zero text cutting, zero blurriness, razor-sharp details
        */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src="/journey_full_sequence.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
