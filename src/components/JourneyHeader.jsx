import { useRef } from 'react';

export const LANDMARKS = [
  { id: 'sky', name: 'Flight', time: 0 },
  { id: 'louvre', name: 'Louvre', time: 7 },
  { id: 'eiffel', name: 'Eiffel', time: 14 },
  { id: 'seine', name: 'Seine', time: 24 },
  { id: 'bridge', name: 'Bridge', time: 31 },
  { id: 'versailles', name: 'Versailles', time: 36 },
  { id: 'contact', name: 'Contact', time: 42 },
  { id: 'aurevoir', name: 'Au Revoir', time: 49 },
];

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function JourneyHeader({
  currentTime,
  duration,
  onSeekToLandmark,
}) {
  const lineRef = useRef(null);
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleLineClick = (e) => {
    if (!lineRef.current || duration <= 0) return;
    const rect = lineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeekToLandmark(ratio * duration);
  };

  return (
    <>
      {/* Clickable Ultra-thin Top Progress Line */}
      <div
        ref={lineRef}
        onClick={handleLineClick}
        className="absolute top-0 inset-x-0 h-2 z-50 cursor-pointer pointer-events-auto group"
        title="Click to jump to time"
      >
        <div className="w-full h-0.5 bg-white/15 transition-all group-hover:h-1.5">
          <div
            className="h-full bg-white/90 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Discreet Minimal Timestamp Landmarks at Top Center */}
      <div className="absolute top-2.5 inset-x-0 z-40 flex items-center justify-center px-3 pointer-events-none select-none">
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-md border border-white/10 shadow-lg overflow-x-auto no-scrollbar max-w-full transition-all">
          {LANDMARKS.map((lm, idx) => {
            const nextTime = LANDMARKS[idx + 1]?.time || duration;
            const isCurrent = currentTime >= lm.time && currentTime < nextTime;

            return (
              <button
                key={lm.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeekToLandmark(lm.time);
                }}
                className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-mono transition-all flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-white/30 text-white font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={`Jump to ${lm.name} (${formatTime(lm.time)})`}
              >
                <span className="opacity-50 text-[9px]">{formatTime(lm.time)}</span>
                <span>{lm.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
