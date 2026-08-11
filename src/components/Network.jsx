import { useState, useEffect, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Building, Store, Users, ChevronRight, X, TrendingUp } from 'lucide-react';
import './Network.css';
import { mapData } from './keralaMapData';

import defaultTranslations from '../i18n/translations';

// Stats are now loaded dynamically from translations

function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);
  
  // ensure end is a number, if not, treat it as 0
  const endNum = typeof end === 'number' && !isNaN(end) ? end : 0;

  useEffect(() => {
    // Reset animation if end value updates from 0 to a real value
    if (endNum > 0) {
      animated.current = false;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current && endNum > 0) {
        animated.current = true;
        let start = 0;
        const duration = 1800;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setCount(Math.floor(eased * endNum));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endNum]);

  if (endNum === 0) return <span ref={ref}>0{suffix}</span>;
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Network({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('network');
  const [selected, setSelected] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fullDistricts = mapData.map(d => {
    let cmsDistrict = (t.network.districts || []).find(cd => cd.name === d.name);
    if (!cmsDistrict) {
      cmsDistrict = (defaultTranslations.en.network.districts || []).find(cd => cd.name === d.name) || {};
    }
    return { ...d, hubs: 0, outlets: 0, associates: 0, coverage: 0, ...cmsDistrict };
  });

  const parseCount = (val) => {
    if (val === undefined || val === null || val === '') return null;
    const parsed = parseInt(val);
    return isNaN(parsed) ? null : parsed;
  };

  const defaultDistricts = defaultTranslations.en.network.districts || [];
  
  const totalDistricts = parseCount(t.network.stats?.counts?.districts) ?? fullDistricts.length;
  const totalHubs = parseCount(t.network.stats?.counts?.hubs) ?? fullDistricts.reduce((sum, d) => sum + (parseInt(d.hubs) || 0), 0);
  const totalOutlets = parseCount(t.network.stats?.counts?.outlets) ?? fullDistricts.reduce((sum, d) => sum + (parseInt(d.outlets) || 0), 0);
  const totalAssociates = parseCount(t.network.stats?.counts?.associates) ?? fullDistricts.reduce((sum, d) => sum + (parseInt(d.associates) || 0), 0);

  const handleDistrictClick = (index) => {
    setSelected(prev => prev === index ? null : index);
  };

  const selectedDistrict = selected !== null ? fullDistricts[selected] : null;
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selected;

  return (
    <section id="network" className={`section network ${animClass}`}>
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
              <AnimatedCounter end={totalDistricts} />
            </span>
            <span className="net-stat-label">{t.network.stats.districts}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={totalHubs} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.hubs}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={totalOutlets} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.outlets}</span>
          </div>
          <div className="net-stat-divider" />
          <div className="net-stat">
            <span className="net-stat-num">
              <AnimatedCounter end={totalAssociates} suffix="+" />
            </span>
            <span className="net-stat-label">{t.network.stats.associates}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
