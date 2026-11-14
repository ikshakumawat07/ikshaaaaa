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
          {/* Section Header: font-curly preserved for lets connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-200 text-xs font-curly tracking-wide mb-3 shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300 animate-pulse" />
              <span>get in touch</span>
            </div>
            <h2 className="font-curly text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] leading-tight">
              let's connect
            </h2>
            <div className="h-0.5 w-28 bg-gradient-to-r from-[#faede0] via-[#cbb998] to-transparent rounded-full mt-3 drop-shadow" />
          </motion.div>

          {/* Contact Details List - Tan Pearl & Deep Forest Green Glass Theme */}
          <div className="space-y-3">
            {/* MAIL */}
            <motion.a
              href="mailto:IKSHAKUMAWAT2007@GMAIL.COM"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ x: -4 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#162e20]/65 hover:bg-[#1a3827]/85 border border-[#e8dcbf]/25 hover:border-[#e8dcbf]/50 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(10,25,16,0.35)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#234530]/70 border border-[#e8dcbf]/30 flex items-center justify-center text-[#faede0] group-hover:scale-110 group-hover:bg-[#2c573d] transition-all shrink-0 drop-shadow">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-pearl text-sm sm:text-base font-semibold tracking-wider text-[#faede0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    Mail :
                  </div>
                  <div className="font-pearl text-xs sm:text-sm md:text-base text-[#f5ebd6] tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">
                    IKSHAKUMAWAT2007@GMAIL.COM
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#faede0]/60 group-hover:text-[#faede0] transition-colors shrink-0 ml-2" />
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
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#162e20]/65 hover:bg-[#1a3827]/85 border border-[#e8dcbf]/25 hover:border-[#e8dcbf]/50 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(10,25,16,0.35)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#234530]/70 border border-[#e8dcbf]/30 flex items-center justify-center text-[#faede0] group-hover:scale-110 group-hover:bg-[#2c573d] transition-all shrink-0 drop-shadow">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-pearl text-sm sm:text-base font-semibold tracking-wider text-[#faede0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    Git :
                  </div>
                  <div className="font-pearl text-xs sm:text-sm md:text-base text-[#f5ebd6] tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">
                    https://github.com/ikshakumawat07
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#faede0]/60 group-hover:text-[#faede0] transition-colors shrink-0 ml-2" />
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
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#162e20]/65 hover:bg-[#1a3827]/85 border border-[#e8dcbf]/25 hover:border-[#e8dcbf]/50 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(10,25,16,0.35)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#234530]/70 border border-[#e8dcbf]/30 flex items-center justify-center text-[#faede0] group-hover:scale-110 group-hover:bg-[#2c573d] transition-all shrink-0 drop-shadow">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-pearl text-sm sm:text-base font-semibold tracking-wider text-[#faede0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    LinkedIn :
                  </div>
                  <div className="font-pearl text-xs sm:text-sm md:text-base text-[#f5ebd6] tracking-wide truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">
                    https://www.linkedin.com/in/iksha-kumawat-aa40a2334/
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#faede0]/60 group-hover:text-[#faede0] transition-colors shrink-0 ml-2" />
            </motion.a>

            {/* CONTACT */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#162e20]/65 hover:bg-[#1a3827]/85 border border-[#e8dcbf]/25 hover:border-[#e8dcbf]/50 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(10,25,16,0.35)]"
            >
              <a
                href="tel:+916367381319"
                className="flex items-center gap-3.5 min-w-0 flex-1 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-[#234530]/70 border border-[#e8dcbf]/30 flex items-center justify-center text-[#faede0] group-hover:scale-110 group-hover:bg-[#2c573d] transition-all shrink-0 drop-shadow">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-pearl text-sm sm:text-base font-semibold tracking-wider text-[#faede0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    Contact :
                  </div>
                  <div className="font-pearl text-xs sm:text-sm md:text-base text-[#f5ebd6] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                    +91 6367381319
                  </div>
                </div>
              </a>
              <button
                onClick={() => handleCopy('+91 6367381319')}
                className="px-3 py-1.5 rounded-xl bg-[#234530]/80 hover:bg-[#2c573d] border border-[#e8dcbf]/30 text-[#faede0] text-xs font-pearl flex items-center gap-1.5 transition-all ml-2 cursor-pointer shadow-sm"
                title="Copy contact number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
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
              className="mt-6 flex justify-start md:justify-end"
            >
              <button
                onClick={onBackToTop}
                className="px-6 py-2.5 rounded-full bg-[#162e20]/75 hover:bg-[#1a3827]/95 border border-[#e8dcbf]/35 hover:border-[#e8dcbf]/60 backdrop-blur-md text-[#faede0] font-pearl text-sm tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span>Back to Journey</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
