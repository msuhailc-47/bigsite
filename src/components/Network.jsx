import { useState, useEffect, useRef } from 'react';
import { MapPin, Building, Store, Users } from 'lucide-react';
import './Network.css';
import translations from '../i18n/translations';
import { mapData } from './keralaMapData';

const districtStats = {
  'Thiruvananthapuram': { hubs: 5, outlets: 18, associates: 42 },
  'Kollam': { hubs: 4, outlets: 15, associates: 38 },
  'Pathanamthitta': { hubs: 3, outlets: 10, associates: 28 },
  'Alappuzha': { hubs: 4, outlets: 14, associates: 35 },
  'Kottayam': { hubs: 4, outlets: 16, associates: 40 },
  'Idukki': { hubs: 2, outlets: 8, associates: 20 },
  'Ernakulam': { hubs: 6, outlets: 22, associates: 55 },
  'Thrissur': { hubs: 5, outlets: 20, associates: 48 },
  'Palakkad': { hubs: 4, outlets: 15, associates: 35 },
  'Malappuram': { hubs: 5, outlets: 18, associates: 45 },
  'Kozhikode': { hubs: 5, outlets: 20, associates: 50 },
  'Wayanad': { hubs: 2, outlets: 8, associates: 18 },
  'Kannur': { hubs: 4, outlets: 16, associates: 38 },
  'Kasaragod': { hubs: 3, outlets: 10, associates: 25 },
};

const fullDistricts = mapData.map(d => ({
  ...d,
  ...districtStats[d.name]
}));

function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <div ref={ref} className="net-stat"><span className="net-stat-num">{count}{end > 14 ? '+' : ''}</span><span className="net-stat-label">{label}</span></div>;
}

export default function Network({ lang }) {
  const t = translations[lang];
  const [selected, setSelected] = useState(null);

  return (
    <section id="network" className="section network">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.network.label}</span>
          <h2 className="section-title">{t.network.title}</h2>
          <p className="section-subtitle">{t.network.subtitle}</p>
        </div>
        <div className="net-layout">
          <div className="net-map-container">
            <div className="net-map">
              <svg viewBox="0 0 200 300" className="net-kerala-outline">
                {fullDistricts.map((d, i) => (
                  <path 
                    key={`path-${i}`} 
                    d={d.path} 
                    fill={selected === i ? "rgba(0,180,216,0.3)" : "rgba(0,180,216,0.05)"} 
                    stroke="rgba(0,180,216,0.5)" 
                    strokeWidth="0.5" 
                    onMouseEnter={() => setSelected(i)} 
                    onMouseLeave={() => setSelected(null)}
                    style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
                  />
                ))}
              </svg>
              {fullDistricts.map((d, i) => (
                <div key={`pin-${i}`} className={`net-pin ${selected === i ? 'net-pin-active' : ''}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  onMouseEnter={() => setSelected(i)} onMouseLeave={() => setSelected(null)}>
                  <MapPin size={16} />
                  {selected === i && (
                    <div className="net-tooltip">
                      <strong>{d.name}</strong>
                      <div className="net-tooltip-stats">
                        <span><Building size={12} /> {d.hubs} {t.network.stats.hubs}</span>
                        <span><Store size={12} /> {d.outlets} {t.network.stats.outlets}</span>
                        <span><Users size={12} /> {d.associates} {t.network.stats.associates}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="net-stats-bar">
            <Counter end={14} label={t.network.stats.districts} />
            <Counter end={56} label={t.network.stats.hubs} />
            <Counter end={210} label={t.network.stats.outlets} />
            <Counter end={537} label={t.network.stats.associates} />
          </div>
        </div>
      </div>
    </section>
  );
}
