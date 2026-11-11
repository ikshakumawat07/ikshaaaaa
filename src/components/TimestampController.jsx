import { useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

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

export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function TimestampController({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  onRewind5s,
}) {
  const progressBarRef = useRef(null);
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleBarClick = (e) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div className="absolute bottom-3 md:bottom-5 inset-x-3 md:inset-x-8 z-40 select-none pointer-events-auto">
      <div className="bg-black/45 hover:bg-black/60 transition-colors backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 md:p-3 shadow-2xl flex flex-col gap-2">
        {/* Scrubbable Progress Bar with Landmark Markers */}
        <div
          ref={progressBarRef}
          onClick={handleBarClick}
          className="relative w-full h-3 md:h-3.5 flex items-center cursor-pointer group"
          title="Click to jump to time"
        >
          {/* Background Track */}
          <div className="w-full h-1 md:h-1.5 bg-white/20 rounded-full overflow-hidden transition-all group-hover:h-2">
            <div
              className="h-full bg-gradient-to-r from-purple-400 via-pink-300 to-white transition-all duration-100 ease-linear shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Draggable/Playhead Indicator */}
          <div
            className="absolute w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)] -translate-x-1/2 pointer-events-none transition-transform group-hover:scale-125"
            style={{ left: `${progressPercent}%` }}
          />

          {/* Landmark Tick Markers along the track */}
          {LANDMARKS.map((lm) => {
            const tickPos = duration > 0 ? (lm.time / duration) * 100 : 0;
            return (
              <div
                key={lm.id}
                className="absolute top-1/2 -translate-y-1/2 w-1 h-2 bg-white/40 hover:bg-white rounded-full pointer-events-none"
                style={{ left: `${tickPos}%` }}
                title={`${lm.name} (${formatTime(lm.time)})`}
              />
            );
          })}
        </div>

        {/* Controls & Timestamp Bar */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* Left: Play/Pause, Rewind, Time Display */}
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-sm"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={14} className="fill-white" /> : <Play size={14} className="fill-white ml-0.5" />}
            </button>

            {/* Rewind 5s */}
            <button
              onClick={onRewind5s}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white flex items-center justify-center transition-all"
              title="Rewind 5 seconds"
              aria-label="Rewind 5 seconds"
            >
              <RotateCcw size={13} />
            </button>

            {/* Formatted Timestamps */}
            <div className="text-[11px] md:text-xs font-mono text-white/90 tracking-wider pl-1">
              <span className="font-semibold text-white">{formatTime(currentTime)}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Scrollable Landmark Timestamp Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pl-2 max-w-[55%] md:max-w-[70%]">
            {LANDMARKS.map((lm, idx) => {
              const nextTime = LANDMARKS[idx + 1]?.time || duration;
              const isCurrent = currentTime >= lm.time && currentTime < nextTime;

              return (
                <button
                  key={lm.id}
                  onClick={() => onSeek(lm.time)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-white text-black font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                  }`}
                  title={`Jump to ${lm.name} (${formatTime(lm.time)})`}
                >
                  <span className="opacity-60 text-[9px]">{formatTime(lm.time)}</span>
                  <span>{lm.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
