import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Skills & Tools" subtitle="What I Work With" />

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="glass rounded-2xl p-6 hover:glow-purple transition-all duration-300"
            >
              <h3 className="text-lg font-display font-bold text-gradient mb-6">{category}</h3>
              <div className="grid grid-cols-2 gap-3">
                {items.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + si * 0.05 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-royal-purple/10 hover:bg-royal-purple/20 transition-colors cursor-default group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                    <span className="text-sm text-cream/70 group-hover:text-cream transition-colors">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
