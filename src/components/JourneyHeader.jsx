import { useState } from 'react';

export const LANDMARKS = [
  { id: 'sky', name: 'Flight', time: 0 },
  { id: 'louvre', name: 'Louvre', time: 7 },
  { id: 'eiffel', name: 'Eiffel Cafe', time: 14 },
  { id: 'seine', name: 'River Seine', time: 24 },
  { id: 'bridge', name: 'Pont des Arts', time: 31 },
  { id: 'versailles', name: 'Versailles', time: 36 },
  { id: 'contact', name: 'Contact', time: 42 },
  { id: 'aurevoir', name: 'Au Revoir', time: 49 },
];

export default function JourneyHeader({
  currentTime,
  duration,
  onSeekToLandmark,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Ultra-thin Minimal Top Progress Line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-white/80 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Minimal Discreet Landmark Dots on Top Hover */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute top-2 inset-x-0 h-7 z-40 flex items-center justify-center gap-3 transition-opacity duration-300 pointer-events-auto"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-[10px] font-mono text-white/70">
          {LANDMARKS.map((lm) => {
            const isCurrent = Math.abs(currentTime - lm.time) < 4.0;
            return (
              <button
                key={lm.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeekToLandmark(lm.time);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  isCurrent ? 'bg-white/25 text-white font-bold' : 'hover:text-white'
                }`}
              >
                {lm.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
