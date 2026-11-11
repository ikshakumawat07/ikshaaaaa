import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lavender/70 text-sm tracking-[0.3em] uppercase mb-4 font-medium"
        >
          {subtitle}
        </motion.p>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gradient leading-tight">
        {title}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={`mt-6 h-px bg-gradient-to-r from-transparent via-lavender/40 to-transparent ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        style={{ maxWidth: '200px' }}
      />
    </motion.div>
  );
}
