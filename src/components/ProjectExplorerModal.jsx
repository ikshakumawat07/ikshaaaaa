import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Award, BookOpen, User, Briefcase, Mail } from 'lucide-react';
import { personalInfo, projects, education } from '../data/portfolioData';

export default function ProjectExplorerModal({ isOpen, onClose, onSelectProject, onTeleport }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] glass-strong rounded-3xl border border-lavender/30 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sunset">
                Portfolio Explorer & Quick Nav
              </span>
              <h2 className="text-xl md:text-2xl font-display font-bold text-cream">
                Iksha Kumawat — Full Index
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-cream hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Teleport Landmarks */}
            <div>
              <h3 className="text-xs font-mono uppercase text-lavender tracking-wider mb-2.5">
                ⚡ Jump Camera to Paris Landmark
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { name: 'Sky / Intro', time: 0, icon: '✈️' },
                  { name: 'Louvre Pyramid', time: 7, icon: '🏛️' },
                  { name: 'Cherry Cafe & Eiffel', time: 14, icon: '🌸' },
                  { name: 'Seine River', time: 22, icon: '🌊' },
                  { name: 'Pont des Arts', time: 28, icon: '🔒' },
                  { name: 'Versailles', time: 33, icon: '👑' },
                ].map((lm) => (
                  <button
                    key={lm.time}
                    onClick={() => {
                      onTeleport(lm.time);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl glass border border-white/15 hover:border-sunset/50 flex flex-col items-center gap-1 text-center transition-all hover:scale-105"
                  >
                    <span className="text-lg">{lm.icon}</span>
                    <span className="text-[11px] font-mono text-cream font-medium">{lm.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* All Projects */}
            <div>
              <h3 className="text-xs font-mono uppercase text-lavender tracking-wider mb-2.5">
                💻 Complete Project Directory ({projects.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProject(p);
                      onClose();
                    }}
                    className="glass p-3.5 rounded-2xl border border-white/10 hover:border-lavender/50 cursor-pointer flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono uppercase text-sunset font-bold">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-lavender opacity-60 group-hover:opacity-100">
                          ↗
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-cream group-hover:text-white">
                        {p.name}
                      </h4>
                      <p className="text-xs text-cream/70 line-clamp-2 mt-1">{p.description}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-lavender"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Credentials */}
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs font-mono uppercase text-lavender tracking-wider mb-2.5">
                🎓 Education & Society
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {education.map((edu, idx) => (
                  <div key={idx} className="glass p-3 rounded-2xl border border-white/10">
                    <span className="text-base mr-1.5">{edu.icon}</span>
                    <strong className="text-white">{edu.degree}</strong>
                    <div className="text-cream/70 mt-0.5">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-lavender mt-1">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
