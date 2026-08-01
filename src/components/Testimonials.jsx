import { useState } from 'react';
import { Quote, Star, User } from 'lucide-react';
import './Testimonials.css';
import translations from '../i18n/translations';

export default function Testimonials({ lang }) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState(t.testimonials.tabs[0]);

  const filteredItems = t.testimonials.items.filter(item => item.category === activeTab);

  return (
    <section id="testimonials" className="section testimonials-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.testimonials.label}</span>
          <h2 className="section-title">{t.testimonials.title}</h2>
          <p className="section-subtitle">{t.testimonials.subtitle}</p>
        </div>
        <div className="career-tabs" style={{ marginBottom: '48px' }}>
          {t.testimonials.tabs.map((tab, i) => (
            <button key={i} className={`career-tab ${activeTab === tab ? 'career-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div className="test-grid">
          {filteredItems.map((item, i) => (
            <div key={i} className="test-card">
              <Quote size={40} className="test-quote" />
              <p className="test-text">{item.text}</p>
              <div className="test-author">
                <div className="test-avatar">{item.name.charAt(0)}</div>
                <div className="test-author-info">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
                <div className="test-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
