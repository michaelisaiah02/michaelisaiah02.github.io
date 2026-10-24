import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiFolder,
  FiExternalLink,
  FiLayers,
  FiGrid,
  FiCpu,
  FiLock,
  FiZap,
  FiShield,
  FiActivity
} from 'react-icons/fi';

const cardMeta = [
  {
    code: 'CARD-01 // AI-SYNTH',
    rarity: 'SSR',
    biome: 'Horizon Sky',
    gradient: 'from-emerald-500/10 via-sky-500/5 to-white dark:from-emerald-500/20 dark:via-sky-500/10 dark:to-slate-900',
    accentColor: '#10b981',
    stats: { arch: 92, auto: 95, impact: 90 }
  },
  {
    code: 'CARD-02 // DOCKER-ABYSS',
    rarity: 'UR',
    biome: 'Deep Ocean',
    gradient: 'from-sky-500/10 via-blue-500/5 to-white dark:from-sky-500/20 dark:via-blue-600/10 dark:to-slate-900',
    accentColor: '#0ea5e9',
    stats: { arch: 96, auto: 94, impact: 98 }
  },
  {
    code: 'CARD-03 // CRYPTO-STAMP',
    rarity: 'SSR',
    biome: 'Alpine Peak',
    gradient: 'from-amber-500/10 via-emerald-500/5 to-white dark:from-amber-500/20 dark:via-emerald-500/10 dark:to-slate-900',
    accentColor: '#f59e0b',
    stats: { arch: 88, auto: 97, impact: 92 }
  },
  {
    code: 'CARD-04 // TELEMETRY-CORE',
    rarity: 'SR',
    biome: 'Terra Forest',
    gradient: 'from-purple-500/10 via-indigo-500/5 to-white dark:from-purple-500/20 dark:via-indigo-500/10 dark:to-slate-900',
    accentColor: '#a855f7',
    stats: { arch: 86, auto: 85, impact: 89 }
  }
];

const HoloCard = ({ project, meta, index, isSelected, onSelect, t }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <div style={{ perspective: '1100px' }} className="h-full">
      <div
        onClick={() => onSelect(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
            tilt.isHovered ? 1.03 : 1
          }, ${tilt.isHovered ? 1.03 : 1}, 1)`,
          transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className={`relative cursor-pointer rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden border bg-gradient-to-br ${
          meta.gradient
        } bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 select-none transition-colors ${
          isSelected
            ? 'border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/40 dark:ring-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
            : 'border-slate-200 dark:border-slate-700/80 hover:border-sky-400/70 shadow-lg dark:shadow-xl'
        }`}
      >
        {/* Efek Kilau Hologram Dinamis */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: tilt.isHovered ? 0.45 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(16,185,129,0.32), rgba(14,165,233,0.22) 40%, transparent 75%)`
          }}
        />

        {/* Header Kartu */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950/70 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
              {meta.code}
            </span>
            <span
              style={{ color: meta.accentColor, borderColor: meta.accentColor }}
              className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full border bg-white/90 dark:bg-slate-950/80 shadow-sm"
            >
              ★ {meta.rarity}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300/90 line-clamp-3 leading-relaxed mb-4">
            {project.desc}
          </p>
        </div>

        {/* Footer Kartu */}
        <div className="relative z-10 mt-auto pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-semibold text-sky-700 dark:text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className={isSelected ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'}>
              {isSelected ? `⚡ ${t('projects.deployed_badge')}` : `▸ ${t('projects.deploy_btn')}`}
            </span>
            <span className="text-slate-400 dark:text-slate-500">{meta.biome}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const projectList = t('projects.list', { returnObjects: true });
  const [viewMode, setViewMode] = useState('deck');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projectList[activeIndex] || projectList[0];
  const activeMeta = cardMeta[activeIndex % cardMeta.length];

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-bg-dark transition-colors relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              {t('projects.title')}
            </h2>
            <span className="h-1 flex-1 bg-primary rounded-full max-w-xs hidden sm:block"></span>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setViewMode('deck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'deck'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiLayers /> {t('projects.mode_deck')}
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiGrid /> {t('projects.mode_grid')}
            </button>
          </div>
        </motion.div>

        {viewMode === 'deck' ? (
          <div>
            {/* 1. TACTICAL INSPECTION ARENA (Adaptif Light & Dark) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="mb-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/90 p-6 md:p-8 text-slate-800 dark:text-slate-100 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors"
              >
                <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/15 blur-[90px] rounded-full pointer-events-none" />

                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between relative z-10">
                  <div className="lg:w-7/12">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FiZap /> {t('projects.arena_label')}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        [{activeMeta.code} • {activeMeta.biome}]
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      {activeProject.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
                      {activeProject.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      {activeProject.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono font-semibold text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}

                      {activeProject.link ? (
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-lg"
                        >
                          <FiExternalLink /> {t('projects.view_project')}
                        </a>
                      ) : (
                        <span className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-mono">
                          <FiLock /> {t('projects.private_badge')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bar Statistik RPG */}
                  <div className="lg:w-4/12 w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3.5 transition-colors">
                    <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Tactical System Metrics</span>
                      <span className="text-emerald-600 dark:text-emerald-400">TIER {activeMeta.rarity}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><FiCpu className="text-emerald-500" /> System Architecture</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeMeta.stats.arch}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${activeMeta.stats.arch}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><FiActivity className="text-sky-500" /> Automation & Logic</span>
                        <span className="text-sky-600 dark:text-sky-400 font-bold">{activeMeta.stats.auto}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${activeMeta.stats.auto}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><FiShield className="text-amber-500" /> Operational Impact</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{activeMeta.stats.impact}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${activeMeta.stats.impact}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="text-center mb-6">
              <span className="inline-block text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700">
                {t('projects.deck_hint')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectList.map((project, index) => (
                <HoloCard
                  key={index}
                  index={index}
                  project={project}
                  meta={cardMeta[index % cardMeta.length]}
                  isSelected={activeIndex === index}
                  onSelect={setActiveIndex}
                  t={t}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectList.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full group"
              >
                <div className="flex justify-between items-center mb-6">
                  <FiFolder className="text-4xl text-primary" />
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
                    <li
                      key={idx}
                      className="text-xs font-mono font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;