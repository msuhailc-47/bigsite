import { useState } from 'react';
import { X, Lock, User, ArrowRight } from 'lucide-react';
import './PortalLogin.css';

export default function PortalLogin({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="portal-overlay" onClick={onClose}>
      <div className="portal-modal" onClick={e => e.stopPropagation()}>
        <button className="portal-close" onClick={onClose}><X size={20} /></button>
        <div className="portal-header">
          <div className="portal-logo">DOREK</div>
          <p>Partner & Employee Portal</p>
        </div>
        <form className="portal-form" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Username / Portal ID</label>
            <div className="portal-input-group">
              <User size={18} className="portal-input-icon" />
              <input type="text" className="form-control" placeholder="Enter your ID" />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="portal-input-group">
              <Lock size={18} className="portal-input-icon" />
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
          </div>
          <div className="portal-options">
            <label className="portal-checkbox"><input type="checkbox" /> Remember me</label>
            <a href="#" className="portal-forgot">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login <ArrowRight size={16} /></button>
        </form>
      </div>
    </div>
  );
}
