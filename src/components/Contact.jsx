import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaInstagram, FaTelegramPlane, FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import { FiRadio, FiSend, FiAnchor, FiLayout, FiActivity } from 'react-icons/fi';

// Data gelembung bawah laut (statis agar stabil saat render)
const oceanBubbles = [
  { id: 1, left: '8%', size: 10, duration: 9, delay: 0 },
  { id: 2, left: '22%', size: 6, duration: 12, delay: 2 },
  { id: 3, left: '38%', size: 14, duration: 10, delay: 1 },
  { id: 4, left: '55%', size: 8, duration: 14, delay: 3 },
  { id: 5, left: '72%', size: 12, duration: 11, delay: 0.5 },
  { id: 6, left: '88%', size: 7, duration: 13, delay: 2.5 },
  { id: 7, left: '94%', size: 11, duration: 9.5, delay: 1.5 }
];

const Contact = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('ocean'); // 'ocean' | 'classic'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [pingCount, setPingCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mjvzkolo', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setPingCount((prev) => prev + 1);
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setIsSubmitting(false);
  };

  const socialLinks = [
    { name: 'WhatsApp', freq: '142.8 MHz', icon: <FaWhatsapp />, url: 'https://wa.me/+6289669045879', color: 'hover:text-[#25D366] hover:border-[#25D366]' },
    { name: 'Instagram', freq: '108.4 MHz', icon: <FaInstagram />, url: 'https://www.instagram.com/michaelisaiah02/', color: 'hover:text-[#E1306C] hover:border-[#E1306C]' },
    { name: 'Telegram', freq: '156.0 MHz', icon: <FaTelegramPlane />, url: 'https://t.me/michaelisaiah02', color: 'hover:text-[#0088cc] hover:border-[#0088cc]' },
    { name: 'Discord', freq: '168.2 MHz', icon: <FaDiscord />, url: 'https://discordapp.com/users/michaelisaiah02#0083', color: 'hover:text-[#5865F2] hover:border-[#5865F2]' },
    { name: 'LinkedIn', freq: '121.5 MHz', icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/michael-isaiah-757413222/', color: 'hover:text-[#0077b5] hover:border-[#0077b5]' }
  ];

  return (
    <section
      id="contact"
      className={`py-24 relative overflow-hidden transition-colors duration-500 ${
        viewMode === 'ocean'
          ? 'bg-gradient-to-b from-sky-50 via-cyan-100/60 to-teal-100/70 dark:from-slate-900 dark:via-[#06182c] dark:to-[#020b16]'
          : 'bg-white dark:bg-slate-900'
      }`}
    >
      {/* EFEK VISUAL BAWAH LAUT (Cuma di Mode Ocean) */}
      {viewMode === 'ocean' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 1. Gelombang Transisi Permukaan Laut di Atas */}
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="w-full h-10 md:h-14 text-white dark:text-slate-900 fill-current absolute top-0 left-0"
          >
            <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
          </svg>

          {/* 2. Sinar Matahari Menembus Air (Underwater God Rays) */}
          <div
            className="absolute -top-24 left-1/4 w-72 h-[520px] rotate-12 opacity-30 dark:opacity-15 blur-3xl"
            style={{
              background: 'linear-gradient(180deg, rgba(56,189,248,0.6) 0%, rgba(16,185,129,0.1) 70%, transparent 100%)'
            }}
          />
          <div
            className="absolute -top-24 right-1/4 w-60 h-[460px] -rotate-12 opacity-25 dark:opacity-10 blur-3xl"
            style={{
              background: 'linear-gradient(180deg, rgba(16,185,129,0.5) 0%, rgba(14,165,233,0.1) 70%, transparent 100%)'
            }}
          />

          {/* 3. Gelembung Udara & Plankton Bioluminescent Naik ke Atas */}
          {oceanBubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: b.duration,
                repeat: Infinity,
                delay: b.delay,
                ease: 'linear'
              }}
              style={{
                left: b.left,
                width: b.size,
                height: b.size
              }}
              className="absolute bottom-0 rounded-full bg-sky-400/40 dark:bg-cyan-300/30 border border-sky-400/60 dark:border-teal-300/50 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        
        {/* Header & Mode Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-12"
        >
          <div>
            {viewMode === 'ocean' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 dark:bg-cyan-500/10 border border-sky-500/30 text-sky-700 dark:text-cyan-300 text-xs font-mono font-bold mb-3">
                <FiAnchor className="animate-pulse" />
                <span>{t('contact.depth_badge')}</span>
              </div>
            )}
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              {t('contact.title')}
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setViewMode('ocean')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'ocean'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-sky-500'
              }`}
            >
              <FiRadio /> {t('contact.mode_ocean')}
            </button>
            <button
              onClick={() => setViewMode('classic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'classic'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiLayout /> {t('contact.mode_classic')}
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          
          {/* KOLOM KIRI: SONAR RADAR TRANSPONDER & SOSMED */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-sky-200/80 dark:border-cyan-500/20 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-sky-700 dark:text-cyan-400 mb-3">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {t('contact.sonar_active')}
                </span>
                <span>110.4 ATM // 4°C</span>
              </div>

              <h3 className="text-2xl font-extrabold mb-3 text-slate-800 dark:text-white">
                {t('contact.subtitle')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {t('contact.desc')}
              </p>
            </div>

            {/* Visual Radar Sonar Interaktif */}
            {viewMode === 'ocean' && (
              <div className="relative w-48 h-48 mx-auto my-4 rounded-full border-2 border-sky-500/40 dark:border-cyan-400/40 bg-sky-950/10 dark:bg-slate-950/80 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                {/* Lingkaran Grid Sonar */}
                <div className="absolute w-32 h-32 rounded-full border border-sky-500/30 dark:border-cyan-400/25" />
                <div className="absolute w-16 h-16 rounded-full border border-sky-500/30 dark:border-cyan-400/25" />
                <div className="absolute w-full h-[1px] bg-sky-500/25" />
                <div className="absolute h-full w-[1px] bg-sky-500/25" />

                {/* Jarum Pemindai Radar Berputar */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.35) 0deg, transparent 75deg, transparent 360deg)'
                  }}
                />

                {/* Efek Gelombang Ping Manual Saat Diklik */}
                <motion.div
                  key={pingCount}
                  initial={{ scale: 0.2, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute w-20 h-20 rounded-full border-2 border-emerald-400 pointer-events-none"
                />

                {/* Titik Blip Sonar */}
                <div className="absolute top-10 left-14 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                <div className="absolute bottom-12 right-10 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />

                <button
                  type="button"
                  onClick={() => setPingCount((c) => c + 1)}
                  className="relative z-10 px-3 py-1.5 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/50 text-[10px] font-mono font-bold hover:scale-105 transition-transform cursor-pointer"
                >
                  📡 {t('contact.ping_btn')}
                </button>
              </div>
            )}

            {/* Frekuensi Sosial Media */}
            <div className="mt-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <FiActivity className="text-primary" /> Direct Comms Channels:
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${social.name} (${social.freq})`}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 text-lg transition-all duration-300 hover:-translate-y-1 ${social.color} shadow-sm border border-slate-200 dark:border-slate-700`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: FORM TRANSMISI SONAR */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:w-7/12 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-sky-200/80 dark:border-cyan-500/20"
          >
            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-medium">
                {t('contact.success_msg')}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {t('contact.error_msg')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full-name" className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('contact.name_label')}
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors text-slate-800 dark:text-slate-100 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('contact.email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors text-slate-800 dark:text-slate-100 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('contact.subject_label')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors text-slate-800 dark:text-slate-100 text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('contact.message_label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors text-slate-800 dark:text-slate-100 resize-none text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-primary to-sky-500 hover:from-primary-hover hover:to-sky-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-sky-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t('contact.btn_loading')}
                  </div>
                ) : (
                  <>
                    <FiSend />
                    <span>{t('contact.btn_send')}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;