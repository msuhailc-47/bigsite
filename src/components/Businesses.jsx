import { ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code } from 'lucide-react';
import './Businesses.css';
import translations from '../i18n/translations';

const icons = [ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code];
const gradients = [
  'linear-gradient(135deg, #00b4d8, #0077b6)', 'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)', 'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ef4444, #dc2626)', 'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #d4a843, #b8860b)', 'linear-gradient(135deg, #3b82f6, #2563eb)'
];

export default function Businesses({ lang }) {
  const t = translations[lang];
  return (
    <section id="businesses" className="section businesses">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.businesses.label}</span>
          <h2 className="section-title">{t.businesses.title}</h2>
          <p className="section-subtitle">{t.businesses.subtitle}</p>
        </div>
        <div className="biz-grid">
          {t.businesses.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="biz-card">
                <div className="biz-card-icon" style={{ background: gradients[i] }}>
                  <Icon size={28} color="white" />
                </div>
                <span className="badge">{item.tag}</span>
                <h3 className="biz-card-name">{item.name}</h3>
                <p className="biz-card-desc">{item.desc}</p>
                <button className="biz-learn-more">{t.businesses.learnMore} →</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
