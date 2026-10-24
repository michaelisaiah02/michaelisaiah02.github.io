import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiGlobe, FiUser, FiCompass } from 'react-icons/fi';
import Globe3D from './Globe3D';

const Hero = () => {
  const { t } = useTranslation();
  const [show3D, setShow3D] = useState(true); // Default langsung pamer 3D Globe!

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Konten Teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          {/* Badge Misi 195 Negara */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-semibold mb-4 shadow-sm">
            <FiCompass className="animate-spin text-sm" style={{ animationDuration: '6s' }} />
            <span>{t('hero.odyssey_badge')}</span>
          </div>

          <p className="text-accent font-bold tracking-wider uppercase mb-2 transition-colors text-sm">
            {t('hero.greeting')}
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white transition-colors">
            {t('hero.name')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6 transition-colors">
            {t('hero.role')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed text-lg transition-colors">
            {t('hero.description')}
          </p>
          
          {/* Tombol Aksi */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/40 flex items-center justify-center"
            >
              {t('hero.cta')}
            </a>
            <a 
              href="#projects" 
              className="px-8 py-3 border-2 border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary rounded-full font-semibold transition-all flex items-center justify-center"
            >
              {t('hero.projects')}
            </a>
            <a 
              href="/CV_Michael_Isaiah.pdf"
              download
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-semibold transition-all flex items-center gap-2 justify-center"
            >
              <FiDownload />
              {t('hero.download_cv')}
            </a>
          </div>
        </motion.div>

        {/* Area Visual 3D Globe / Foto Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col items-center justify-center relative"
        >
          {/* Glow Effect di Belakang */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/20 blur-[90px] rounded-full pointer-events-none"></div>

          {/* Toggle Switch: 3D Globe vs Foto */}
          <div className="z-20 mb-3 flex items-center gap-2 bg-slate-200/70 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setShow3D(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                show3D ? 'bg-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiGlobe /> {t('hero.toggle_globe')}
            </button>
            <button
              onClick={() => setShow3D(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                !show3D ? 'bg-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiUser /> {t('hero.toggle_photo')}
            </button>
          </div>

          {/* Kontainer Render */}
          <div className="relative z-10 min-h-[360px] flex items-center justify-center">
            {show3D ? (
              <Globe3D />
            ) : (
              <motion.img
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                src="/img/michael.jpg"
                alt="Michael Isaiah"
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-bg-light dark:border-bg-dark shadow-2xl ring-4 ring-primary/30"
              />
            )}
          </div>

          {/* HUD Koordinat Explorer */}
          <div className="z-20 mt-2 text-[11px] font-mono tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 px-4 py-1 rounded-md border border-slate-200 dark:border-slate-700/60">
            {t('hero.coord_label')}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;