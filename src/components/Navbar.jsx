import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn } from 'lucide-react';
import './Navbar.css';
import translations from '../i18n/translations';

export default function Navbar({ lang, onLangChange, onPortalOpen }) {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { key: 'home', id: 'home' }, { key: 'about', id: 'about' },
    { key: 'businesses', id: 'businesses' }, { key: 'services', id: 'services' },
    { key: 'opportunities', id: 'opportunities' }, { key: 'software', id: 'software' },
    { key: 'investors', id: 'investors' }, { key: 'careers', id: 'careers' },
    { key: 'news', id: 'news' }, { key: 'gallery', id: 'gallery' },
    { key: 'downloads', id: 'downloads' }, { key: 'contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 120) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <span className="navbar-logo-text">DOREK</span>
          <span className="navbar-logo-sub">INTERNATIONAL ENTERPRISES LLP</span>
        </div>
        <div className={`navbar-links ${mobileOpen ? 'navbar-links-open' : ''}`}>
          <button className="navbar-close-mobile" onClick={() => setMobileOpen(false)}><X size={24} /></button>
          {navItems.map(item => (
            <a key={item.key} className={`navbar-link ${activeSection === item.id ? 'navbar-link-active' : ''}`}
              onClick={() => handleNavClick(item.id)}>{t.nav[item.key]}</a>
          ))}
          <div className="navbar-mobile-actions">
            <button className="navbar-lang-btn" onClick={onLangChange}>
              <Globe size={16} />{lang === 'en' ? 'മല' : 'EN'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => { setMobileOpen(false); onPortalOpen(); }}>
              <LogIn size={16} />{t.hero.portalLogin}
            </button>
          </div>
        </div>
        <div className="navbar-actions">
          <button className="navbar-lang-btn" onClick={onLangChange}>
            <Globe size={16} />{lang === 'en' ? 'മല' : 'EN'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={onPortalOpen}>
            <LogIn size={16} />{t.hero.portalLogin}
          </button>
        </div>
        <button className="navbar-hamburger" onClick={() => setMobileOpen(true)}><Menu size={24} /></button>
      </div>
      {mobileOpen && <div className="navbar-overlay" onClick={() => setMobileOpen(false)} />}
    </nav>
  );
}
