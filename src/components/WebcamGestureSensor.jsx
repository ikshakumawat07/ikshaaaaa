import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Sparkles, Activity } from 'lucide-react';

export default function WebcamGestureSensor({ isActive, onToggle, onForwardTrigger }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevFrameRef = useRef(null);
  const [motionLevel, setMotionLevel] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const lastTriggerTime = useRef(0);

  useEffect(() => {
    if (!isActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    let stream = null;
    let animId = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: { width: 160, height: 120 } })
      .then((s) => {
        stream = s;
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }

        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 24;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const processFrame = () => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            ctx.drawImage(videoRef.current, 0, 0, 32, 24);
            const imgData = ctx.getImageData(0, 0, 32, 24);
            const data = imgData.data;

            if (prevFrameRef.current) {
              let diffSum = 0;
              const prev = prevFrameRef.current;
              for (let i = 0; i < data.length; i += 4) {
                const curLum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                const prevLum = 0.299 * prev[i] + 0.587 * prev[i + 1] + 0.114 * prev[i + 2];
                diffSum += Math.abs(curLum - prevLum);
              }
              const totalPixels = 32 * 24;
              const avgDiff = diffSum / totalPixels;
              setMotionLevel(Math.min(100, Math.round(avgDiff * 3)));

              // Trigger forward if gesture motion exceeds threshold
              const now = Date.now();
              if (avgDiff > 14 && now - lastTriggerTime.current > 380) {
                lastTriggerTime.current = now;
                onForwardTrigger();
              }
            }

            prevFrameRef.current = new Uint8ClampedArray(data);
          }
          animId = requestAnimationFrame(processFrame);
        };

        animId = requestAnimationFrame(processFrame);
      })
      .catch((err) => {
        console.warn('Webcam sensor error:', err);
        setHasPermission(false);
      });

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isActive, onForwardTrigger]);

  return (
    <div className="relative">
      {isActive && (
        <div className="fixed bottom-24 right-4 z-50 glass-strong p-3 rounded-2xl border border-lavender/30 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full text-xs text-lavender font-mono">
            <span className="flex items-center gap-1">
              <Activity size={12} className="animate-pulse text-neon-pink" />
              VISION SENSOR
            </span>
            <button
              onClick={onToggle}
              className="text-cream/60 hover:text-white px-1.5 py-0.5 rounded bg-white/10"
              title="Close Vision Sensor"
            >
              ✕
            </button>
          </div>

          <div className="relative w-28 h-20 bg-black/60 rounded-lg overflow-hidden border border-white/10">
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-cover transform -scale-x-100 opacity-80"
            />
            {/* Crosshair & motion ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-12 h-12 rounded-full border-2 border-lavender/40 transition-transform duration-100 flex items-center justify-center"
                style={{
                  transform: `scale(${1 + motionLevel / 100})`,
                  borderColor: motionLevel > 14 ? '#F2B7CB' : 'rgba(185, 162, 232, 0.4)',
                }}
              >
                <Sparkles size={14} className={motionLevel > 14 ? 'text-sunset' : 'text-lavender/60'} />
              </div>
            </div>
          </div>

          {/* Activity gauge */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-lavender to-sunset transition-all duration-75"
              style={{ width: `${Math.min(100, motionLevel * 2.5)}%` }}
            />
          </div>
          <span className="text-[10px] text-cream/70 font-mono">
            {motionLevel > 14 ? '⚡ MOTION DETECTED' : 'Wave hand to step forward'}
          </span>
        </div>
      )}
    </div>
  );
}
