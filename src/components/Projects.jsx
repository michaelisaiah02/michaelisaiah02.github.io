import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiFolder, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const { t } = useTranslation();
  const projectList = t('projects.list', { returnObjects: true });

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-bg-dark transition-colors">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-4">
            {t('projects.title')}
            <span className="h-1 flex-1 bg-primary rounded-full max-w-xs"></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800/80 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full group relative"
            >
              <div className="flex justify-between items-center mb-6">
                <FiFolder className="text-4xl text-primary" />
                
                {/* Kondisional Rendering: Cuma muncul kalau link-nya ada */}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-accent transition-colors"
                    title={t('projects.view_project')}
                  >
                    <FiExternalLink className="text-2xl" />
                  </a>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                {project.desc}
              </p>
              
              <ul className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((tech, idx) => (
                  <li key={idx} className="text-xs font-mono font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;