import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronsUp, ChevronDown, RotateCcw } from 'lucide-react';

export default function ForwardSensorHUD({
  onTapForward,
  onStartHoldForward,
  onEndHoldForward,
  onTapBackward,
  velocity,
  stepCount,
  distanceMeters,
  totalDistance,
  onResetJourney,
}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(true);
    if (onStartHoldForward) onStartHoldForward();
    onTapForward();
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(false);
    if (onEndHoldForward) onEndHoldForward();
  };

  const isMoving = velocity > 0.05;

  return (
    <div className="absolute bottom-5 left-5 pointer-events-none z-40 select-none flex items-end gap-2.5">
      {/* Small Translucent Forward Sensor Button at Bottom-Left */}
      <div className="pointer-events-auto relative flex items-center justify-center">
        {/* Subtle translucent pulse ring */}
        {isMoving && (
          <div className="absolute -inset-1.5 rounded-full border border-white/20 animate-ping pointer-events-none" />
        )}

        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          animate={{
            scale: isPressed ? 0.94 : 1.0,
          }}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg ${
            isPressed
              ? 'bg-white/20 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'bg-black/20 hover:bg-black/35 backdrop-blur-md border border-white/15 hover:border-white/30 text-white/70 hover:text-white'
          }`}
          title="Tap to step forward · Hold to glide · [W] / [▲] / Click screen"
          aria-label="Forward Sensor"
        >
          <ChevronsUp
            size={22}
            className={`transition-colors duration-200 ${
              isPressed ? 'text-white' : isMoving ? 'text-white/90' : 'text-white/60'
            }`}
          />
          <span className="text-[8px] font-mono tracking-widest uppercase opacity-70 mt-0.5">
            {isPressed ? 'PUSH' : 'WALK'}
          </span>
        </motion.button>
      </div>

      {/* Tiny subtle backward step button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          e.stopPropagation();
          onTapBackward();
        }}
        className="pointer-events-auto w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md border border-white/10 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all shadow-md"
        title="Step Backward [S / Down]"
        aria-label="Step Backward"
      >
        <ChevronDown size={14} />
      </motion.button>

      {/* Tiny reset button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          e.stopPropagation();
          onResetJourney();
        }}
        className="pointer-events-auto w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md border border-white/10 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all shadow-md"
        title="Restart from beginning"
        aria-label="Restart Journey"
      >
        <RotateCcw size={12} />
      </motion.button>

      {/* Tiny translucent step telemetry badge */}
      <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/50 select-none ml-1">
        <span className={isMoving ? 'text-white font-medium' : ''}>
          {Math.round(distanceMeters)}m
        </span>
        <span>•</span>
        <span>{stepCount} steps</span>
      </div>
    </div>
  );
}
