import { useState } from 'react';
import { Briefcase, Clock, MapPin, GraduationCap, Award, ArrowRight } from 'lucide-react';
import './Careers.css';
import translations from '../i18n/translations';

const jobs = [
  { title: 'Sales Executive', dept: 'Sales', location: 'Ernakulam', type: 'Full-time' },
  { title: 'Electrical Engineer', dept: 'Engineering', location: 'Thrissur', type: 'Full-time' },
  { title: 'Software Developer', dept: 'Technology', location: 'Kochi', type: 'Full-time' },
  { title: 'Store Manager', dept: 'Retail', location: 'Kozhikode', type: 'Full-time' },
];
const internships = [
  { title: 'Marketing Intern', duration: '3 Months', dept: 'Marketing' },
  { title: 'Engineering Intern', duration: '6 Months', dept: 'Engineering' },
  { title: 'IT Intern', duration: '3 Months', dept: 'Technology' },
];
const training = [
  { title: 'Electrical Systems Training', desc: 'Comprehensive training on electrical installations and maintenance.', cert: true },
  { title: 'Solar EPC Certification', desc: 'Professional certification for solar power plant engineering.', cert: true },
  { title: 'Retail Management', desc: 'Store operations, inventory, and customer service training.', cert: false },
];

export default function Careers({ lang }) {
  const t = translations[lang];
  const [tab, setTab] = useState(0);
  return (
    <section id="careers" className="section careers">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.careers.label}</span>
          <h2 className="section-title">{t.careers.title}</h2>
          <p className="section-subtitle">{t.careers.subtitle}</p>
        </div>
        <div className="career-tabs">
          {t.careers.categories.map((cat, i) => (
            <button key={i} className={`career-tab ${tab === i ? 'career-tab-active' : ''}`} onClick={() => setTab(i)}>{cat}</button>
          ))}
        </div>
        <div className="career-content">
          {tab === 0 && <div className="career-list">{jobs.map((j, i) => (
            <div key={i} className="career-card">
              <div className="career-card-left">
                <h4><Briefcase size={16} /> {j.title}</h4>
                <div className="career-meta"><span><MapPin size={13} /> {j.location}</span><span><Clock size={13} /> {j.type}</span></div>
              </div>
              <div className="career-card-right">
                <span className="badge badge-emerald">{j.dept}</span>
                <button className="btn btn-primary btn-sm">Apply <ArrowRight size={14} /></button>
              </div>
            </div>
          ))}</div>}
          {tab === 1 && <div className="career-list">{internships.map((j, i) => (
            <div key={i} className="career-card">
              <div className="career-card-left">
                <h4><GraduationCap size={16} /> {j.title}</h4>
                <div className="career-meta"><span><Clock size={13} /> {j.duration}</span></div>
              </div>
              <div className="career-card-right">
                <span className="badge">{j.dept}</span>
                <button className="btn btn-primary btn-sm">Apply <ArrowRight size={14} /></button>
              </div>
            </div>
          ))}</div>}
          {tab === 2 && <div className="career-list">{training.map((j, i) => (
            <div key={i} className="career-card">
              <div className="career-card-left">
                <h4><Award size={16} /> {j.title}</h4>
                <p className="career-training-desc">{j.desc}</p>
              </div>
              <div className="career-card-right">
                {j.cert && <span className="badge badge-gold">Certified</span>}
                <button className="btn btn-primary btn-sm">Enroll <ArrowRight size={14} /></button>
              </div>
            </div>
          ))}</div>}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="btn btn-primary btn-lg">{t.careers.applyOnline} <ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
