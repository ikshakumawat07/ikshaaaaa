import { useState, useEffect, useRef } from 'react';
import JourneyViewer from './components/JourneyViewer';
import ConnectSection from './components/ConnectSection';

export default function App() {
  const [videoEnded, setVideoEnded] = useState(false);
  const connectRef = useRef(null);
  const journeyRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Check whether device is currently in portrait orientation
  const checkPortrait = () => {
    if (typeof window === 'undefined') return false;
    return window.innerHeight > window.innerWidth;
  };

  const [isPortrait, setIsPortrait] = useState(checkPortrait);
  const [rotationAngle, setRotationAngle] = useState(90); // 90 degrees tilted on phone

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

  const scrollToConnect = () => {
    connectRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Touch swipe support on phone to seamlessly navigate between horizontal sections
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    // When phone is in portrait and rotated 90deg, physical X corresponds to visual Y!
    const effectiveDelta = isPortrait
      ? (rotationAngle === 90 ? deltaX : -deltaX)
      : deltaY;

    if (effectiveDelta < -40 || deltaY < -60) {
      scrollToConnect();
    } else if (effectiveDelta > 40 || deltaY > 60) {
      scrollToTop();
    }
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-black select-none flex items-center justify-center">
      {/* 
        Unified Rotated Canvas:
        - When phone is in portrait: Whole canvas (video + connect drop down) is rotated horizontally (90deg)
          so BOTH the video and the drop down are 100% horizontal in edge-to-edge max view!
        - When on laptop/desktop or native landscape: Plays naturally in horizontal max view
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
        {/* Scrollable Container containing both Horizontal Sections */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory no-scrollbar"
        >
          <section ref={journeyRef} className="relative w-full h-full snap-start shrink-0">
            <JourneyViewer
              videoEnded={videoEnded}
              onVideoEnded={() => setVideoEnded(true)}
              onVideoRestart={() => setVideoEnded(false)}
              onScrollDownClick={scrollToConnect}
            />
          </section>

          <section ref={connectRef} id="connect" className="relative w-full h-full snap-start shrink-0">
            <ConnectSection onBackToTop={scrollToTop} />
          </section>
        </div>

        {/* Global Flip 180° button visible on phone in both sections */}
        {isPortrait && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setRotationAngle((prev) => (prev === 90 ? -90 : 90));
            }}
            className="absolute bottom-3 right-4 z-50 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/80 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer shadow-lg"
            title="Flip tilt direction 180°"
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
