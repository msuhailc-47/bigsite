import { useState } from 'react';
import { Image, Play, Trophy, Calendar } from 'lucide-react';
import './Gallery.css';
import translations from '../i18n/translations';

export default function Gallery({ lang }) {
  const t = translations[lang];
  const [tab, setTab] = useState(0);
  const photos = t.gallery.photos;
  const videos = t.gallery.videos;
  const achievements = t.gallery.achievements;
  return (
    <section id="gallery" className="section gallery-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.gallery.label}</span>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </div>
        <div className="gal-tabs">
          {t.gallery.tabs.map((tb, i) => (
            <button key={i} className={`career-tab ${tab === i ? 'career-tab-active' : ''}`} onClick={() => setTab(i)}>{tb}</button>
          ))}
        </div>
        <div className="gal-content">
          {tab === 0 && <div className="gal-photos-grid">
            {photos.map((p, i) => (
              <div key={i} className="gal-photo-card">
                <Image size={28} />
                <span>{p}</span>
                <div className="gal-photo-overlay"><span>{t.gallery.view}</span></div>
              </div>
            ))}
          </div>}
          {tab === 1 && <div className="gal-videos-grid">
            {videos.map((v, i) => (
              <div key={i} className="gal-video-card">
                <Play size={36} />
                <span>{v}</span>
              </div>
            ))}
          </div>}
          {tab === 2 && <div className="gal-achievements">
            {achievements.map((a, i) => (
              <div key={i} className="gal-ach-item">
                <div className="gal-ach-year"><Calendar size={14} /> {a.year}</div>
                <div className="gal-ach-content">
                  <Trophy size={18} className="gal-ach-icon" />
                  <div><h4>{a.title}</h4><p>{a.desc}</p></div>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </section>
  );
}
