import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ParticleField from '../components/ParticleField';
import { personalInfo } from '../data/portfolioData';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Realistic handling: open user's email client directly with prefilled body
    // while documenting endpoint integration for form submission backends
    try {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setStatus(null), 6000);
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
      text: personalInfo.email,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
      text: 'linkedin.com/in/iksha-kumawat-aa40a2334',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: personalInfo.github,
      text: 'github.com/ikshakumawat07',
    },
  ];

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <ParticleField count={25} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Let's Build Something Together" subtitle="Get In Touch" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-cream/70 text-base md:text-lg mb-16 max-w-xl mx-auto italic font-light"
        >
          "Let's build something people love."
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-display font-bold text-cream mb-6">Connect Directly</h3>
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:border-lavender/40 hover:glow-purple transition-all group"
                >
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-royal-purple/50 to-lavender/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <link.icon size={20} className="text-lavender" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs uppercase tracking-wider text-lavender/60 font-medium">
                      {link.label}
                    </p>
                    <p className="text-sm text-cream/90 truncate font-medium">{link.text}</p>
                  </div>
                </motion.a>
              ))}

              {/* Resume download card in Contact section */}
              <motion.a
                href={personalInfo.resumeUrl}
                download="Iksha_Kumawat_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 rounded-xl glass bg-royal-purple/30 border border-lavender/30 hover:border-lavender/60 hover:glow-purple transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blush-pink to-sunset-coral flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 shadow-md">
                  <Send size={18} className="text-deep-violet transform -rotate-45" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-sunset-coral font-bold">
                    Official Document
                  </p>
                  <p className="text-sm text-cream font-semibold">Download Full Resume (PDF)</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-cream/70 mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-royal-purple/15 text-cream placeholder-cream/30 border-lavender/20 focus:border-lavender/60 focus:outline-none focus:ring-1 focus:ring-lavender/40 transition-all text-sm"
                  placeholder="e.g. Marie Curie"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-cream/70 mb-2 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl glass bg-royal-purple/15 text-cream placeholder-cream/30 border-lavender/20 focus:border-lavender/60 focus:outline-none focus:ring-1 focus:ring-lavender/40 transition-all text-sm"
                  placeholder="marie@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-cream/70 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl glass bg-royal-purple/15 text-cream placeholder-cream/30 border-lavender/20 focus:border-lavender/60 focus:outline-none focus:ring-1 focus:ring-lavender/40 transition-all resize-none text-sm"
                  placeholder="Share a vision, project opportunity, or note..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer text-sm font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                  />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-300 text-xs p-3.5 rounded-xl bg-green-950/40 border border-green-500/30"
                >
                  <CheckCircle size={16} className="flex-shrink-0" />
                  <span>Your email client was opened with the message pre-filled!</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-300 text-xs p-3.5 rounded-xl bg-red-950/40 border border-red-500/30"
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>Please check your details and fill in all fields with a valid email.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
