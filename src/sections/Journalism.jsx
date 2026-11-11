import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ImageFallback from '../components/ImageFallback';
import { creativeWork } from '../data/portfolioData';
import { X, Play, Image as ImageIcon } from 'lucide-react';

export default function Journalism() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const allCategories = ['All', ...creativeWork.categories];
  const filtered = activeFilter === 'All'
    ? creativeWork.items
    : creativeWork.items.filter((item) => item.category === activeFilter);

  return (
    <section id="journalism" className="relative section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Beyond the Code" subtitle="Creative Work" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-cream/70 max-w-2xl mx-auto mb-12 text-base md:text-lg"
        >
          {creativeWork.description}
        </motion.p>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-royal-purple to-lavender text-cream shadow-md'
                  : 'glass text-cream/60 hover:text-cream'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(item)}
                className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-lavender/15 hover:border-lavender/40 hover:glow-purple transition-all duration-500"
              >
                <ImageFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackText={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/95 via-deep-violet/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.type === 'video' ? (
                        <Play size={14} className="text-sunset-orange" />
                      ) : (
                        <ImageIcon size={14} className="text-lavender" />
                      )}
                      <span className="text-xs uppercase tracking-wider text-lavender/80 font-medium">{item.category}</span>
                    </div>
                    <h4 className="text-base font-display font-bold text-cream">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 bg-deep-violet/90 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-6 md:inset-16 z-[101] flex flex-col items-center justify-center pointer-events-auto"
            >
              <motion.button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-white"
                whileHover={{ scale: 1.1 }}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </motion.button>
              <div className="max-w-4xl w-full max-h-[75vh] rounded-2xl overflow-hidden glass p-4 flex items-center justify-center">
                <ImageFallback
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                  fallbackText={lightbox.title}
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xl font-display font-bold text-cream">{lightbox.title}</h4>
                <p className="text-lavender/70 text-sm mt-1">{lightbox.category}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
