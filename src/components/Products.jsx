import { useState } from 'react';
import { Zap, Droplets, Wrench, Waves, Lightbulb, Sun, Battery, GlassWater, Shield, HardHat, ChevronRight } from 'lucide-react';
import './Products.css';
import translations from '../i18n/translations';

const iconMap = { Zap, Droplets, Wrench, Waves, Lightbulb, Sun, Battery, GlassWater, Shield, HardHat };
const catColors = ['#00b4d8','#06b6d4','#f59e0b','#3b82f6','#f97316','#eab308','#10b981','#0ea5e9','#8b5cf6','#ef4444'];

export default function Products({ lang }) {
  const t = translations[lang];
  const [active, setActive] = useState(0);
  const categories = t.products.categories;

  return (
    <section id="services" className="section products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.products.label}</span>
          <h2 className="section-title">{t.products.title}</h2>
          <p className="section-subtitle">{t.products.subtitle}</p>
        </div>
        <div className="prod-layout">
          <div className="prod-tabs">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Zap;
              return (
                <button key={i} className={`prod-tab ${active === i ? 'prod-tab-active' : ''}`}
                  onClick={() => setActive(i)} style={active === i ? { borderLeftColor: catColors[i] } : {}}>
                  <Icon size={18} style={active === i ? { color: catColors[i] } : {}} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
          <div className="prod-content">
            <div className="prod-content-header">
              {(() => { const Icon = iconMap[categories[active].icon] || Zap; return <Icon size={32} style={{ color: catColors[active] }} />; })()}
              <h3>{categories[active].name}</h3>
            </div>
            <div className="prod-items-grid">
              {categories[active].items.map((item, i) => (
                <div key={i} className="prod-item">
                  <ChevronRight size={14} style={{ color: catColors[active], flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 28 }}>
              Inquire Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
