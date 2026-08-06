import { X, Lock, User, ArrowRight } from 'lucide-react';
import './PortalLogin.css';
import translations from '../i18n/translations';

export default function PortalLogin({ lang, isOpen, onClose }) {
  const t = translations[lang];
  if (!isOpen) return null;

  return (
    <div className="portal-overlay" onClick={onClose}>
      <div className="portal-modal" onClick={e => e.stopPropagation()}>
        <button className="portal-close" onClick={onClose}><X size={20} /></button>
        <div className="portal-header">
          <div className="portal-logo">DOREK</div>
          <p>{t.portal.partnerPortal}</p>
        </div>
        <form className="portal-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>{t.portal.username}</label>
            <div className="portal-input-group">
              <User size={18} className="portal-input-icon" />
              <input type="text" className="form-control" placeholder={t.portal.enterId} />
            </div>
          </div>
          <div className="form-group">
            <label>{t.portal.password}</label>
            <div className="portal-input-group">
              <Lock size={18} className="portal-input-icon" />
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
          </div>
          <div className="portal-options">
            <label className="portal-checkbox"><input type="checkbox" /> {t.portal.rememberMe}</label>
            <a href="#" className="portal-forgot">{t.portal.forgot}</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block">{t.portal.login} <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
}
