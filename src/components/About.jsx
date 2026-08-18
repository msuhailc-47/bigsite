import { Eye, Target, Heart, Users, Award, Leaf, Quote } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { getOptimizedUrl } from '../utils/getOptimizedUrl';
import './About.css';

export default function About({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('about');
    const valueIcons = [Heart, Award, Users, Target, Leaf, Eye];
  return (
    <section id="about" className={`section about ${animClass}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.about.label}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about-grid">
          <div className="about-history">
            {t.about.image ? (
              <div className="about-image-container">
                <img src={getOptimizedUrl(t.about.image)} alt="About Us" className="about-real-image" />
              </div>
           ) : (
           <div className="about-image-placeholder">
              <div className="about-img-icon">🏢</div>
              <span>Corporate Headquarters</span>
            </div>
           )}
            <h3 className="about-h3">{t.about.history}</h3>
            <p className="about-text">{t.about.historyText}</p>
          </div>
          <div className="about-vm">
            <div className="about-card about-card-vision">
              <div className="about-card-icon"><Eye size={28} /></div>
              <h4>{t.about.vision}</h4>
              <p>{t.about.visionText}</p>
            </div>
            <div className="about-card about-card-mission">
              <div className="about-card-icon about-card-icon-gold"><Target size={28} /></div>
              <h4>{t.about.mission}</h4>
              <p>{t.about.missionText}</p>
            </div>
          </div>
        </div>

        <div className="about-values-section">
          <h3 className="about-h3 about-h3-center">{t.about.coreValues}</h3>
          <div className="about-values-grid">
            {t.about.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={i} className="about-value-item">
                  <div className="about-value-icon"><Icon size={22} /></div>
                  <span>{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-founder">
          <div className="about-founder-card">
            <Quote size={40} className="about-quote-icon" />
            <p className="about-founder-msg">{t.about.founderMsg}</p>
            <div className="about-founder-info">
              <div className="about-founder-avatar">D</div>
              <div>
                <div className="about-founder-name">{t.about.founderName}</div>
                <div className="about-founder-company">{t.about.founderCompany}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-timeline-section">
          <h3 className="about-h3 about-h3-center">{t.about.timeline}</h3>
          <div className="about-timeline">
            {t.about.timelineItems.map((item, i) => (
              <div key={i} className={`about-timeline-item ${i % 2 === 0 ? 'about-tl-left' : 'about-tl-right'}`}>
                <div className="about-tl-content">
                  <span className="about-tl-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="about-tl-dot" />
              </div>
            ))}
            <div className="about-tl-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
