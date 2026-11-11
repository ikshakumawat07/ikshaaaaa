import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="relative section-padding overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading title="Education" subtitle="My Journey" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-lavender/40 via-blush-pink/30 to-transparent" />

          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className={`relative flex items-start gap-8 mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lavender shadow-lg z-10"
                style={{ boxShadow: '0 0 20px rgba(185, 162, 232, 0.6), 0 0 40px rgba(185, 162, 232, 0.3)' }}
              />

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="glass rounded-2xl p-6 hover:glow-purple transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="text-xl font-display font-bold text-cream mb-2">{item.degree}</h3>
                  <p className="text-lavender/70 text-sm mb-2">{item.institution}</p>
                  <p className="text-sunset-orange font-medium text-sm">{item.period}</p>
                  {item.detail && (
                    <p className="text-cream/50 text-xs mt-2 italic">{item.detail}</p>
                  )}
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
