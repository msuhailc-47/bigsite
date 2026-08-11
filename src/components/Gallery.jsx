import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Image, Play, Trophy, Calendar, X } from 'lucide-react';
import './Gallery.css';

export default function Gallery({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('gallery');
  const [tab, setTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const photos = t.gallery.photos;
  const videos = t.gallery.videos;
  const achievements = t.gallery.achievements;

  // Helper to get YouTube embed URL
  const getYouTubeEmbed = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <section id="gallery" className={`section gallery-sec ${animClass}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.gallery.label}</span>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </div>
        <div className="gal-tabs">
          {(t.gallery.tabs || []).map((tb, i) => (
            <button key={i} className={`career-tab ${tab === i ? 'career-tab-active' : ''}`} onClick={() => setTab(i)}>{tb}</button>
          ))}
        </div>
        <div className="gal-content">
          {tab === 0 && <div className="gal-photos-grid">
            {(photos || []).map((p, i) => {
              const photo = typeof p === 'string' ? { title: p, url: '' } : p;
              return (
                <div key={i} className="gal-photo-card" onClick={() => photo.url && setLightbox(photo)}>
                  {photo.url ? (
                    <img src={photo.url} alt={photo.title} className="gal-photo-img" loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="gal-photo-placeholder"><Image size={28} /></div>
                  )}
                  <span className="gal-photo-title">{photo.title}</span>
                  {photo.url && <div className="gal-photo-overlay"><span>{t.gallery.view}</span></div>}
                </div>
              );
            })}
          </div>}
          {tab === 1 && <div className="gal-videos-grid">
            {(videos || []).map((v, i) => {
              const video = typeof v === 'string' ? { title: v, url: '' } : v;
              const embedUrl = getYouTubeEmbed(video.url);
              return (
                <div key={i} className="gal-video-card">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="gal-video-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="gal-video-placeholder"><Play size={36} /></div>
                  )}
                  <span className="gal-video-title">{video.title}</span>
                </div>
              );
            })}
          </div>}
          {tab === 2 && <div className="gal-achievements">
            {(achievements || []).map((a, i) => (
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

      {/* Lightbox */}
      {lightbox && (
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <button className="gal-lightbox-close" onClick={() => setLightbox(null)}><X size={24} /></button>
          <img src={lightbox.url} alt={lightbox.title} className="gal-lightbox-img" referrerPolicy="no-referrer" />
          <p className="gal-lightbox-caption">{lightbox.title}</p>
        </div>
      )}
    </section>
  );
}
