import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Kita import icon dari react-icons buat gantiin gambar bendera jadul
import { HiOutlineTranslate } from 'react-icons/hi';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek buat ngecek scroll buat ngasih background glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
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

          {/* Tombol Ganti Bahasa (Desktop) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-slate-800 dark:text-slate-200 hover:text-accent transition-colors"
            title="Ganti Bahasa"
          >
            <HiOutlineTranslate className="text-xl" />
            <span className="font-semibold uppercase text-sm">{i18n.language}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="text-slate-800 dark:text-slate-200 hover:text-accent"
          >
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