import { TrendingUp, PieChart, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import './Investors.css';
import translations from '../i18n/translations';

const icons = [TrendingUp, PieChart, DollarSign, BarChart3];
const accents = ['#d4a843','#10b981','#00b4d8','#8b5cf6'];

export default function Investors({ lang }) {
  const t = translations[lang];
  return (
    <section id="investors" className="section investors-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.investors.label}</span>
          <h2 className="section-title">{t.investors.title}</h2>
          <p className="section-subtitle">{t.investors.subtitle}</p>
        </div>
        <div className="inv-grid">
          {t.investors.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="inv-card" style={{ borderTopColor: accents[i] }}>
                <div className="inv-card-icon" style={{ background: `${accents[i]}20`, color: accents[i] }}>
                  <Icon size={28} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="inv-cta">
          <div className="inv-cta-card">
            <h3>Become an Investor</h3>
            <p>Join Dorek's growth story with transparent governance and attractive returns.</p>
            <button className="btn btn-gold btn-lg">Invest Now <ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
