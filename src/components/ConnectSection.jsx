import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, ArrowUp, Copy, Check, ExternalLink } from 'lucide-react';

export default function ConnectSection({ onBackToTop }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-end select-none bg-black">
      {/* Background Image: The uploaded swing/cloud artwork */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/connect_bg.jpg"
          alt="Sky with swing artwork"
          className="w-full h-full object-cover object-left md:object-center"
        />
        {/* Soft atmospheric gradient to ensure legibility on the right side while highlighting artwork on the left */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/75 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Right-Hand Side: Animated "LET'S CONNECT" Card */}
      <div className="relative z-10 w-full md:w-[56%] lg:w-[48%] xl:w-[42%] px-4 sm:px-6 md:px-10 lg:px-14 py-12 flex flex-col justify-center items-end">
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-black/55 hover:bg-black/65 backdrop-blur-xl border border-white/20 hover:border-white/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white font-heading drop-shadow-md">
              LET'S CONNECT
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 rounded-full mt-3" />
          </motion.div>

          {/* Contact Details List */}
          <div className="space-y-3.5">
            {/* MAIL */}
            <motion.a
              href="mailto:IKSHAKUMAWAT2007@GMAIL.COM"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ scale: 1.015, x: -3 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-pink-400/40 backdrop-blur-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-pink-500/30 transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/60 group-hover:text-pink-300 transition-colors">
                    MAIL:
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    IKSHAKUMAWAT2007@GMAIL.COM
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* GIT */}
            <motion.a
              href="https://github.com/ikshakumawat07"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.015, x: -3 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-purple-400/40 backdrop-blur-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/60 group-hover:text-purple-300 transition-colors">
                    GIT:
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    https://github.com/ikshakumawat07
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* LINKEDIN */}
            <motion.a
              href="https://www.linkedin.com/in/iksha-kumawat-aa40a2334/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              whileHover={{ scale: 1.015, x: -3 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-sky-400/40 backdrop-blur-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:scale-110 group-hover:bg-sky-500/30 transition-all shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/60 group-hover:text-sky-300 transition-colors">
                    LINKEDIN:
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                    https://www.linkedin.com/in/iksha-kumawat-aa40a2334/
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-emerald-400/40 backdrop-blur-md transition-all"
            >
              <a
                href="tel:+916367381319"
                className="flex items-center gap-3.5 min-w-0 flex-1 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-white/60 group-hover:text-emerald-300 transition-colors">
                    CONTACT:
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    +91 6367381319
                  </div>
                </div>
              </a>
              <button
                onClick={() => handleCopy('+91 6367381319')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-all ml-2 cursor-pointer"
                title="Copy contact number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </motion.div>
          </div>

          {/* Back to Journey Button */}
          {onBackToTop && (
            <motion.button
              onClick={onBackToTop}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white font-mono text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span>Back to Journey</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
