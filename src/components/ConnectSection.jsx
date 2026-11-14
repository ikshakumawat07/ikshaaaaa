import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, ArrowUp, Copy, Check, ExternalLink, Heart } from 'lucide-react';

export default function ConnectSection({ onBackToTop }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-full overflow-hidden flex items-center justify-end select-none bg-black">
      {/* Background Image: Pure horizontal landscape artwork matching the video */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/connect_bg.jpg"
          alt="Sky with swing artwork"
          className="w-full h-full object-cover object-left md:object-center"
        />
        {/* Very subtle transparent vignette to keep text crisp against bright clouds */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/15 to-transparent pointer-events-none" />
      </div>

      {/* Right-Hand Side: 100% Transparent, Attractive & Modern Content */}
      <div className="relative z-10 w-full sm:w-[58%] md:w-[50%] lg:w-[44%] px-6 sm:px-8 md:px-12 py-8 flex flex-col justify-center items-start md:items-end text-left md:text-right">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-transparent border-none shadow-none"
        >
          {/* Section Header in Curly Font */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-200 text-xs font-curly tracking-wide mb-3 shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300 animate-pulse" />
              <span>get in touch</span>
            </div>
            <h2 className="font-curly text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] leading-tight">
              let's connect
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 rounded-full mt-3 drop-shadow" />
          </motion.div>

          {/* Contact Details List - Fully Transparent Rows */}
          <div className="space-y-3">
            {/* MAIL */}
            <motion.a
              href="mailto:IKSHAKUMAWAT2007@GMAIL.COM"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ x: -4 }}
              className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-pink-300/40 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-300/40 flex items-center justify-center text-pink-200 group-hover:scale-110 group-hover:bg-pink-500/30 transition-all shrink-0 drop-shadow">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-curly text-sm sm:text-base font-semibold tracking-wide text-pink-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    mail :
                  </div>
                  <div className="font-curly text-xs sm:text-sm md:text-base text-white tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-pink-100 transition-colors">
                    IKSHAKUMAWAT2007@GMAIL.COM
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* GIT */}
            <motion.a
              href="https://github.com/ikshakumawat07"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ x: -4 }}
              className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-purple-300/40 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-purple-200 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all shrink-0 drop-shadow">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-curly text-sm sm:text-base font-semibold tracking-wide text-purple-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    git :
                  </div>
                  <div className="font-curly text-xs sm:text-sm md:text-base text-white tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-purple-100 transition-colors">
                    https://github.com/ikshakumawat07
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* LINKEDIN */}
            <motion.a
              href="https://www.linkedin.com/in/iksha-kumawat-aa40a2334/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ x: -4 }}
              className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-sky-300/40 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-300/40 flex items-center justify-center text-sky-200 group-hover:scale-110 group-hover:bg-sky-500/30 transition-all shrink-0 drop-shadow">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-curly text-sm sm:text-base font-semibold tracking-wide text-sky-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    linkedin :
                  </div>
                  <div className="font-curly text-xs sm:text-sm md:text-base text-white tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-sky-100 transition-colors">
                    https://www.linkedin.com/in/iksha-kumawat-aa40a2334/
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-300/40 backdrop-blur-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <a
                href="tel:+916367381319"
                className="flex items-center gap-3.5 min-w-0 flex-1 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-300/40 flex items-center justify-center text-emerald-200 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all shrink-0 drop-shadow">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-curly text-sm sm:text-base font-semibold tracking-wide text-emerald-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    contact :
                  </div>
                  <div className="font-curly text-xs sm:text-sm md:text-base text-white tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                    +91 6367381319
                  </div>
                </div>
              </a>
              <button
                onClick={() => handleCopy('+91 6367381319')}
                className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/25 border border-white/20 text-white/90 hover:text-white text-xs font-curly flex items-center gap-1 transition-all ml-2 cursor-pointer shadow-sm"
                title="Copy contact number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'copied' : 'copy'}</span>
              </button>
            </motion.div>
          </div>

          {/* Back to Journey Button */}
          {onBackToTop && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex justify-start md:justify-end"
            >
              <button
                onClick={onBackToTop}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 hover:border-white/50 backdrop-blur-md text-white font-curly text-sm tracking-wide flex items-center gap-2 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span>back to journey</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
