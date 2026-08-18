import { ChevronDown, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { getOptimizedUrl } from '../utils/getOptimizedUrl';
import './Hero.css';

export default function Hero({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('hero');
    return (
    <section id="home" className={`hero ${animClass}`}>
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="hero-particle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`, animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>
      <div className="hero-glow" />
      <div className="hero-grid-bg" />
      {t.hero.image && <div className="hero-bg-image" style={{ backgroundImage: `url(${getOptimizedUrl(t.hero.image)})` }} />}
      <div className="hero-content">
        <div className="hero-badge">🏢 Dorek International Enterprises LLP</div>
        <h1 className="hero-title">
          <span className="hero-title-main">DOREK</span>
          <span className="hero-title-sub">INTERNATIONAL ENTERPRISES LLP</span>
        </h1>
        <p className="hero-tagline">{t.hero.tagline}</p>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary btn-lg">
            {t.hero.getStarted} <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn btn-secondary btn-lg">
            {t.hero.contactUs}
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-num">{t.hero.stats.counts?.divisions || '8+'}</span><span className="hero-stat-label">{t.hero.stats.divisions}</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">{t.hero.stats.counts?.districts || '14'}</span><span className="hero-stat-label">{t.hero.stats.districts}</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">{t.hero.stats.counts?.associates || '500+'}</span><span className="hero-stat-label">{t.hero.stats.associates}</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">{t.hero.stats.counts?.sectors || '10+'}</span><span className="hero-stat-label">{t.hero.stats.sectors}</span></div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
