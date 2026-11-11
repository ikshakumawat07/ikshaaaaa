import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-lavender/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-lavender hover:text-cream transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Credit */}
          <p className="text-sm text-cream/40 flex items-center gap-1">
            Designed & built with <Heart size={14} className="text-blush-pink" /> by Iksha Kumawat
          </p>

          {/* Copyright */}
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} Iksha Kumawat. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        className="absolute right-6 -top-5 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-lavender hover:text-cream transition-colors"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
