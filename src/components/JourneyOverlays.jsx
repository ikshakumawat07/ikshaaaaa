import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  FileText,
  Heart,
  Award,
  BookOpen,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Palette,
  Terminal,
  Send,
  CheckCircle,
} from 'lucide-react';
import { personalInfo, projects, education } from '../data/portfolioData';
import { soundFX } from '../utils/audioEffects';

// ── 1. Intro Sky Overlay ───────────────────────────────────────
export function IntroSkyOverlay({ onStepPrompt }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none"
    >
      <div className="max-w-2xl flex flex-col items-center">
        {/* Luminous Title matching the airplane window video scene */}
        <motion.h1
          initial={{ letterSpacing: '0.15em', y: 15 }}
          animate={{ letterSpacing: '0.28em', y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-3xl md:text-6xl font-display font-light text-white tracking-[0.28em] uppercase drop-shadow-[0_4px_25px_rgba(255,255,255,0.4)]"
        >
          IKSHA KUMAWAT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-3 text-sm md:text-base font-light text-lavender/90 tracking-widest uppercase font-mono"
        >
          Computer Science · AI & ML · Design
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 pointer-events-auto"
        >
          <div className="glass px-5 py-2.5 rounded-full border border-lavender/40 text-xs md:text-sm text-cream/90 flex items-center gap-2 shadow-2xl animate-pulse">
            <span className="w-2 h-2 rounded-full bg-sunset animate-ping" />
            <span>Tap the sensor below to move forward into Paris</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── 2. Louvre Midnight Bio Overlay ─────────────────────────────
export function LouvreOverlay({ onOpenAboutModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-4 md:inset-x-auto md:left-12 bottom-36 md:bottom-32 md:max-w-xl z-20 pointer-events-auto select-none"
    >
      <div className="glass-strong p-6 md:p-8 rounded-3xl border border-lavender/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle ambient gradient flare */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-royal-purple/50 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-lavender/20 border border-lavender/30 text-[10px] font-mono uppercase tracking-wider text-lavender">
            01 · Musée du Louvre
          </span>
          <span className="text-xs text-cream/50">• Midnight Passage</span>
        </div>

        {/* EXACT TEXT FROM VIDEO */}
        <p className="text-sm md:text-base text-cream/90 font-light leading-relaxed font-body">
          I'm <strong className="font-semibold text-white">Iksha Kumawat</strong>, a B.Tech Computer Science student at{' '}
          <span className="text-lavender font-medium">Mody University of Science and Technology</span>, also pursuing a{' '}
          <span className="text-sunset font-medium">Data Science & AI certificate from IIT Jodhpur</span>. I love turning ideas into apps, especially community-focused tech, and I bring a designer's eye from my work in the university{' '}
          <span className="text-cream underline decoration-lavender/40">Journalism Society</span>, Illustrator, Premiere Pro, Figma, and Canva.
        </p>

        {/* Credentials Pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cream/80">
            🎓 B.Tech CSE (2024–2028)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cream/80">
            🤖 IIT Jodhpur AI & ML
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-cream/80">
            📰 Journalism Society
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── 3. Projects Overlay (Eiffel Cherry Blossom Cafe) ───────────
export function ProjectsOverlay({ onSelectProject }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Apps', 'AI', 'Dev Tools', 'Web'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-x-4 md:inset-x-auto md:left-8 md:right-8 top-20 bottom-36 z-20 pointer-events-auto flex flex-col justify-center select-none"
    >
      <div className="glass-strong p-5 md:p-7 rounded-3xl border border-lavender/30 shadow-2xl backdrop-blur-2xl max-h-full flex flex-col overflow-hidden max-w-5xl mx-auto w-full">
        {/* Header exact from video */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-display font-bold text-cream">Projects</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sunset/20 text-sunset border border-sunset/30">
                Avenue Montaigne & Eiffel
              </span>
            </div>
            {/* EXACT SUBTITLE FROM VIDEO */}
            <p className="text-xs md:text-sm text-cream/70 mt-0.5">
              A filterable grid (All, Apps, AI, Dev Tools, Web). Each card has a thumbnail, description, tech tags and GitHub/Demo buttons. Clicking a card opens a detail modal.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  selectedFilter === cat
                    ? 'bg-gradient-to-r from-royal-purple to-lavender text-white font-semibold shadow-md'
                    : 'bg-white/5 hover:bg-white/15 text-cream/70 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Grid of Project Cards */}
        <div className="mt-4 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProjects.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProject(p)}
              className="glass p-3.5 rounded-2xl border border-white/15 hover:border-lavender/50 cursor-pointer flex flex-col justify-between transition-all group bg-white/[0.03] hover:bg-white/[0.08]"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sunset font-semibold">
                    {p.category}
                  </span>
                  <span className="text-xs text-lavender opacity-60 group-hover:opacity-100 transition-opacity">
                    ↗ Detail
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm md:text-base text-cream group-hover:text-white mb-1">
                  {p.name}
                </h3>
                <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-lavender"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-lavender/80 underline group-hover:text-sunset">
                  Open Modal
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── 4. Seine River Flight Overlay (Experience & Skills) ────────
export function SeineOverlay() {
  const skillsList = [
    'Python',
    'Java',
    'Spring Boot',
    'Streamlit',
    'Gemini API',
    'Google Maps/Places API',
    'Machine Learning',
    'Data Science',
    'Adobe Illustrator',
    'Premiere Pro',
    'Figma',
    'Canva',
    'VS Code',
    'Git/GitHub',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-4 md:inset-x-auto md:left-12 bottom-36 md:bottom-28 md:max-w-xl z-20 pointer-events-auto select-none"
    >
      <div className="glass-strong p-6 md:p-8 rounded-3xl border border-lavender/30 shadow-2xl backdrop-blur-xl relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-sunset/20 border border-sunset/30 text-[10px] font-mono uppercase tracking-wider text-sunset">
            03 · River Seine
          </span>
          <span className="text-xs text-cream/50">• Low Water Flight</span>
        </div>

        {/* EXACT SECTION 1: EXPERIENCE */}
        <h3 className="font-display font-bold text-lg text-cream mb-2 flex items-center gap-2">
          <span>Experience</span>
        </h3>
        <ul className="space-y-2 text-xs md:text-sm text-cream/85 leading-relaxed font-body">
          <li className="flex items-start gap-2">
            <span className="text-lavender font-bold mt-0.5">•</span>
            <div>
              <strong className="text-white">IBM Virtual Internship</strong> in Artificial Intelligence{' '}
              <span className="text-lavender/80 font-mono text-[11px]">(June–August 2024 / 2026)</span>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lavender font-bold mt-0.5">•</span>
            <div>
              <strong className="text-white">AI & ML Internship with Python</strong>, InternsElite{' '}
              <span className="text-lavender/80 font-mono text-[11px]">(Summer Internship Project)</span>
            </div>
          </li>
        </ul>

        {/* EXACT SECTION 2: SKILLS */}
        <h3 className="font-display font-bold text-lg text-cream mt-5 mb-2.5 flex items-center gap-2">
          <span>Skills</span>
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skillsList.map((skill) => (
            <span
              key={skill}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-cream transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── 5. Pont des Arts Love Lock Bridge Overlay ──────────────────
export function BridgeOverlay() {
  const [visitorName, setVisitorName] = useState('');
  const [lockColor, setLockColor] = useState('gold');
  const [locks, setLocks] = useState([
    { name: 'Iksha & Code', color: 'gold' },
    { name: 'Paris 2026', color: 'rose' },
  ]);

  const handleAddLock = (e) => {
    e.preventDefault();
    if (!visitorName.trim()) return;
    soundFX.playLockClick();
    setLocks((prev) => [...prev, { name: visitorName.trim(), color: lockColor }]);
    setVisitorName('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-4 md:inset-x-auto md:left-12 bottom-36 md:bottom-28 md:max-w-xl z-20 pointer-events-auto select-none"
    >
      <div className="glass-strong p-6 md:p-8 rounded-3xl border border-lavender/30 shadow-2xl backdrop-blur-xl relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-lavender/20 border border-lavender/30 text-[10px] font-mono uppercase tracking-wider text-lavender">
            04 · Pont des Arts
          </span>
          <span className="text-xs text-cream/50">• Love Lock Bridge</span>
        </div>

        {/* EXACT SECTION 1: JOURNALISM & CREATIVE WORK */}
        <h3 className="font-display font-bold text-lg text-cream mb-1">
          Journalism and Creative Work
        </h3>
        <p className="text-xs md:text-sm text-cream/80 leading-relaxed font-body">
          Mody University Journalism Society member since 2022, with a gallery for design samples, video edits and articles.
        </p>

        {/* EXACT SECTION 2: CERTIFICATIONS */}
        <h3 className="font-display font-bold text-lg text-cream mt-4 mb-1">Certifications</h3>
        <p className="text-xs md:text-sm text-cream/80 leading-relaxed font-body">
          Cards for the <strong className="text-white">IBM Virtual Internship</strong>,{' '}
          <strong className="text-white">IIT Jodhpur</strong>, and{' '}
          <strong className="text-white">InternsElite</strong> certificates.
        </p>

        {/* Interactive Virtual Love Lock Widget */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-lavender mb-2">
            <span className="flex items-center gap-1">
              <Heart size={13} className="text-sunset fill-sunset" /> Attach a Love Lock to Bridge
            </span>
            <span>{locks.length} Locks Attached</span>
          </div>

          <form onSubmit={handleAddLock} className="flex gap-2">
            <input
              type="text"
              placeholder="Your name or initials..."
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-lavender"
              maxLength={24}
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-royal-purple to-sunset text-xs font-semibold text-white shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-1"
            >
              <Heart size={12} />
              <span>Lock</span>
            </button>
          </form>

          {/* Attached locks chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
            {locks.map((lock, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-cream/90 flex items-center gap-1"
              >
                <span>🔒</span>
                <span>{lock.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── 6. Versailles Palace Finale & Contact Overlay ───────────────
export function VersaillesOverlay({ onRestartJourney }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${form.name}`
    )}&body=${encodeURIComponent(form.message)}`;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-4 md:inset-x-auto md:left-8 md:right-8 top-20 bottom-36 z-20 pointer-events-auto flex items-center justify-center select-none"
    >
      <div className="glass-strong p-6 md:p-8 rounded-3xl border border-lavender/40 shadow-2xl backdrop-blur-2xl max-w-2xl w-full text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sunset to-lavender mx-auto flex items-center justify-center text-xl shadow-lg mb-3">
          👑
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-sunset font-semibold">
          05 · Château de Versailles · Grand Bassin
        </span>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mt-1 mb-2">
          Journey Complete — Welcome to Versailles
        </h2>

        <p className="text-xs md:text-sm text-cream/80 max-w-lg mx-auto leading-relaxed mb-5">
          You've explored the journey of <strong className="text-white">Iksha Kumawat</strong>. Whether you have an innovative app idea, an AI collaboration, or design project, let's create something extraordinary together.
        </p>

        {/* Quick Social & Contact Action Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-cream flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Mail size={14} className="text-sunset" />
            <span>{personalInfo.email}</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-cream flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Linkedin size={14} className="text-lavender" />
            <span>LinkedIn</span>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-cream flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Github size={14} className="text-cream" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Inline Message Form */}
        <form onSubmit={handleSubmit} className="space-y-2 text-left max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-lavender"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-lavender"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Your message or collaboration idea..."
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-lavender resize-none"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-royal-purple via-lavender to-sunset text-xs font-bold text-white shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Send size={13} />
            <span>{submitted ? 'Opening Email Client...' : 'Send Message'}</span>
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={onRestartJourney}
            className="text-xs font-mono text-lavender/80 hover:text-white underline"
          >
            ↺ Walk Through Paris Journey Again
          </button>
        </div>
      </div>
    </motion.div>
  );
}
