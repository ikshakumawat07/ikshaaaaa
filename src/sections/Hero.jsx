import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Mail, ArrowRight, SkipForward, Play } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ParticleField from '../components/ParticleField';

const Scene3D = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  // introPhase:
  // 0: Eiffel Tower beneath purple-pink sunset clouds
  // 1: Tilt up + large animated text "IKSHA KUMAWAT"
  // 2: Smooth turn right into painted Parisian street at sunset
  // 3: "WELCOME TO MY WORLD" typography reveal
  // 4: Seamless transition complete -> Main portfolio homepage state
  const [introPhase, setIntroPhase] = useState(0);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [mediaAssetType, setMediaAssetType] = useState(null); // 'video' | 'frames' | null
  const [activeFrame, setActiveFrame] = useState(1);
  const videoRef = useRef(null);

  // Check if visitor has previously watched the intro in this session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('iksha_intro_seen');
    if (hasSeen === 'true') {
      setIsIntroActive(false);
      setIntroPhase(4);
    }
  }, []);

  // Inspect availability of supplied video or frame assets
  useEffect(() => {
    // Attempt detecting /assets/intro.mp4
    const testVideo = document.createElement('video');
    testVideo.src = '/assets/intro.mp4';
    testVideo.oncanplay = () => {
      setMediaAssetType('video');
    };
    testVideo.onerror = () => {
      // Check for frame1.png fallback
      const testImg = new Image();
      testImg.src = '/assets/frame1.png';
      testImg.onload = () => setMediaAssetType('frames');
      testImg.onerror = () => setMediaAssetType(null); // Pure Three.js Canvas
    };
  }, []);

  // Frame switcher if frame assets are present
  useEffect(() => {
    if (mediaAssetType === 'frames' && isIntroActive) {
      const frameInterval = setInterval(() => {
        setActiveFrame((prev) => (prev === 1 ? 2 : 1));
      }, 4000);
      return () => clearInterval(frameInterval);
    }
  }, [mediaAssetType, isIntroActive]);

  // Choreograph the cinematic camera and typographic sequence
  useEffect(() => {
    if (!isIntroActive) return;

    const timers = [
      setTimeout(() => setIntroPhase(1), 2200), // Name title sequence
      setTimeout(() => setIntroPhase(2), 5200), // Pan to Parisian street
      setTimeout(() => setIntroPhase(3), 7400), // "Welcome to my world"
      setTimeout(() => {
        setIntroPhase(4);
        setIsIntroActive(false);
        sessionStorage.setItem('iksha_intro_seen', 'true');
      }, 10500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isIntroActive]);

  const handleSkipIntro = () => {
    setIsIntroActive(false);
    setIntroPhase(4);
    sessionStorage.setItem('iksha_intro_seen', 'true');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplayIntro = () => {
    setIntroPhase(0);
    setIsIntroActive(true);
    sessionStorage.removeItem('iksha_intro_seen');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-violet select-none"
    >
      {/* ── Base Parisian Sunset Background Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180A24] via-[#2D1640] to-deep-violet pointer-events-none" />

      {/* ── Optional Supplied Media Video Background ── */}
      {mediaAssetType === 'video' && isIntroActive && (
        <video
          ref={videoRef}
          src="/assets/intro.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          onEnded={handleSkipIntro}
        />
      )}

      {/* ── Optional Supplied Media Frame Fallback ── */}
      {mediaAssetType === 'frames' && isIntroActive && (
        <motion.div
          key={activeFrame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/assets/frame${activeFrame}.png)` }}
        />
      )}

      {/* ── Real-time 3D Three.js Eiffel Tower & Paris Scene ── */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Suspense fallback={<div className="w-full h-full bg-[#21112F]" />}>
          <Scene3D introPhase={introPhase} />
        </Suspense>
      </div>

      {/* ── Atmospheric Depth & Vignette Layers ── */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-deep-violet via-transparent to-[#21112F]/40 pointer-events-none" />
      <div className="absolute inset-0 z-15 bg-radial-vignette pointer-events-none" />

      {/* ── Floating Atmospheric Particles ── */}
      <ParticleField count={45} className="z-20" />

      {/* ──────────────────────────────────────────────────────────
          CINEMATIC INTRO OVERLAY SEQUENCE (Phases 0 - 3)
         ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            key="cinematic-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6"
          >
            {/* Phase 0 & 1: Tower Panorama + Animated Name */}
            <AnimatePresence mode="wait">
              {introPhase <= 1 && (
                <motion.div
                  key="intro-phase-name"
                  initial={{ opacity: 0, y: 30, letterSpacing: '0.4em' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    letterSpacing: '0.25em',
                    transition: { duration: 1.8, ease: 'easeOut' },
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                    scale: 1.05,
                    transition: { duration: 1.2, ease: 'easeInOut' },
                  }}
                  className="text-center"
                >
                  <p className="text-lavender/70 uppercase text-xs md:text-sm font-medium tracking-[0.5em] mb-4">
                    Paris At Sunset · A Digital Journey
                  </p>
                  <h1
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-cream tracking-wider"
                    style={{
                      textShadow:
                        '0 0 40px rgba(185, 162, 232, 0.6), 0 0 80px rgba(242, 183, 203, 0.3)',
                    }}
                  >
                    IKSHA KUMAWAT
                  </h1>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="w-32 h-[2px] bg-gradient-to-r from-transparent via-blush-pink to-transparent mx-auto mt-6"
                  />
                </motion.div>
              )}

              {/* Phase 2 & 3: Turn to Parisian Street + "WELCOME TO MY WORLD" */}
              {(introPhase === 2 || introPhase === 3) && (
                <motion.div
                  key="intro-phase-welcome"
                  initial={{ opacity: 0, scale: 0.92, y: 25 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 1.6, ease: 'easeOut' },
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    scale: 1.04,
                    transition: { duration: 1.4 },
                  }}
                  className="text-center"
                >
                  <p className="text-sunset-orange/90 uppercase text-xs md:text-sm tracking-[0.45em] mb-3 font-medium">
                    Golden Hour Whispers
                  </p>
                  <h2
                    className="text-3xl sm:text-5xl md:text-7xl font-display italic font-light text-gradient"
                    style={{
                      textShadow: '0 0 50px rgba(244, 161, 108, 0.5)',
                    }}
                  >
                    WELCOME TO MY WORLD
                  </h2>
                  <p className="text-cream/60 text-sm md:text-base mt-4 font-light tracking-widest max-w-md mx-auto">
                    Where artificial intelligence and design engineering intertwine
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip Intro Button (Clickable, immediate jump) */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleSkipIntro}
              className="absolute bottom-10 right-6 sm:right-10 pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:glow-purple transition-all duration-300 text-cream/70 hover:text-cream text-xs md:text-sm group"
              aria-label="Skip cinematic introduction"
            >
              <span>Skip Intro</span>
              <SkipForward
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          MAIN PORTFOLIO HERO CONTENT (Homepage State, Phase 4)
         ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isIntroActive && (
          <motion.div
            key="homepage-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-16 md:pt-0"
          >
            {/* Architectural accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-lavender/25 text-lavender text-xs uppercase tracking-[0.3em] mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-sunset-orange animate-pulse" />
              <span>AI & ML Specialist · Designer</span>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1.0 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-cream mb-6 tracking-tight"
            >
              <span className="text-gradient">Iksha Kumawat</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9 }}
              className="text-base sm:text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Computer Science student building AI tools, mobile apps, and developer
              systems, with a designer's eye.
            </motion.p>

            {/* Interactive CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
            >
              {/* View My Work */}
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary flex items-center gap-2.5 text-sm sm:text-base group font-medium text-cream cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </motion.button>

              {/* Download Resume */}
              <motion.a
                href={personalInfo.resumeUrl}
                download="Iksha_Kumawat_Resume.pdf"
                className="btn-outline flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                <span>Download Resume</span>
              </motion.a>

              {/* Contact Me */}
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-3 rounded-full text-sm sm:text-base text-lavender hover:text-cream hover:bg-lavender/10 transition-colors flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </motion.button>
            </motion.div>

            {/* Replay Intro pill button for visitors who wish to re-experience */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-10"
            >
              <button
                type="button"
                onClick={handleReplayIntro}
                className="inline-flex items-center gap-1.5 text-xs text-lavender/40 hover:text-lavender transition-colors cursor-pointer group"
                title="Replay cinematic Paris sunset opening"
              >
                <Play size={11} className="group-hover:scale-110 transition-transform" />
                <span>Replay Cinematic Experience</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouncing Scroll Down Cue ── */}
      {!isIntroActive && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          onClick={() => scrollToSection('#about')}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-lavender/50 hover:text-cream transition-colors cursor-pointer"
          aria-label="Scroll down to About section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
