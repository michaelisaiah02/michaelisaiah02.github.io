import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCompass, FiMapPin, FiTrendingUp, FiList, FiFlag, FiHome } from 'react-icons/fi';

const terrains = [
  'Pine Forest Trail',
  'Montane Cloud Forest',
  'Sub-Alpine Ridge',
  'Highland Rock Face',
  'Upper Timberline Crest',
  'Glacial Moraine'
];

const Experience = () => {
  const { t, i18n } = useTranslation();
  const experienceList = t('experience.list', { returnObjects: true });
  const [viewMode, setViewMode] = useState('expedition'); // 'expedition' | 'timeline'
  const [activeCamp, setActiveCamp] = useState(experienceList.length - 1); // Default di Camp terbaru (Camp 5)

  const totalCamps = experienceList.length;

  // 1. Titik Tetap: Basecamp (Awal) & Summit (Masih Progress)
  const basecampPoint = { x: 75, y: 318, elevation: '790 MDPL' };
  const summitPoint = { x: 925, y: 52, elevation: '4,884 MDPL' };

  // 2. Kalkulasi Dinamis Pos Camp 1 s/d Camp N agar selalu menanjak & tidak pernah numpuk
  const computedCamps = experienceList.map((exp, idx) => {
    const progress = (idx + 1) / (totalCamps + 1); // Nilai antara 0 dan 1 di antara Basecamp & Summit
    const x = Math.round(basecampPoint.x + progress * (summitPoint.x - basecampPoint.x));
    
    // Kurva pendakian natural dengan sedikit gelombang punggungan gunung
    const linearY = basecampPoint.y - progress * (basecampPoint.y - summitPoint.y);
    const ridgeWave = Math.sin(progress * Math.PI * 2.5) * 8;
    const y = Math.round(linearY + ridgeWave);

    // Elevasi MDPL selalu naik secara konsisten dari Camp 1 (1,250m) sampai Camp terakhir (3,650m)
    const elevationNum = Math.round(1250 + (idx / Math.max(1, totalCamps - 1)) * 2400);

    return {
      ...exp,
      index: idx,
      x,
      y,
      elevation: `${elevationNum.toLocaleString('en-US')} MDPL`,
      campCode: `CAMP 0${idx + 1} // POS PENDAKIAN`,
      terrain: terrains[idx % terrains.length]
    };
  });

  const currentCamp = computedCamps[activeCamp] || computedCamps[0];
  const lastCamp = computedCamps[computedCamps.length - 1] || basecampPoint;

  // Buat Path SVG Punggungan Gunung melewati Basecamp -> Semua Camp -> Summit
  const allRidgePoints = [basecampPoint, ...computedCamps, summitPoint];
  const ridgeLineCoords = allRidgePoints.map((p) => `${p.x} ${p.y}`).join(' L ');
  const mountainAreaPath = `M 0 360 L 0 338 L ${ridgeLineCoords} L 1000 105 L 1000 360 Z`;

  // Jalur yang sudah ditempuh (Basecamp -> Camp Terakhir)
  const completedTrailPoints = [basecampPoint, ...computedCamps].map((p) => `${p.x} ${p.y}`).join(' L ');
  // Jalur yang masih on-progress (Camp Terakhir -> Summit)
  const upcomingTrailPath = `M ${lastCamp.x} ${lastCamp.y} L ${summitPoint.x} ${summitPoint.y}`;

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 transition-colors overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header & Mode Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
              {t('experience.title')}
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setViewMode('expedition')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'expedition'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiCompass /> {t('experience.mode_expedition')}
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'timeline'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              <FiList /> {t('experience.mode_timeline')}
            </button>
          </div>
        </motion.div>

        {viewMode === 'expedition' ? (
          <div>
            {/* KANVAS PETA TOPOGRAFI GUNUNG */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-gradient-to-b from-sky-100/80 via-emerald-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-xl dark:shadow-2xl overflow-hidden mb-8 transition-colors relative">
              
              {/* Top HUD Bar */}
              <div className="px-5 py-3 border-b border-slate-200/70 dark:border-slate-800/80 flex flex-wrap justify-between items-center gap-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  <FiTrendingUp />
                  <span>{currentCamp.campCode}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sky-600 dark:text-sky-400">{currentCamp.elevation}</span>
                </div>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-semibold">
                  <FiFlag className="animate-bounce" /> {t('experience.summit_vision')} (IN PROGRESS)
                </div>
              </div>

              {/* Area Visual Peta Gunung */}
              <div className="relative w-full h-[300px] sm:h-[340px] select-none">
                <svg
                  viewBox="0 0 1000 360"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="mountainBack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="mountainFront" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>

                  {/* Garis Kontur Topografi Latar */}
                  <path d="M 0 130 Q 250 70 520 115 T 1000 65" fill="none" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 0 195 Q 320 135 620 165 T 1000 120" fill="none" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Siluet Pegunungan Latar Belakang */}
                  <path
                    d="M 0 360 L 0 265 L 150 195 L 310 235 L 490 125 L 660 175 L 830 65 L 1000 135 L 1000 360 Z"
                    fill="url(#mountainBack)"
                  />

                  {/* Siluet Punggungan Gunung Utama (Mengikuti Titik Pos) */}
                  <path
                    d={mountainAreaPath}
                    fill="url(#mountainFront)"
                  />

                  {/* Jalur Pendakian yang Sudah Ditempuh (Solid Emerald Glow) */}
                  <path
                    d={`M ${completedTrailPoints}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Jalur Menuju Puncak yang Masih In-Progress (Putus-Putus Amber) */}
                  <path
                    d={upcomingTrailPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeDasharray="7 7"
                  />

                  {/* 1. TITIK BASECAMP (Kaki Gunung) */}
                  <g transform={`translate(${basecampPoint.x}, ${basecampPoint.y})`}>
                    <circle r="9" fill="#64748b" stroke="#ffffff" strokeWidth="2.5" />
                  </g>

                  {/* 2. TITIK-TITIK CAMP 1 s/d CAMP 5 */}
                  {computedCamps.map((camp, idx) => {
                    const isSelected = activeCamp === idx;
                    return (
                      <g
                        key={idx}
                        transform={`translate(${camp.x}, ${camp.y})`}
                        onClick={() => setActiveCamp(idx)}
                        className="cursor-pointer"
                      >
                        {isSelected && (
                          <circle r="20" fill="#10b981" opacity="0.3" className="animate-ping" />
                        )}
                        <circle
                          r={isSelected ? 11 : 8}
                          fill={isSelected ? '#10b981' : '#0ea5e9'}
                          stroke="#ffffff"
                          strokeWidth="3"
                        />
                      </g>
                    );
                  })}

                  {/* 3. TITIK PUNCAK / SUMMIT (In Progress) */}
                  <g transform={`translate(${summitPoint.x}, ${summitPoint.y})`}>
                    <circle r="14" fill="#f59e0b" opacity="0.25" className="animate-ping" />
                    <circle r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 2" />
                  </g>
                </svg>

                {/* Badge Tetap: BASECAMP */}
                <div
                  style={{
                    left: `${(basecampPoint.x / 1000) * 100}%`,
                    top: `${(basecampPoint.y / 360) * 100}%`
                  }}
                  className="absolute -translate-x-1/3 -translate-y-10 px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-600 text-[10px] font-mono font-bold shadow-sm whitespace-nowrap pointer-events-none flex items-center gap-1"
                >
                  <FiHome className="text-emerald-400" />
                  <span>BASECAMP (700m)</span>
                </div>

                {/* Badge Interaktif: CAMP 1 s/d CAMP 5 (Selang-seling atas/bawah agar tidak tabrakan) */}
                {computedCamps.map((camp, idx) => {
                  const isSelected = activeCamp === idx;
                  const placeBelow = idx % 2 === 1; // Camp genap taruh sedikit di bawah titik agar rapi
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCamp(idx)}
                      style={{
                        left: `${(camp.x / 1000) * 100}%`,
                        top: `${(camp.y / 360) * 100}%`
                      }}
                      className={`absolute -translate-x-1/2 ${
                        placeBelow ? 'translate-y-4' : '-translate-y-11'
                      } px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all shadow-md whitespace-nowrap ${
                        isSelected
                          ? 'bg-primary text-white scale-110 z-30 ring-2 ring-white dark:ring-slate-900'
                          : 'bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-200 hover:scale-105 z-20 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      ⛺ Camp {idx + 1}: {camp.company}
                    </button>
                  );
                })}

                {/* Badge Tetap: SUMMIT (In Progress) */}
                <div
                  style={{
                    left: `${(summitPoint.x / 1000) * 100}%`,
                    top: `${(summitPoint.y / 360) * 100}%`
                  }}
                  className="absolute -translate-x-3/4 -translate-y-11 px-3 py-1 rounded-full bg-amber-500/20 dark:bg-amber-500/15 border border-amber-500 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-extrabold shadow-sm whitespace-nowrap pointer-events-none"
                >
                  🚩 SUMMIT ({i18n.language === 'id' ? 'Masih Progress' : 'In Progress'})
                </div>
              </div>

              {/* Panel Informasi Detail Camp Aktif */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCamp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                        {currentCamp.date} • {currentCamp.elevation}
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                        {currentCamp.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <FiMapPin /> {currentCamp.company} ({currentCamp.terrain})
                      </h4>
                    </div>

                    {/* Tombol Navigasi Camp 01 - Camp 05 */}
                    <div className="flex flex-wrap items-center gap-2">
                      {computedCamps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveCamp(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                            activeCamp === idx
                              ? 'bg-primary text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          Camp 0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    {currentCamp.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Grid Kartu Pos di Bawah Peta */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {computedCamps.map((camp, idx) => {
                const isSelected = activeCamp === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCamp(idx)}
                    className={`cursor-pointer p-5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-slate-800 border-primary ring-2 ring-primary/30 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono mb-2">
                      <span className="font-bold text-primary">CAMP 0{idx + 1}</span>
                      <span className="text-slate-500 dark:text-slate-400">{camp.elevation}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-0.5">
                      {camp.role}
                    </h4>
                    <p className="text-xs text-accent font-medium mb-2">{camp.company} • {camp.date}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {camp.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Fallback Mode: Classic Vertical Timeline */
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 rounded-full"></div>

            {computedCamps.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center w-full mb-12">
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-primary rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md z-10 -translate-x-1/2">
                    <FiBriefcase className="text-xl" />
                  </div>

                  <div
                    className={`w-full md:w-1/2 pl-24 md:pl-0 ${
                      isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="text-sm font-bold text-accent mb-2 inline-block">{exp.date}</span>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{exp.role}</h3>
                      <h4 className="text-md font-medium text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{exp.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;