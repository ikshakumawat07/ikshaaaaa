import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { experience } from '../data/portfolioData';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading title="Experience" subtitle="Where I've Worked" />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <GlassCard key={i} delay={i * 0.15} className="group">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-purple/40 to-lavender/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {exp.icon || <Briefcase size={24} className="text-lavender" />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-bold text-cream">{exp.title}</h3>
                    <span className="text-sunset-orange text-sm font-medium whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-lavender/60 text-sm mb-2">{exp.company}</p>
                  <p className="text-cream/60 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
