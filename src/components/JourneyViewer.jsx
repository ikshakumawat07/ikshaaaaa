import { useState, useEffect, useRef, useCallback } from 'react';
import JourneyHeader, { LANDMARKS } from './JourneyHeader';
import ForwardSensorHUD from './ForwardSensorHUD';

export default function JourneyViewer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Journey State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.21);
  const [velocity, setVelocity] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [isHoldingForward, setIsHoldingForward] = useState(false);

  // Animation refs for 60fps RAF loop
  const targetTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoldingRef = useRef(false);

  const TOTAL_DISTANCE = 1500;

  // Initialize video metadata and time update
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
      const dist = (cur / (video.duration || 57.21)) * TOTAL_DISTANCE;
      setDistanceMeters(dist);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Sync refs with state
  useEffect(() => {
    isHoldingRef.current = isHoldingForward;
  }, [isHoldingForward]);

  // PRIMARY FORWARD STEP SENSOR
  const handleTapForward = useCallback(() => {
    // Haptic feedback for mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }

    const video = videoRef.current;
    const dur = video?.duration || 57.21;

    setStepCount((prev) => prev + 1);

    // Forward kinetic impulse
    velocityRef.current = Math.min(velocityRef.current + 1.1, 2.0);
    targetTimeRef.current = Math.min(
      dur - 0.05,
      (targetTimeRef.current || video?.currentTime || 0) + 1.05
    );
    setVelocity(velocityRef.current);
  }, []);

  // BACKWARD STEP SENSOR
  const handleTapBackward = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    targetTimeRef.current = Math.max(0, video.currentTime - 1.2);
    video.currentTime = targetTimeRef.current;
    setCurrentTime(targetTimeRef.current);
  }, []);

  // SEEK TO SPECIFIC TIME
  const handleSeekToLandmark = useCallback((time) => {
    const video = videoRef.current;
    if (!video) return;

    targetTimeRef.current = time;
    video.currentTime = time;
    setCurrentTime(time);
    velocityRef.current = 0;
    setVelocity(0);
  }, []);

  // RESTART JOURNEY
  const handleRestartJourney = useCallback(() => {
    handleSeekToLandmark(0);
    setStepCount(0);
    setDistanceMeters(0);
  }, [handleSeekToLandmark]);

  // CONTINUOUS RAF PHYSICS LOOP — ONLY MOVES WHEN USER TAPS / VELOCITY > 0
  useEffect(() => {
    let animId;

    const tick = () => {
      const video = videoRef.current;

      if (video) {
        const dur = video.duration || 57.21;

        // If holding the sensor, continuously glide forward
        if (isHoldingRef.current) {
          velocityRef.current = Math.min(velocityRef.current + 0.1, 1.5);
          targetTimeRef.current = Math.min(dur - 0.05, targetTimeRef.current + 0.045);
        }

        const timeDiff = targetTimeRef.current - video.currentTime;

        // The camera only moves in front when velocity and timeDiff > 0
        if (timeDiff > 0.05 && velocityRef.current > 0.05) {
          if (video.paused) {
            video.play().catch(() => {});
          }
          const rate = Math.min(Math.max(velocityRef.current, 0.75), 2.2);
          if (Math.abs(video.playbackRate - rate) > 0.05) {
            video.playbackRate = rate;
          }

          // Kinetic friction when not actively holding
          if (!isHoldingRef.current) {
            velocityRef.current *= 0.91;
            if (velocityRef.current < 0.04) {
              velocityRef.current = 0;
            }
          }
        } else {
          // Stationary state: video stays completely paused
          if (!video.paused && !isHoldingRef.current) {
            video.pause();
          }
          velocityRef.current *= 0.85;
          if (velocityRef.current < 0.02) {
            velocityRef.current = 0;
          }
        }

        setVelocity(velocityRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // KEYBOARD & WHEEL SENSORS
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (['KeyW', 'ArrowUp', 'Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        if (!e.repeat) {
          handleTapForward();
        }
        setIsHoldingForward(true);
      } else if (['KeyS', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
        handleTapBackward();
      }
    };

    const handleKeyUp = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (['KeyW', 'ArrowUp', 'Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        setIsHoldingForward(false);
      }
    };

    const handleWheel = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.deltaY > 20) {
        handleTapForward();
      } else if (e.deltaY < -20) {
        handleTapBackward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleTapForward, handleTapBackward]);

  // SCREEN TAP HANDLER: Tapping the screen steps forward
  const handleScreenTap = (e) => {
    if (e.target.closest('button, a, input')) return;
    handleTapForward();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenTap}
      className="relative w-screen h-screen overflow-hidden bg-neutral-950 select-none cursor-pointer flex items-center justify-center"
      title="Tap anywhere to move forward"
    >
      {/* Rock-solid 16:9 Cinematic Container */}
      <div
        className="relative overflow-hidden bg-black shadow-2xl flex items-center justify-center select-none"
        style={{
          aspectRatio: '16/9',
          width: 'min(100vw, calc(100vh * 16 / 9))',
          height: 'min(100vh, calc(100vw * 9 / 16))',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        {/* Minimal Top Header & Progress Line (locked to 16:9 top) */}
        <JourneyHeader
          currentTime={currentTime}
          duration={duration}
          onSeekToLandmark={handleSeekToLandmark}
        />

        {/* 100% Uncropped Stable 16:9 Video */}
        <video
          ref={videoRef}
          src="/journey_full_sequence.mp4"
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Small Translucent Forward Sensor Cursor at Bottom-Left of 16:9 Frame */}
        <ForwardSensorHUD
          onTapForward={handleTapForward}
          onStartHoldForward={() => setIsHoldingForward(true)}
          onEndHoldForward={() => setIsHoldingForward(false)}
          onTapBackward={handleTapBackward}
          velocity={velocity}
          stepCount={stepCount}
          distanceMeters={distanceMeters}
          totalDistance={TOTAL_DISTANCE}
          onResetJourney={handleRestartJourney}
        />
      </div>
    </div>
  );
}
