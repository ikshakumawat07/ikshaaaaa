import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-violet/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-x-auto md:inset-y-12 md:max-w-2xl md:mx-auto z-[101] glass-strong rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-royal-purple/40 to-lavender/20 flex items-center justify-center overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/80 to-transparent" />
              
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="mb-2">
                <span className="text-xs tracking-wider uppercase text-lavender/60">{project.category}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-cream mb-4">
                {project.name}
              </h3>
              <p className="text-cream/70 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-royal-purple/30 text-lavender border border-lavender/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
                {project.github === '#' && (
                  <span className="btn-primary flex items-center gap-2 text-sm opacity-60 cursor-default">
                    <Github size={16} />
                    Code — Coming Soon
                  </span>
                )}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                ) : (
                  <span className="btn-outline flex items-center gap-2 text-sm opacity-50 cursor-default">
                    <ExternalLink size={16} />
                    Demo — Coming Soon
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
