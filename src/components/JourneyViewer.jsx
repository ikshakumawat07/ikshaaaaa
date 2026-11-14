import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Determine whether to show portrait view (phone) or landscape view (laptop/desktop)
  const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    const isPortrait = window.matchMedia('(orientation: portrait)').matches || window.innerHeight > window.innerWidth;
    const isMobileWidth = window.innerWidth < 768;
    return isPortrait || isMobileWidth;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);

  // Monitor resize & orientation changes so phone opens in portrait view and laptop in full landscape view
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    const portraitQuery = window.matchMedia('(orientation: portrait)');
    if (portraitQuery.addEventListener) {
      portraitQuery.addEventListener('change', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (portraitQuery.removeEventListener) {
        portraitQuery.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  // Phone loads dedicated 9:16 portrait video; Laptop loads full 16:9 widescreen video
  const videoSrc = isMobile ? '/journey_mobile_9x16.mp4' : '/journey_full_sequence.mp4';

  // Sync video duration, time, and preserve playback position across view switches
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

    // Auto-play immediately & silently
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
        Full Viewport Container:
        - Phone: Opens in full portrait view (fills 100% of the vertical phone screen)
        - Laptop: Opens in full landscape view (fills 100% of the widescreen monitor)
      */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 
          Main Video Player:
          - Phone: Fills entire portrait screen (object-cover) with zero black bars
          - Laptop: Fills entire landscape screen (object-cover) in full cinematic landscape view
        */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
