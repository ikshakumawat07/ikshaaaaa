import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { fandomsData } from '../data/portfolioData';

function FandomCard({ item, theme, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const themeStyles = {
    'coffee-shop': 'from-amber-950/40 via-amber-900/20 to-orange-950/10 border-amber-600/30 hover:border-amber-400/60',
    racing: 'from-red-950/40 via-neutral-900/40 to-red-900/20 border-red-600/30 hover:border-red-500/60',
    music: 'from-purple-950/40 via-indigo-950/30 to-purple-900/20 border-purple-500/30 hover:border-purple-400/60',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative rounded-2xl p-5 bg-gradient-to-br ${themeStyles[theme]} border backdrop-blur-md transition-all duration-300 cursor-default group shadow-sm`}
    >
      <motion.span
        className="text-4xl block mb-3 select-none"
        animate={isHovered ? { scale: 1.25, rotate: [0, -8, 8, 0] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        {item.icon}
      </motion.span>
      <h4 className="text-base font-display font-bold text-cream mb-1.5">{item.title}</h4>
      <p className="text-cream/60 text-xs leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function Fandoms() {
  const [activeFandom, setActiveFandom] = useState('friends');
  const fandomEntries = Object.entries(fandomsData);
  const current = fandomsData[activeFandom];

  return (
    <section id="fandoms" className="relative section-padding overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="My Fandoms" subtitle="The Fun Side" />

        {/* Fandom Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12">
          {fandomEntries.map(([key, data]) => {
            const isSelected = activeFandom === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveFandom(key)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'text-cream shadow-lg scale-105'
                    : 'glass text-cream/60 hover:text-cream'
                }`}
                style={
                  isSelected
                    ? {
                        background: `linear-gradient(135deg, ${data.color}55, ${data.color}20)`,
                        border: `1px solid ${data.color}80`,
                        boxShadow: `0 0 25px ${data.color}35`,
                      }
                    : {}
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.title}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Themed Environment Display */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={activeFandom}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45 }}
            >
              <div className="text-center mb-10">
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2 tracking-wide"
                  style={{ color: current.color }}
                >
                  {current.title}
                </h3>
                <p className="text-cream/60 italic text-sm md:text-base font-light">
                  "{current.subtitle}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {current.items.map((item, i) => (
                  <FandomCard
                    key={item.title}
                    item={item}
                    theme={current.theme}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
