import { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { getOptimizedUrl } from '../utils/getOptimizedUrl';
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
                    <img src={getOptimizedUrl(photo.url)} alt={photo.title} className="gal-photo-img" loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="gal-photo-placeholder"><Image size={28} /></div>
                  )}
                  {photo.title && <div className="gal-photo-caption">{photo.title}</div>}
                </div>
              );
            })}
          </div>}
          {tab === 1 && (
            <div className="gal-video-grid animate-fadeIn">
              {(videos || []).map((vid, i) => {
                const embedUrl = getYouTubeEmbed(vid.url);
                return (
                  <div key={i} className="gal-video-card">
                    {embedUrl ? (
                      <iframe src={embedUrl} title={vid.title} className="gal-video-frame" allowFullScreen />
                    ) : (
                      <div className="gal-video-placeholder"><Play size={28} /></div>
                    )}
                    {vid.title && <div className="gal-video-caption">{vid.title}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {tab === 2 && (
            <div className="gal-ach-grid animate-fadeIn">
              {(achievements || []).map((ach, i) => (
                <div key={i} className="gal-ach-card">
                  <div className="gal-ach-icon"><Trophy size={24} /></div>
                  <div className="gal-ach-content">
                    <h4>{ach.title}</h4>
                    <p>{ach.description}</p>
                    <span className="gal-ach-year"><Calendar size={14} /> {ach.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightbox && (
          <div className="gal-lightbox" onClick={() => setLightbox(null)}>
            <button className="gal-lightbox-close" onClick={() => setLightbox(null)}><X size={24} /></button>
            <img src={getOptimizedUrl(lightbox.url)} alt={lightbox.title} className="gal-lightbox-img" referrerPolicy="no-referrer" />
            <p className="gal-lightbox-caption">{lightbox.title}</p>
          </div>
        )}
      </div>
    </section>
  );
}
