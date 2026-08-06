import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import './News.css';
import translations from '../i18n/translations';

export default function News({ lang }) {
  const t = translations[lang];
  const newsItems = t.news.items;
  const featured = newsItems[0];
  const rest = newsItems.slice(1);
  return (
    <section id="news" className="section news-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.news.label}</span>
          <h2 className="section-title">{t.news.title}</h2>
          <p className="section-subtitle">{t.news.subtitle}</p>
        </div>
        <div className="news-featured">
          <div className="news-featured-img"><Newspaper size={48} /></div>
          <div className="news-featured-content">
            <span className="badge">{featured.cat}</span>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <div className="news-date"><Calendar size={14} /> {featured.date}</div>
            <button className="btn btn-primary btn-sm">{t.news.readMore} <ArrowRight size={14} /></button>
          </div>
        </div>
        <div className="news-grid">
          {rest.map((item, i) => (
            <div key={i} className="news-card">
              <div className="news-card-img"><Newspaper size={32} /></div>
              <div className="news-card-body">
                <div className="news-card-top">
                  <span className="badge badge-emerald">{item.cat}</span>
                  <span className="news-date-sm"><Calendar size={12} /> {item.date}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
                <a className="news-read-more">{t.news.readMore} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
