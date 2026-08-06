import { useState, useEffect, useRef } from 'react';
import { MapPin, Building, Store, Users, ChevronRight, X, TrendingUp } from 'lucide-react';
import './Network.css';
import translations from '../i18n/translations';
import { mapData } from './keralaMapData';

const districtStats = {
  'Thiruvananthapuram': { hubs: 5, outlets: 18, associates: 42, coverage: 85 },
  'Kollam': { hubs: 4, outlets: 15, associates: 38, coverage: 78 },
  'Pathanamthitta': { hubs: 3, outlets: 10, associates: 28, coverage: 65 },
  'Alappuzha': { hubs: 4, outlets: 14, associates: 35, coverage: 72 },
  'Kottayam': { hubs: 4, outlets: 16, associates: 40, coverage: 80 },
  'Idukki': { hubs: 2, outlets: 8, associates: 20, coverage: 45 },
  'Ernakulam': { hubs: 6, outlets: 22, associates: 55, coverage: 92 },
  'Thrissur': { hubs: 5, outlets: 20, associates: 48, coverage: 88 },
  'Palakkad': { hubs: 4, outlets: 15, associates: 35, coverage: 70 },
  'Malappuram': { hubs: 5, outlets: 18, associates: 45, coverage: 82 },
  'Kozhikode': { hubs: 5, outlets: 20, associates: 50, coverage: 90 },
  'Wayanad': { hubs: 2, outlets: 8, associates: 18, coverage: 40 },
  'Kannur': { hubs: 4, outlets: 16, associates: 38, coverage: 75 },
  'Kasaragod': { hubs: 3, outlets: 10, associates: 25, coverage: 58 },
};

const fullDistricts = mapData.map(d => ({
  ...d,
  ...districtStats[d.name]
}));

function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let start = 0;
        const duration = 1800;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Network({ lang }) {
  const t = translations[lang];
  const [selected, setSelected] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDistrictClick = (index) => {
    setSelected(prev => prev === index ? null : index);
  };

  const selectedDistrict = selected !== null ? fullDistricts[selected] : null;
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selected;

  return (
    <section id="network" className="section network">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.network.label}</span>
          <h2 className="section-title">{t.network.title}</h2>
          <p className="section-subtitle">{t.network.subtitle}</p>
        </div>

        <div className="net-content">
          {/* District List Sidebar */}
          <div className="net-district-list">
            <h3 className="net-district-list-title">
              <MapPin size={16} /> Districts
            </h3>
            <div className="net-district-items">
              {fullDistricts.map((d, i) => (
                <button
                  key={d.name}
                  className={`net-district-item ${selected === i ? 'active' : ''}`}
                  onClick={() => handleDistrictClick(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="net-district-item-name">{d.name}</span>
                  <span className="net-district-item-count">{d.outlets} outlets</span>
                  <ChevronRight size={14} className="net-district-item-arrow" />
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="net-map-wrapper">
            <div className="net-map-container">
              <div className="net-map-glow" />
              <svg viewBox="0 0 200 300" className="net-kerala-svg">
                {fullDistricts.map((d, i) => (
                  <path
                    key={`path-${i}`}
                    d={d.path}
                    className={`net-district-path ${activeIndex === i ? 'active' : ''} ${selected === i ? 'selected' : ''}`}
                    onClick={() => handleDistrictClick(i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </svg>
              {/* Pins */}
              {fullDistricts.map((d, i) => (
                <div
                  key={`pin-${i}`}
                  className={`net-pin ${activeIndex === i ? 'net-pin-active' : ''}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  onClick={() => handleDistrictClick(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <MapPin size={14} />
                  {hoveredIndex === i && selected !== i && (
                    <div className="net-hover-label">{d.name}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className={`net-info-panel ${selected !== null ? 'open' : ''}`}>
            {selectedDistrict ? (
              <>
                <div className="net-info-header">
                  <h3 className="net-info-title">{selectedDistrict.name}</h3>
                  <button className="net-info-close" onClick={() => setSelected(null)}>
                    <X size={16} />
                  </button>
                </div>

                <div className="net-info-stats">
                  <div className="net-info-stat">
                    <div className="net-info-stat-icon hubs"><Building size={18} /></div>
                    <div className="net-info-stat-data">
                      <span className="net-info-stat-num">{selectedDistrict.hubs}</span>
                      <span className="net-info-stat-label">{t.network.stats.hubs}</span>
                    </div>
                  </div>
                  <div className="net-info-stat">
                    <div className="net-info-stat-icon outlets"><Store size={18} /></div>
                    <div className="net-info-stat-data">
                      <span className="net-info-stat-num">{selectedDistrict.outlets}</span>
                      <span className="net-info-stat-label">{t.network.stats.outlets}</span>
                    </div>
                  </div>
                  <div className="net-info-stat">
                    <div className="net-info-stat-icon associates"><Users size={18} /></div>
                    <div className="net-info-stat-data">
                      <span className="net-info-stat-num">{selectedDistrict.associates}</span>
                      <span className="net-info-stat-label">{t.network.stats.associates}</span>
                    </div>
                  </div>
                </div>

                {/* Coverage Bar */}
                <div className="net-info-coverage">
                  <div className="net-info-coverage-header">
                    <span className="net-info-coverage-label"><TrendingUp size={14} /> Coverage Level</span>
                    <span className="net-info-coverage-pct">{selectedDistrict.coverage}%</span>
                  </div>
                  <div className="net-info-coverage-bar">
                    <div
                      className="net-info-coverage-fill"
                      style={{ width: `${selectedDistrict.coverage}%` }}
                    />
                  </div>
                </div>

                <a href="#contact" className="btn btn-primary btn-sm net-info-cta">
                  Contact This Region <ChevronRight size={14} />
                </a>
              </>
            ) : (
              <div className="net-info-empty">
                <MapPin size={32} />
                <p>Click on a district to see details</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="net-stats-bar">
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={14} />
            </span>
            <span className="net-stat-label">{t.network.stats.districts}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={56} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.hubs}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={210} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.outlets}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={537} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.associates}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
