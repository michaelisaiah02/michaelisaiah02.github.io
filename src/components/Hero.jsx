import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Konten Teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <p className="text-accent font-bold tracking-wider uppercase mb-2 transition-colors">
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
          
          {/* Tombol Aksi - Direvisi jadi flex wrap biar rapi di HP */}
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
            {/* Tombol Download CV Baru */}
            {/* <a 
              href="/CV_Michael_Isaiah.pdf"
              download
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-semibold transition-all flex items-center gap-2 justify-center"
            >
              <FiDownload />
              {t('hero.download_cv')}
            </a> */}
          </div>
        </motion.div>

        {/* Gambar Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/20 blur-[80px] rounded-full"></div>
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            src="/img/michael.jpg"
            alt="Michael Isaiah"
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-bg-light dark:border-bg-dark shadow-2xl ring-4 ring-primary/30"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;