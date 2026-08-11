import { Users, Store, Building2, TrendingUp, Briefcase, Handshake, Package, Truck, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Opportunities.css';

const iconMap = { Users, Store, Building2, TrendingUp, Briefcase, Handshake, Package, Truck };
const accents = ['#00b4d8','#d4a843','#10b981','#8b5cf6','#f59e0b','#ef4444','#06b6d4','#3b82f6'];

export default function Opportunities({ lang, t, onApplyOpen }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('opportunities');
    return (
    <section id="opportunities" className={`section opp ${animClass}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.opportunities.label}</span>
          <h2 className="section-title">{t.opportunities.title}</h2>
          <p className="section-subtitle">{t.opportunities.subtitle}</p>
        </div>
        <div className="opp-grid">
          {t.opportunities.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Users;
            return (
              <div key={i} className="opp-card" style={{ borderTopColor: accents[i] }}>
                <div className="opp-card-icon" style={{ background: `${accents[i]}20`, color: accents[i] }}>
                  <Icon size={28} />
                </div>
                <h3 className="opp-card-name">{item.name}</h3>
                <p className="opp-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="opp-cta">
          <button className="btn btn-gold btn-lg" onClick={onApplyOpen}>
            {t.opportunities.applyNow} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
