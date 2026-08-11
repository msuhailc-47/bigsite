import { FileText, Download } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './Downloads.css';

export default function Downloads({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('downloads');
    return (
    <section id="downloads" className={`section downloads-sec ${animClass}`}>
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
              <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="dl-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Download size={16} /> {t.downloads.download}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
