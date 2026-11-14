import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Check whether device is currently in portrait orientation
  const checkPortrait = () => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  };

  const [isPortrait, setIsPortrait] = useState(checkPortrait);
  const [rotationAngle, setRotationAngle] = useState(90); // 90 degrees tilted on phone
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60.82);

  // Monitor resize & orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(checkPortrait());
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-[100dvh] overflow-hidden bg-black select-none flex items-center justify-center"
    >
      {/* 
        Max View Presentation:
        - On phone (portrait): Played 90 degrees tilted to fill the screen in its maximum view
        - On laptop/desktop (landscape): Plays in edge-to-edge max landscape view
      */}
      <div
        className={`overflow-hidden flex flex-col items-center justify-center select-none ${
          isPortrait
            ? 'absolute top-1/2 left-1/2 w-[100dvh] h-[100vw]'
            : 'relative w-full h-full'
        }`}
        style={
          isPortrait
            ? {
                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                transformOrigin: 'center center',
              }
            : undefined
        }
      >
        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 
          Main 1080p HD Video:
          - Plays the full original sequence in full screen max view
          - Zero black bars; razor sharp 1080p quality
        */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/journey_full_sequence.mp4?v=pont_des_arts_v9"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Discreet Flip Button for Phone Orientation (allows 90° or 270° tilt) */}
        {isPortrait && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRotationAngle((prev) => (prev === 90 ? -90 : 90));
            }}
            className="absolute bottom-3 right-4 z-50 px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/70 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all"
            title="Flip tilt direction"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Flip 180°</span>
          </button>
        )}
      </div>
    </div>
  );
}
