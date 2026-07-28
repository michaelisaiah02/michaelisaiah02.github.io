import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPhp, FaLaravel, FaReact, FaUnity } from 'react-icons/fa';
import { SiMysql, SiTailwindcss } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

const About = () => {
  const { t } = useTranslation();

const skills = [
    { name: 'PHP', icon: <FaPhp className="text-4xl text-[#777BB4]" /> },
    { name: 'Laravel', icon: <FaLaravel className="text-4xl text-[#FF2D20]" /> },
    { name: 'MySQL', icon: <SiMysql className="text-4xl text-[#4479A1]" /> },
    { name: 'React', icon: <FaReact className="text-4xl text-[#61DAFB]" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-4xl text-[#06B6D4]" /> },
    { name: 'C#', icon: <TbBrandCSharp className="text-4xl text-[#239120]" /> },
    { name: 'Unity', icon: <FaUnity className="text-4xl text-slate-800 dark:text-slate-200" /> },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Kolom Teks / Cerita */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-4">
              {t('about.title')}
              <span className="h-1 flex-1 bg-primary rounded-full"></span>
            </h2>
            <div className="text-lg text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
            </div>
          </motion.div>

          {/* Kolom Skills Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 w-full"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200 text-center md:text-left">
              {t('about.skills_title')}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-24 h-24 border border-slate-100 dark:border-slate-700"
                >
                  {skill.icon}
                  <span className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;