import { useState } from 'react';
import { ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Businesses.css';

const icons = [ShoppingCart, Store, Network, Truck, Wrench, Settings, GraduationCap, Code];
const gradients = [
  'linear-gradient(135deg, #00b4d8, #0077b6)', 'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)', 'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ef4444, #dc2626)', 'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #d4a843, #b8860b)', 'linear-gradient(135deg, #3b82f6, #2563eb)'
];

export default function Businesses({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('businesses');
  const [activePopup, setActivePopup] = useState(null);

  return (
    <section id="businesses" className={`section businesses ${animClass}`}>
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
                <button className="biz-learn-more" onClick={() => setActivePopup(i)}>
                  {t.businesses.learnMore} →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learn More Popup Modal */}
      {activePopup !== null && t.businesses.items[activePopup] && (
        <div className="biz-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="biz-popup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="biz-popup-close" onClick={() => setActivePopup(null)}>
              <X size={22} />
            </button>
            <div className="biz-popup-header">
              <div className="biz-popup-icon" style={{ background: gradients[activePopup] }}>
                {(() => { const Icon = icons[activePopup]; return <Icon size={32} color="white" />; })()}
              </div>
              <div>
                <span className="badge">{t.businesses.items[activePopup].tag}</span>
                <h3 className="biz-popup-title">{t.businesses.items[activePopup].name}</h3>
              </div>
            </div>
            <div className="biz-popup-body">
              <p className="biz-popup-desc">{t.businesses.items[activePopup].desc}</p>
              <div className="biz-popup-details">
                {t.businesses.items[activePopup].details || 'No additional details available. Add details from the Admin Panel.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
