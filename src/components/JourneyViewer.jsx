import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Device orientation / screen detection
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.innerHeight > window.innerWidth;
  });

  // Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.5);

  // Monitor resize & orientation changes to choose the ideal video format
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const videoSrc = isMobile ? '/journey_mobile_9x16.mp4' : '/journey_full_sequence.mp4';

  // Sync video duration, time, and preserve position across src change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration) {
        setDuration(video.duration);
      }
      // If we switched formats, restore current time
      if (currentTime > 0) {
        video.currentTime = Math.min(currentTime, video.duration || 57.5);
      }
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
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
  }, [videoSrc]);

  const handleSeekToLandmark = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(video.duration || 57.5, targetTime));
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
        Subtle aura around non-standard phone screens (e.g. 19.5:9 or notch areas)
      */}
      <video
        ref={bgVideoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none md:hidden"
      />

      {/* 
        True Dual-Format Container:
        - Mobile Phones: 9:16 vertical full screen, zero black bars on top & bottom, 100% visible typography
        - Laptops & Desktops: 16:9 widescreen cinematic theatre
      */}
      <div
        className={`relative z-10 overflow-hidden flex flex-col items-center justify-center select-none shadow-2xl ${
          isMobile
            ? 'w-full h-full max-w-[calc(100dvh*9/16)] aspect-[9/16]'
            : 'aspect-[16/9] w-[min(100vw,calc(100vh*16/9))] h-[min(100vh,calc(100vw*9/16))] max-w-[100vw] max-h-[100vh]'
        }`}
      >
        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 
          Main Video Element:
          - Phone: Fills native 9:16 vertical screen with uncropped text & landmarks
          - Laptop: Fills native 16:9 widescreen cinema
        */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`w-full h-full pointer-events-none ${
              isMobile ? 'object-cover' : 'object-contain'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
