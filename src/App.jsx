import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience/>
        <Contact />
      </main>

      {/* Footer Minimalis */}
      <footer className="py-6 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center transition-colors">
        <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center justify-center gap-2">
          {t('footer.text')} <FaHeart className="text-red-500 animate-pulse" /> {t('footer.by')}
          <a href="https://github.com/michaelisaiah02" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
            Michael Isaiah
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App;