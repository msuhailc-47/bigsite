import { MapPin, Phone, Mail, Send } from 'lucide-react';
import './Contact.css';
import translations from '../i18n/translations';

export default function Contact({ lang }) {
  const t = translations[lang];
  return (
    <section id="contact" className="section contact-sec">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.contact.label}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div>
                <h4>{t.contact.addressLabel}</h4>
                <p>1st Floor, Dorek Building<br />Ernakulam, Kerala, 682024</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h4>{t.contact.phoneLabel}</h4>
                <p>+91 98765 43210<br />0484 234 5678</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h4>{t.contact.emailLabel}</h4>
                <p>info@dorek.com<br />support@dorek.com</p>
              </div>
            </div>
            <div className="contact-map">
              <div className="contact-map-placeholder">
                <MapPin size={40} />
                <span>Google Maps Embed</span>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder={t.contact.formName} required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder={t.contact.formEmail} required />
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" placeholder={t.contact.formPhone} required />
              </div>
              <div className="form-group">
                <select className="form-control" defaultValue="">
                  <option value="" disabled>{t.contact.formSubject}</option>
                  <option value="business">Business Inquiry</option>
                  <option value="career">Career</option>
                  <option value="support">Customer Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder={t.contact.formMessage} rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {t.contact.formSubmit} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
