import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineTranslate } from 'react-icons/hi';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // State buat tema

  // Efek buat ngecek OS theme pas pertama kali load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Efek buat glassmorphism scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi ganti bahasa
  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  // Fungsi ganti tema
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: t('navbar.home'), href: '#home' },
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.experience'), href: '#experience' },
    { name: t('navbar.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo/Nama */}
        <a href="#home" className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors">
          MI.
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4 border-l border-slate-300 dark:border-slate-700 pl-4">
            {/* Tombol Tema */}
            <button
              onClick={toggleTheme}
              className="text-slate-800 dark:text-slate-200 hover:text-accent transition-colors text-xl"
              title="Ganti Tema"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>

            {/* Tombol Bahasa */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-slate-800 dark:text-slate-200 hover:text-accent transition-colors"
              title="Ganti Bahasa"
            >
              <HiOutlineTranslate className="text-xl" />
              <span className="font-semibold uppercase text-sm">{i18n.language}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-slate-800 dark:text-slate-200 text-xl">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          <button onClick={toggleLanguage} className="text-slate-800 dark:text-slate-200">
            <span className="font-semibold uppercase text-sm">{i18n.language}</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-slate-800 dark:text-slate-200"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-light dark:bg-bg-dark shadow-lg py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 hover:text-primary transition-colors font-medium block"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;