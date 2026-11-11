import { motion } from 'framer-motion';
import { Code, Cog, Palette, Layers, Compass, Terminal } from 'lucide-react';

const FLOATING_BADGES = [
  { icon: Code, label: '</>', x: '18%', y: '35%', delay: 0 },
  { icon: Cog, label: 'AI/ML', x: '82%', y: '28%', delay: 0.2 },
  { icon: Palette, label: 'Design', x: '25%', y: '68%', delay: 0.4 },
  { icon: Layers, label: 'Spring', x: '75%', y: '65%', delay: 0.1 },
  { icon: Terminal, label: 'CLI', x: '50%', y: '20%', delay: 0.3 },
];

export default function SeineFloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {FLOATING_BADGES.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.95, 1.08, 0.95],
              y: [-8, 8, -8],
              rotate: [-3, 3, -3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 0.5,
              ease: 'easeInOut',
              delay: b.delay,
            }}
            style={{ left: b.x, top: b.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
          >
            <div className="glass px-3 py-2 rounded-2xl border border-lavender/40 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_20px_rgba(185,162,232,0.3)] hover:scale-125 transition-transform">
              <Icon size={16} className="text-sunset" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">{b.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
