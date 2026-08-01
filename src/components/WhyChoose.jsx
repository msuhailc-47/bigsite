import { CheckCircle2 } from 'lucide-react';
import './WhyChoose.css';
import translations from '../i18n/translations';

export default function WhyChoose({ lang }) {
  const t = translations[lang];
  return (
    <section id="why-choose" className="section why-choose">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.whyChoose.label}</span>
          <h2 className="section-title">{t.whyChoose.title}</h2>
        </div>
        <div className="why-grid">
          <div className="why-visual">
            <div className="why-visual-circle why-vc-1" />
            <div className="why-visual-circle why-vc-2" />
            <div className="why-visual-circle why-vc-3" />
            <div className="why-visual-center">
              <span className="why-visual-logo">DOREK</span>
              <span className="why-visual-sub">Excellence in Every Solution</span>
            </div>
          </div>
          <div className="why-list">
            {t.whyChoose.items.map((item, i) => (
              <div key={i} className="why-item">
                <div className="why-item-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="why-item-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <CheckCircle2 size={20} className="why-check" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
