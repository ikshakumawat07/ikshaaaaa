import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';

export default function JourneyViewer() {
  const videoRef = useRef(null);
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
  }, []);

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
      className="relative w-screen h-screen overflow-hidden bg-neutral-950 select-none flex items-center justify-center"
    >
      {/* 
        Responsive Container:
        - Mobile/Phone: Strict 9:16 vertical reel aspect ratio
        - Laptop/Desktop (md:): Strict 16:9 widescreen cinema aspect ratio
      */}
      <div
        className="relative overflow-hidden bg-black shadow-2xl flex items-center justify-center select-none aspect-[9/16] w-[min(100vw,calc(100dvh*9/16))] h-[min(100dvh,calc(100vw*16/9))] max-w-[100vw] max-h-[100dvh] md:aspect-[16/9] md:w-[min(100vw,calc(100vh*16/9))] md:h-[min(100vh,calc(100vw*9/16))] md:max-w-[100vw] md:max-h-[100vh]"
      >
        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* Video: 9:16 vertical full experience on phone, 16:9 widescreen on laptop */}
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
      </div>
    </div>
  );
}
