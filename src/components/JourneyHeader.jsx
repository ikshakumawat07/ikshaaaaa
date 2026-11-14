import { useRef } from 'react';

export const LANDMARKS = [
  { id: 'ticket', name: 'Ticket', time: 0 },
  { id: 'flight', name: 'Flight', time: 3 },
  { id: 'louvre', name: 'Louvre', time: 13 },
  { id: 'eiffel', name: 'Eiffel', time: 23 },
  { id: 'seine', name: 'Seine', time: 32 },
  { id: 'palace', name: 'Palace', time: 41 },
  { id: 'aurevoir', name: 'Au Revoir', time: 51 },
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
      <div className="absolute top-3 md:top-4 inset-x-0 z-40 flex items-center justify-center px-2 pt-[env(safe-area-inset-top,0px)] pointer-events-none select-none">
        <div className="pointer-events-auto flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 shadow-lg overflow-x-auto no-scrollbar max-w-[96%] md:max-w-full transition-all">
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
                className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[9px] md:text-[11px] font-mono transition-all flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-white/30 text-white font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={`Jump to ${lm.name} (${formatTime(lm.time)})`}
              >
                <span className="opacity-50 text-[8px] md:text-[9px]">{formatTime(lm.time)}</span>
                <span>{lm.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
