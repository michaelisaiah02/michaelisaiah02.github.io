import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase } from 'react-icons/fi';

const Experience = () => {
  const { t } = useTranslation();
  const experienceList = t('experience.list', { returnObjects: true });

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Kontainer Utama Timeline */}
        <div className="relative">
          {/* Garis Vertikal (Di kiri kalau Mobile, Di tengah kalau Desktop) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 rounded-full"></div>

          {experienceList.map((exp, index) => {
            // Nentuin apakah ini item ganjil/genap buat posisi kiri/kanan
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex items-center w-full mb-12"
              >
                {/* Buletan Icon (Dipaku posisinya di atas garis) */}
                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md z-10 -translate-x-1/2">
                  <FiBriefcase className="text-xl" />
                </div>

                {/* Kontainer Kartu Teks */}
                <div 
                  className={`w-full md:w-1/2 pl-24 md:pl-0 ${
                    isEven 
                      ? 'md:pr-14 md:text-right' // Kalau di Kiri
                      : 'md:pl-14 md:ml-auto md:text-left' // Kalau di Kanan (didorong ml-auto)
                  }`}
                >
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <span className="text-sm font-bold text-accent mb-2 inline-block">
                      {exp.date}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                      {exp.role}
                    </h3>
                    <h4 className="text-md font-medium text-slate-500 dark:text-slate-400 mb-4">
                      {exp.company}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;