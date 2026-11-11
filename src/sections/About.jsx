import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { personalInfo, aboutText, aboutChips } from '../data/portfolioData';
import ImageFallback from '../components/ImageFallback';
import ParticleField from '../components/ParticleField';

export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <ParticleField count={15} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="A Little About Me" subtitle="Who I Am" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-md mx-auto">
              <ImageFallback
                src={personalInfo.portrait}
                alt="Iksha Kumawat"
                className="w-full h-full object-cover"
                fallbackText="Iksha Kumawat"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/40 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-lavender/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-blush-pink/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {aboutText.split('\n\n').map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="text-cream/70 leading-relaxed mb-6 text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {aboutChips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 rounded-full glass text-sm text-lavender font-medium cursor-default"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
