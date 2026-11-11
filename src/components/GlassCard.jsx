import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : {}}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'hover:glow-purple hover:border-lavender/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
