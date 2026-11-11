import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ImageFallback from '../components/ImageFallback';
import { certifications } from '../data/portfolioData';
import { X, Award, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="relative section-padding overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Certifications" subtitle="Credentials & Honors" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden hover:glow-purple transition-all duration-500 hover:-translate-y-2 border border-lavender/15 hover:border-lavender/35">
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-royal-purple/30 to-lavender/10">
                  <ImageFallback
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackText={cert.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/80 via-transparent to-transparent" />
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full glass-strong flex items-center justify-center">
                    <Award size={18} className="text-sunset-orange" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-display font-bold text-cream mb-1.5 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-lavender/70 text-xs font-medium">{cert.issuer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Inspection */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-deep-violet/90 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="fixed inset-6 md:inset-16 z-[101] flex flex-col items-center justify-center pointer-events-auto"
            >
              <motion.button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-white"
                whileHover={{ scale: 1.1 }}
                aria-label="Close certificate preview"
              >
                <X size={20} />
              </motion.button>
              <div className="max-w-3xl w-full max-h-[75vh] rounded-2xl overflow-hidden glass p-4 flex items-center justify-center">
                <ImageFallback
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[68vh] object-contain rounded-xl"
                  fallbackText={selectedCert.title}
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-xl font-display font-bold text-cream">{selectedCert.title}</h4>
                <p className="text-lavender/70 text-sm mt-1">Issued by {selectedCert.issuer}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
