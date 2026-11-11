import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader from './JourneyHeader';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Playback State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);
  const [mobileFitMode, setMobileFitMode] = useState('fit'); // 'fit' (show all text & 100% quality) | 'fill' (zoom 9:16)

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
        {/* Ambient Glow Background on Mobile (eliminates black bars with rich scene lighting) */}
        <video
          ref={bgVideoRef}
          src="/journey_full_sequence.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none md:hidden"
        />

        {/* Minimal Clickable Top Progress Line & Timestamps */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 
          Main Video:
          - Laptop: 16:9 cinema widescreen (100% pixel sharpness)
          - Mobile 'fit': 100% uncropped HD video where all text, cards, and details are razor-sharp and fully visible
          - Mobile 'fill': full bleed 9:16 zoom
        */}
        <video
          ref={videoRef}
          src="/journey_full_sequence.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`relative z-10 w-full h-full pointer-events-none transition-all duration-300 md:object-contain ${
            mobileFitMode === 'fit' ? 'object-contain' : 'object-cover'
          }`}
        />

        {/* Mobile View Toggle: Switch between 'Fit Text' and 'Fill 9:16' */}
        <div className="absolute bottom-3 right-3 z-30 md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileFitMode((m) => (m === 'fit' ? 'fill' : 'fit'))}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-mono shadow-md transition-all active:scale-95"
            title={mobileFitMode === 'fit' ? 'Zoom to Fill 9:16' : 'Fit to Show All Text'}
          >
            {mobileFitMode === 'fit' ? (
              <>
                <Maximize2 size={11} />
                <span>Fill 9:16</span>
              </>
            ) : (
              <>
                <Minimize2 size={11} />
                <span>Fit Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
