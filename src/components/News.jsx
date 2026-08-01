import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import './News.css';
import translations from '../i18n/translations';

const newsItems = [
  { cat: 'News', date: 'July 28, 2025', title: 'Dorek International Expands to 5 New Districts', excerpt: 'Dorek International announced expansion of Doorcarts network to five new districts across Kerala.', featured: true },
  { cat: 'Event', date: 'July 15, 2025', title: 'Alliance Summit 2025 Successfully Concluded', excerpt: 'Over 200 associates and partners gathered for the annual Alliance Summit.' },
  { cat: 'Meeting', date: 'June 30, 2025', title: 'Q2 Board Meeting Highlights', excerpt: 'Board approved new franchise guidelines and investment policies.' },
  { cat: 'News', date: 'June 20, 2025', title: 'Software Division Launches Mobile App', excerpt: 'New mobile application for field operations and delivery tracking.' },
];

export default function News({ lang }) {
  const t = translations[lang];
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
            <button className="btn btn-primary btn-sm">Read More <ArrowRight size={14} /></button>
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
                <a className="news-read-more">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
