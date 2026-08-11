import { Heart, Users, GraduationCap, Leaf, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import './CSR.css';

const icons = [Heart, Users, GraduationCap, Leaf];
const accents = ['#ef4444','#00b4d8','#f59e0b','#10b981'];

export default function CSR({ lang, t }) {
  const { getAnimationClass } = useCMS();
  const animClass = getAnimationClass('csr');
    return (
    <section id="csr" className={`section csr-sec ${animClass}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.csr.label}</span>
          <h2 className="section-title">{t.csr.title}</h2>
          <p className="section-subtitle">{t.csr.subtitle}</p>
        </div>
        <div className="csr-grid">
          {t.csr.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="csr-card" style={{ borderTopColor: accents[i] }}>
                <div className="csr-card-icon" style={{ background: `${accents[i]}20`, color: accents[i] }}>
                  <Icon size={28} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="csr-cta">
          <p>Want to partner with us for a social cause?</p>
          <button className="btn btn-primary">Partner With Us <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
