import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Navbar.css';

export default function Navbar({ lang, t, onLangChange, onPortalOpen }) {
  const { navigation } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navigation.map(n => {
        let targetId = (n.path || n.id).replace('#', '');
        if (targetId === 'hero') targetId = 'home';
        return {
          element: document.getElementById(targetId),
          targetId: targetId
        };
      }).filter(item => item.element);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].element.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].targetId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  const handleNavClick = (pathOrId) => {
    setMobileOpen(false);
    let targetId = pathOrId.replace('#', '');
    if (targetId === 'hero') targetId = 'home';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <img src="logo.png" alt="Dorek Logo" className="navbar-logo-img" />
        </div>
        <div className={`navbar-links ${mobileOpen ? 'navbar-links-open' : ''}`}>
          <button className="navbar-close-mobile" onClick={() => setMobileOpen(false)}><X size={24} /></button>
          {navigation.map(item => {
            let targetId = (item.path || item.id).replace('#', '');
            if (targetId === 'hero') targetId = 'home';
            return (
              <a key={item.id} className={`navbar-link ${activeSection === targetId ? 'navbar-link-active' : ''}`}
                onClick={() => handleNavClick(targetId)}>
                {t.nav[item.id] || item.label}
              </a>
            );
          })}
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
