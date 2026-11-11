import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Device orientation / screen detection
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.innerHeight > window.innerWidth;
  });

  // Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);

  // Monitor resize & orientation changes to choose the ideal format
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
      if (currentTime > 0) {
        video.currentTime = Math.min(currentTime, video.duration || 57.21);
      }
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Auto-play immediately
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoSrc]);

  const handleSeekToLandmark = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(video.duration || 57.21, targetTime));
    video.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-black select-none flex items-center justify-center"
    >
      {/* 
        Dual-Format Presentation:
        - Mobile Phones: Native 9:16 vertical cinema with zero black bars and 100% visible authentic typography
        - Laptops & Desktops: 16:9 widescreen cinema
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
          - No bottom player bar
          - Autoplays silently
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
            className="w-full h-full object-cover md:object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
