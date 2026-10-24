import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPhp, FaLaravel, FaReact, FaUnity, FaDocker } from 'react-icons/fa';
import { SiMysql, SiTailwindcss } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { FiCpu, FiGrid, FiShare2, FiZap, FiCompass, FiLayers } from 'react-icons/fi';

const initialNodes = [
  { id: 'php', name: 'PHP', layer: 'Root / Backend', x: 20, y: 20, icon: <FaPhp className="text-2xl text-[#777BB4]" /> },
  { id: 'laravel', name: 'Laravel', layer: 'Root / Backend', x: 14, y: 50, icon: <FaLaravel className="text-2xl text-[#FF2D20]" /> },
  { id: 'mysql', name: 'MySQL', layer: 'Root / Database', x: 22, y: 80, icon: <SiMysql className="text-2xl text-[#4479A1]" /> },
  { id: 'docker', name: 'Docker & Server', layer: 'Infra / Hardware', x: 50, y: 16, icon: <FaDocker className="text-2xl text-[#2496ED]" /> },
  { id: 'react', name: 'React / Next', layer: 'Surface / Frontend', x: 80, y: 22, icon: <FaReact className="text-2xl text-[#61DAFB]" /> },
  { id: 'tailwind', name: 'Tailwind CSS', layer: 'Surface / Styling', x: 86, y: 52, icon: <SiTailwindcss className="text-2xl text-[#06B6D4]" /> },
  { id: 'csharp', name: 'C# Logic', layer: 'Horizon / GameDev', x: 78, y: 82, icon: <TbBrandCSharp className="text-2xl text-[#239120]" /> },
  { id: 'unity', name: 'Unity Engine', layer: 'Horizon / GameDev', x: 50, y: 84, icon: <FaUnity className="text-2xl text-slate-800 dark:text-slate-100" /> },
];

const synergyDictionary = {
  'csharp+unity': {
    id: 'Purwarupa Game 2D/3D Interaktif, Sistem Mekanik Kartu Digital & Simulasi Fisika.',
    en: 'Interactive 2D/3D Game Prototypes, Digital Card Mechanics & Physics Simulations.'
  },
  'laravel+mysql': {
    id: 'Arsitektur Backend Enterprise, Optimasi Query Kompleks & Sistem Pelaporan Regional.',
    en: 'Enterprise Backend Architecture, Complex Query Optimization & Regional Reporting Systems.'
  },
  'laravel+react': {
    id: 'Aplikasi Web Full-Stack Modern, RESTful API Terintegrasi & Dashboard Real-Time.',
    en: 'Modern Full-Stack Web Applications, Integrated RESTful APIs & Real-Time Dashboards.'
  },
  'docker+laravel': {
    id: 'Infrastruktur Notifikasi Mandiri (WAHA API) & Deployment Kontainer Terisolasi.',
    en: 'Self-Hosted Notification Infrastructure (WAHA API) & Isolated Container Deployments.'
  },
  'react+tailwind': {
    id: 'Antarmuka SPA Responsif Berkecepatan Tinggi dengan Animasi & Dark Mode Adaptif.',
    en: 'High-Speed Responsive SPA Interfaces with Fluid Animations & Adaptive Dark Mode.'
  },
  'php+mysql': {
    id: 'Restrukturisasi Sistem Legacy, Otomatisasi Dokumen PDF & Pemrosesan Data Skala Besar.',
    en: 'Legacy System Restructuring, Automated PDF Document Stamping & Large-Scale Data Processing.'
  }
};

const About = () => {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState('blueprint');
  const [nodes, setNodes] = useState(initialNodes);
  const [draggingId, setDraggingId] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState(['laravel', 'react']);
  const canvasRef = useRef(null);
  const dragMovedRef = useRef(false);

  const corePos = { x: 50, y: 50 };

  const handlePointerDown = (e, id) => {
    e.stopPropagation();
    setDraggingId(id);
    dragMovedRef.current = false;
  };

  const handlePointerMove = (e) => {
    if (!draggingId || !canvasRef.current) return;
    dragMovedRef.current = true;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
    const newY = Math.max(12, Math.min(88, ((e.clientY - rect.top) / rect.height) * 100));

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingId ? { ...n, x: newX, y: newY } : n))
    );
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  const handleNodeClick = (id) => {
    if (dragMovedRef.current) return;
    setSelectedNodes((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const getSynergyOutput = () => {
    if (selectedNodes.length < 2) return null;
    const sortedKey = [...selectedNodes].sort().join('+');
    const lang = i18n.language === 'id' ? 'id' : 'en';
    const match = synergyDictionary[sortedKey];
    if (match) return match[lang];

    const n1 = nodes.find((n) => n.id === selectedNodes[0])?.name;
    const n2 = nodes.find((n) => n.id === selectedNodes[1])?.name;
    return lang === 'id'
      ? `Integrasi Lintas-Domain: Menggabungkan kapabilitas ${n1} dan ${n2} untuk membangun solusi sistem yang adaptif dan skalabel.`
      : `Cross-Domain Integration: Combining ${n1} and ${n2} capabilities to engineer adaptive, scalable system solutions.`;
  };

  const nodeA = nodes.find((n) => n.id === selectedNodes[0]);
  const nodeB = nodes.find((n) => n.id === selectedNodes[1]);

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Kolom Kiri: Cerita */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-4">
              {t('about.title')}
              <span className="h-1 flex-1 bg-primary rounded-full"></span>
            </h2>
            <div className="text-lg text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 flex items-start gap-3 transition-colors">
                <FiLayers className="text-primary text-2xl shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Full-System Root</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Software, Database & Hardware Diagnostics</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 flex items-start gap-3 transition-colors">
                <FiCompass className="text-accent text-2xl shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">195 Nations Goal</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mountains, Oceans & Financial Freedom</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Node Blueprint Adaptif Light/Dark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-7/12 w-full"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FiShare2 className="text-primary" />
                {t('about.skills_title')}
              </h3>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setViewMode('blueprint')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === 'blueprint'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                  }`}
                >
                  <FiShare2 /> {t('about.mode_blueprint')}
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                  }`}
                >
                  <FiGrid /> {t('about.mode_grid')}
                </button>
              </div>
            </div>

            {viewMode === 'blueprint' ? (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-xl dark:shadow-2xl overflow-hidden transition-colors">
                {/* Kanvas Blueprint */}
                <div
                  ref={canvasRef}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="relative h-[400px] w-full select-none touch-none overflow-hidden"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.22) 1px, transparent 1px)',
                    backgroundSize: '22px 22px'
                  }}
                >
                  {/* Hint Bar Atas */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
                      {t('about.hint')}
                    </span>
                  </div>

                  {/* Layer SVG Kabel Bezier */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {nodes.map((node) => {
                      const isSelected = selectedNodes.includes(node.id);
                      const midX = (corePos.x + node.x) / 2;
                      const pathData = `M ${corePos.x} ${corePos.y} C ${midX} ${corePos.y}, ${midX} ${node.y}, ${node.x} ${node.y}`;
                      return (
                        <g key={node.id}>
                          <path
                            d={pathData}
                            fill="none"
                            stroke={isSelected ? '#10b981' : '#94a3b8'}
                            strokeOpacity={isSelected ? '1' : '0.45'}
                            strokeWidth={isSelected ? '0.85' : '0.45'}
                            strokeDasharray={isSelected ? 'none' : '1.5 1.5'}
                          />
                        </g>
                      );
                    })}

                    {nodeA && nodeB && (
                      <path
                        d={`M ${nodeA.x} ${nodeA.y} Q 50 50 ${nodeB.x} ${nodeB.y}`}
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="0.9"
                        strokeDasharray="2 1"
                      />
                    )}
                  </svg>

                  {/* Node Pusat: CORE MICHAEL */}
                  <div
                    style={{ left: `${corePos.x}%`, top: `${corePos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-emerald-500/20 border-2 border-emerald-500 dark:border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.35)] backdrop-blur-md">
                      <FiCpu className="text-emerald-600 dark:text-emerald-400 text-xl animate-pulse" />
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-800 dark:text-white mt-1">
                        CORE: MI
                      </span>
                    </div>
                  </div>

                  {/* Node-Node Teknologi */}
                  {nodes.map((node) => {
                    const isSelected = selectedNodes.includes(node.id);
                    return (
                      <div
                        key={node.id}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onPointerDown={(e) => handlePointerDown(e, node.id)}
                        onClick={() => handleNodeClick(node.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing transition-all ${
                          isSelected
                            ? 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                            : 'hover:ring-1 hover:ring-sky-400 shadow-md'
                        } bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl flex items-center gap-2.5 backdrop-blur-md`}
                      >
                        <div className="shrink-0">{node.icon}</div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-slate-800 dark:text-white whitespace-nowrap">{node.name}</div>
                          <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{node.layer}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Panel Bawah: Synergy Reactor HUD */}
                <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FiZap className="text-sky-500 dark:text-sky-400 text-lg shrink-0 animate-bounce" />
                    <div className="text-xs">
                      {selectedNodes.length === 2 ? (
                        <div>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mr-2">
                            [{t('about.synergy_active')}: {nodeA?.name} ⚡ {nodeB?.name}]
                          </span>
                          <span className="text-slate-700 dark:text-slate-300">{getSynergyOutput()}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400 font-mono">{t('about.synergy_default')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {nodes.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    {skill.icon}
                    <span className="mt-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">{skill.layer}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;