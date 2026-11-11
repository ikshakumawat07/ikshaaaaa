import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectModal from '../components/ProjectModal';
import ImageFallback from '../components/ImageFallback';
import { projects } from '../data/portfolioData';
import { Github, ExternalLink } from 'lucide-react';

const filters = ['All', 'Apps', 'AI', 'Dev Tools', 'Web'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="My Projects" subtitle="What I've Built" />

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-royal-purple to-lavender text-cream shadow-lg'
                  : 'glass text-cream/60 hover:text-cream'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="glass rounded-2xl overflow-hidden hover:glow-purple transition-all duration-500 hover:-translate-y-2">
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageFallback
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      fallbackText={project.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/80 via-deep-violet/20 to-transparent" />
                    
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full glass text-lavender">
                      {project.category}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-royal-purple/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {project.github && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 rounded-full glass-strong flex items-center justify-center text-cream"
                        >
                          <Github size={18} />
                        </motion.span>
                      )}
                      {project.demo && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 rounded-full glass-strong flex items-center justify-center text-cream"
                        >
                          <ExternalLink size={18} />
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-display font-bold text-cream mb-2 group-hover:text-gradient transition-all">
                      {project.name}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-royal-purple/20 text-lavender/60 border border-lavender/5">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-royal-purple/20 text-lavender/40">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
