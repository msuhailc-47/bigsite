import { FileText, Download } from 'lucide-react';
import './Downloads.css';
import translations from '../i18n/translations';

export default function Downloads({ lang }) {
  const t = translations[lang];
  return (
    <section id="downloads" className="section downloads-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.downloads.label}</span>
          <h2 className="section-title">{t.downloads.title}</h2>
          <p className="section-subtitle">{t.downloads.subtitle}</p>
        </div>
        <div className="dl-grid">
          {t.downloads.items.map((item, i) => (
            <div key={i} className="dl-card">
              <div className="dl-icon"><FileText size={32} /></div>
              <h4 className="dl-name">{item.name}</h4>
              <div className="dl-meta">
                <span className="badge badge-gold">{item.type}</span>
                <span className="dl-size">{item.size}</span>
              </div>
              <button className="dl-btn">
                <Download size={16} /> {t.downloads.download}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
